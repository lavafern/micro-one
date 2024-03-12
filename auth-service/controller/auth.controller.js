const { UnauthorizedException } = require('../expeptions/exceptions');
const {register} = require('../services/auth.services')
const {findByEmail} = require('../services/user.services')
const {signToken} = require('../helper/auth.helper')
const { verifyToken } = require("../helper/auth.helper")

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
    },

    async login(req,res,next) {
        try {
            const {email,password} = req.body;
            if (!password) throw new UnauthorizedException("wrong enmail or password")
            if (!email) throw new UnauthorizedException("wrong enmail or password")

            const checkUser = await findByEmail(email)
            if (!checkUser) throw new UnauthorizedException("wrong enmail or password")

            if(checkUser.password !== password) throw new UnauthorizedException("wrong enmail or password")

            console.log('finduserL',checkUser);

            const token = await signToken({
                id: checkUser.id,
                email: checkUser.email,
                name: checkUser.profile.name,
                role: checkUser.profile.role
            },'secret')

            res.cookie('token',token)
            res.status(200).send(checkUser)

        } catch (err) {
            next(err)
        }
    },

    async authenticate(req,res,next) {
        try {
            const {token} = req.cookies.token
            
            console.log('kue:',req.cookies);
            console.log('kue:',req.cookie);
            if (!token) throw new UnauthorizedException("Unauthorized")
            
            const user = await verifyToken(token)
    
            req.user = user
    
            res.status(200).json(user)
    
        } catch (err) {
    
            next(err)
    
        }
    }
}