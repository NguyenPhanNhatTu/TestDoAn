var jwt = require('jsonwebtoken');

async function createToken(idUser) {
    const token = await jwt.sign(idUser, process.env.ACCESS_TOKEN);
    return token;
}

async function verifyToken(token) {
    const idUser = await jwt.verify(token, process.env.ACCESS_TOKEN);
    return idUser;
}

module.exports = {
    createToken,
    verifyToken,
}