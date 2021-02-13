const User = require('../../model/user')
async function removeUserFromDb(users) {
    await User.deleteMany(users)
}
async function addUsersForTest(users) {
    await User.insertMany(users)   
}
async function addRefTokenForLogoutTest(userId, strToken) {
    await User.findByIdAndUpdate(userId, {tokens: strToken})
}
module.exports = {
    removeUserFromDb,
    addUsersForTest,
    addRefTokenForLogoutTest
}