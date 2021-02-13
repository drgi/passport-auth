const test = require('ava')
const agent = require('supertest')
const createApp = require('../app')
const { addUsersForTest, removeUserFromDb, addRefTokenForLogoutTest } = require('./helpers/dbhelper')
const userForRemove = require('./helpers/data/forremove')
const usersForTest = require('./helpers/data/dbusers')
const issueToken = require('./helpers/issueToken')

const app = agent(createApp())

test.before('Add users for tests', async t=> {
    console.log('before tests')
    const logins = userForRemove.map(ele => ele.login)
    await removeUserFromDb({login: logins})
    await addRefTokenForLogoutTest('602592c56755390a545506f3', 'TEST_LOGOUT_RESRESH_TOKEN')
    await addRefTokenForLogoutTest('602592c56755390a545506f3', 'TEST_ALLLOGOUT_RESRESH_TOKEN')
    await addRefTokenForLogoutTest('602592c56755390a545506f3', 'TEST_ALLLOGOUT_RESRESH_TOKEN2')
    await addUsersForTest(usersForTest)
})
test.after('clean DB', async t => {
    console.log('after tests')
    const logins = userForRemove.map(ele => ele.login)
    await removeUserFromDb({login: logins})
})



//Register tests
test.serial('Register new user with valid data', async t => {
    const validRegRes = await app
        .post('/auth/register')
        .send({login: 'newuser', password: 'newuser'})

    t.is(validRegRes.status, 201)
    t.truthy(typeof validRegRes.body.token === 'string')
    t.truthy(typeof validRegRes.body.refreshToken === 'string')
    t.truthy(typeof validRegRes.body.user === 'object') 

})

test.serial('Register new user with already register login', async t => {
    const invalidRegRes = await app
        .post('/auth/register')
        .send({login: 'user', password: 'pass'})
    t.is(invalidRegRes.status, 400)
    
})

test.serial('Register new user with invalid data', async t => {
    const invalidRegRes = await app
        .post('/auth/register')
        .send({login: '', password: ''})
    t.is(invalidRegRes.status, 204)
        
})

// Login tests

test.serial('Login with valid credential', async t => {
    const res = await app.post('/auth/login').send({login: 'tokentest-user', password: 'tokentest-user'})
    t.is(res.status, 200)
    t.truthy(typeof res.body.token === 'string')
    t.truthy(typeof res.body.refreshToken === 'string')
})
test.serial('Login with invalid credential', async t => {
    const res = await app.post('/auth/login').send({login: '', password: 'user'})
    t.is(res.status, 400)
    t.truthy(typeof res.body.error === 'string')
})
test.serial('Login but user not registred, no found in DB', async t => {
    const res = await app.post('/auth/login').send({login: 'nouser', password: 'user'})
    t.is(res.status, 404)
    t.truthy(typeof res.body.error === 'string')
})
test.serial('Login with invalid password', async t => {
    const res = await app.post('/auth/login').send({login: 'user', password: 'INVALID'})
    t.is(res.status, 401)
    t.truthy(typeof res.body.error === 'string')
})
//Refresh token test
test.serial('Get new access Token with valid Refresh Token and Refresh Token work only once', async t => {
    const refreshToken = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2MDI1OTJjNTY3NTUzOTBhNTQ1NTA2ZjMiLCJpYXQiOjE2MTMwNzUxNDJ9.lpoFTtA7Z807x1zLJBYzXhZoPhrTVHANSUVyrPLhYNo'
    const res = await app.post('/auth/refreshtoken').send({refreshToken})
    t.is(res.status, 200)
    t.truthy(typeof res.body.token === 'string');
    t.truthy(typeof res.body.refreshToken === 'string');
    const secondRes = await app.post('/auth/refreshtoken').send({refreshToken})
    t.is(secondRes.status, 404)
    t.is(secondRes.body.error, 'Invalid refreshToken')    
})
test.serial('Get new access Token with invalid field(no refreshToken)', async t => {
    const refreshToken = ''
    const res = await app.post('/auth/refreshtoken').send({refreshToken})
    t.is(res.status, 400)
    t.is(res.body.error, 'Invalid fields')
    const res2 = await app.post('/auth/refreshtoken').send({NOrefreshToken: ''})
    t.is(res2.status, 400)
    t.is(res2.body.error, 'Invalid fields')
})
// LogOut tests
test.serial('Refresh Token become invalid after Logout', async t => {
    const accessToken = `Bearer ${issueToken({_id: '602592c56755390a545506f3'}, {expiresIn: '1h'})}`
    const logoutRes = await app
        .post('/auth/logout')
        .set('Authorization', accessToken)
        .send({refreshToken: 'TEST_LOGOUT_RESRESH_TOKEN'})
    t.is(logoutRes.status, 200)

    const refreshToken = 'TEST_LOGOUT_RESRESH_TOKEN'
    const res = await app.post('/auth/refreshtoken').send({refreshToken})
    t.is(res.status, 404)
})
test.serial('Logout with invalid accessToken', async t => {
    const accessToken = `Bearer ${issueToken({login: 'validuser'}, {expiresIn: '1ms'})}`
    const logoutRes = await app.post('/auth/logout').set('Authorization', accessToken)
    t.is(logoutRes.status, 401)
})
//LogoutAll tests
test.serial('Logout from all, delete all Refresh Tokens', async t => {
    const accessToken = `Bearer ${issueToken({_id: '602592c56755390a545506f3'}, {expiresIn: '1h'})}`
    const logoutAllres = await app.post('/auth/logoutall').set('Authorization', accessToken)
    t.is(logoutAllres.status, 200)

    const refreshToken = 'TEST_ALLLOGOUT_RESRESH_TOKEN'
    const res = await app.post('/auth/refreshtoken').send({refreshToken})
    t.is(res.status, 404)

    const refreshToken2 = 'TEST_ALLLOGOUT_RESRESH_TOKEN2'
    const res2 = await app.post('/auth/refreshtoken').send({refreshToken: refreshToken2})
    t.is(res2.status, 404)
})





