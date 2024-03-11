const { UnauthorizedException } = require("../expeptions/exceptions");

module.exports = {
    verifyToken : (token,secret) => {
        return new Promise((resolve,reject) => {
            jwt.verify(token,secret,(err,decode) => {
                if (err) reject(new UnauthorizedException('Unauthorized'));
                resolve(decode);
            });
        });
    },
    signToken : (payload,secret) => {
        return new Promise((resolve,reject) => {
            jwt.sign(payload, secret,  {expiresIn : '6d'}, function(err, token) {
                if (err) reject(err);
                resolve(token);
            });
        });
    }
}