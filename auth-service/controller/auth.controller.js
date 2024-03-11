const {register} = require('../services/auth.services')
const {findByEmail} = require('../services/user.services')

module.exports = {
    async register(req,res,next) {
        try {
            const {email,password,name} = req.body;

            if (!email) throw new Error("email is required")
            if (!password) throw new Error("password is required")
            if (!name) throw new Error("name is required")

            const checkUser = await findByEmail(email)
            
            if (checkUser) throw new Error("email already used")

            const newUser = await register(email,password,name)

            res.status(200).json(newUser)
        } catch (err) {
            console.log('err : ',err);
            next(err)
        }
    }
}