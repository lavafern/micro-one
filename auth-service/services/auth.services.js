const db = require('../models/index')
const {redis1,redis2} = require('../libs/redis')
const {createClient} = require('redis');
const { verifyToken } = require("../helper/auth.helper")


module.exports = {
    register(email,password,name) {
        return db.User.create({
            email : email,
            password : password,
            isVerified : false,
            profile: {
                name : name,
                role : 'admin'
            }
        }, {
            include : ['profile']
        })
    },
    login() {

    },
    hashPassword(rawPassword) {

    },
    logout() {

    },
    async authenticate() {

        await redis1.subscribe('authenticate', async (token) => {

            try {
                
                console.log('token :',token);

                authResponse = await verifyToken(token)

                await redis2.publish('authenticate-response',JSON.stringify({response:authResponse}))


            } catch (err) {
                console.log('unathenticated');
                await redis2.publish('authenticate-response',JSON.stringify({response:false}))
            }

        })
    }
}
