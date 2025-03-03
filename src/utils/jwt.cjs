const jwt = require('jsonwebtoken');

const secretKey = process.env.SECRET_JWT

const generateToken = (user) => {

    const token = jwt.sign({user}, secretKey, { expiresIn: '24h' });
    return token;
}

module.exports = generateToken;