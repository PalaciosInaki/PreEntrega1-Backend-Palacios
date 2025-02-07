const bcrypt = require('bcrypt');

const createHashPassword = (password) => {
    const salt = bcrypt.genSalt(15);
    return bcrypt.hash(password, salt);
}

const comparePassword = (password, hash) => {
    return bcrypt.compare(password, hash);
}

module.exports = { createHashPassword, comparePassword };

