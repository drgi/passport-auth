const test = require('ava')
const agent = require('supertest')
const createApp = require('../app')

const app = agent(createApp())

test('User test api', async t => {
    const res = await app.get('/user')
    t.is(res.status, 200)
})