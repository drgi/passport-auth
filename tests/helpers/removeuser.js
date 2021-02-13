const User = require('../../model/user')
async function removeUserFromDb(users) {
    await User.deleteMany(users)
}
module.exports = {
    removeUserFromDb
}