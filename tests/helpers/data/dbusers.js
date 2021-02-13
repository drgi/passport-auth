const bcrypt = require('bcryptjs')
module.exports = [
    {
        login: 'user',
        password: bcrypt.hashSync('user')
    },
    {
        login: 'user2',
        password: bcrypt.hashSync('user2')
    },
    {
        login: 'tokentest-user',
        password: bcrypt.hashSync('tokentest-user'),
        tokens: ['eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2MDI1OTJjNTY3NTUzOTBhNTQ1NTA2ZjMiLCJpYXQiOjE2MTMwNzUxNDJ9.lpoFTtA7Z807x1zLJBYzXhZoPhrTVHANSUVyrPLhYNo']
    },
    
    

]