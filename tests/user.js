const test = require('ava')
const agent = require('supertest')
const createApp = require('../app')
const { addUsersForTest } = require('./helpers/adduser')
const { removeUserFromDb } = require('./helpers/removeuser')
const usersForTest = require('./helpers/data/dbusers')
const issueToken = require('./helpers/issueToken')

const app2 = agent(createApp())

// test.before('Add users for tests', async t=> {
//     console.log('before tests')
//     await addUsersForTest(usersForTest)
// })

// test('User test /api', async t => {
    
//     const res = await app.get('/user')
//     t.is(res.status, 200)
// })
// test ('Get user list', async t => {
//     const res = await app.get('/users/all')
//     t.is(res.status, 200)
//     t.truthy(Array.isArray(res.body))
// })
test('Get user by name with valid Token', async t => {
    const authHeader = `Bearer ${issueToken({_id: '602592c56755390a545506f3'}, {expiresIn: '1h'})}`
    const res = await app2.get('/api/user/validuser').set('Authorization', authHeader)
    t.is(res.status, 200)
})
test('Get user by name with invalid Token', async t => {
    const authHeader = `Bearer ${issueToken({_id: '602592c56755390a545506f3'}, {expiresIn: '1ms'})}`
    const res = await app2.get('/api/user/validuser').set('Authorization', authHeader)
    console.log('invalid token:', res.text)
    t.is(res.status, 401)
})

// test.after('clean DB', async t => {
//     console.log('after tests')
//     const logins = usersForTest.map(ele => ele.login)
//     await removeUserFromDb({login: logins})
// })