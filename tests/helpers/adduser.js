const User = require('../../model/user')
async function addUsersForTest(users) {
        await User.insertMany(users)   
}
module.exports = {
    addUsersForTest
}
