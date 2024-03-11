const { UnauthorizedException } = require("../expeptions/exceptions")
const { verifyToken } = require("../helper/auth.helper")

module.exports = async (req,res,next) => {
    try {
        const {token} = req.cookies.token

        if (!token) throw new UnauthorizedException("Unauthorized")
        
        const user = await verifyToken(token)

        req.user = user

        next()

    } catch (err) {

        next(err)

    }
}