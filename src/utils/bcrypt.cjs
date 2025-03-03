const bcrypt = require('bcrypt');

const createHashPassword = (password) => {
    return bcrypt.hashSync(password, bcrypt.genSaltSync(10));
};

const comparePassword = (password, hash) => {
    return bcrypt.compareSync(password, hash);
};

module.exports = { createHashPassword, comparePassword };


