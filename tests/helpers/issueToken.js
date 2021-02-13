const jwt = require('jsonwebtoken');

module.exports = (data, options = {}) => {
    return jwt.sign(data, 'Zalupa', options)
}