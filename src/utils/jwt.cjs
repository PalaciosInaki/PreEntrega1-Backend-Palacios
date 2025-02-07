const jwt = require('jsonwebtoken');

const secretKey = 'jwtSecret'

const generateToken = (user) => {

    const token = jwt.sign({user}, secretKey, { expiresIn: '24h' });
    return token;
}
