const test = require('ava')
const agent = require('supertest')
const createApp = require('../app')

const app = agent(createApp())

test('Auth test api', async t => {
    const res = await app.get('/auth')
    t.is(res.status, 200)
})