const bcrypt = require('bcrypt');

const createHashPassword = async (password) => {
    const salt = await bcrypt.genSalt(15);
    return await bcrypt.hash(password, salt);
}

const comparePassword = async (password, hash) => {
    return await bcrypt.compare(password, hash);
}

module.exports = { createHashPassword, comparePassword };

