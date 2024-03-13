const { UnauthorizedException } = require("../expeptions/exceptions")
const {redis1,redis2} = require('../libs/redis')


module.exports = async (req,res,next) => {
    try {
        const token = req.cookies.token

        if (!token) throw new UnauthorizedException("unauthorized")

        await redis1.publish('authenticate',token)

        const res = await new Promise((resolve,reject) => {
            redis2.subscribe('authenticate-response', (data)=> {
                const response = JSON.parse(data)

                if (!response.response) {
                    reject(new UnauthorizedException("Unauthenticated"))
                } else {
                    resolve(response.response)
                } 
            })

        })

        console.log('res:::',res);
            
        next()

    } catch (err) {
        console.log('err : ',err);
        next(err)
    }
}