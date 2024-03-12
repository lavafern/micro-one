const { UnauthorizedException } = require("../expeptions/exceptions")
const {AUTH_SERVICE_URL} = process.env
const redis = require('../libs/redis')


module.exports = async (req,res,next) => {
    try {
        const token = req.cookies.token

        if (!token) throw new UnauthorizedException("unauthorized")

        await redis.publish('authenticate',token)

        await redis.subscribe('authenticate-response', (data)=> {
            const response = JSON.parse(data)

            if (!response.response) {
                return res.json({
                    message:'kelar'
                })
            }

        })

        next()

    } catch (err) {
        console.log('err : ',err);
        next(err)
    }
}