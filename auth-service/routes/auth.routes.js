const router = require('express').Router()
const {UnauthorizedException} = require('../expeptions/exceptions')
const {register,login, authenticate} = require('../controller/auth.controller');
router.get('/hello',(req,res,next) => {
    try {
        throw new UnauthorizedException("lol")
    } catch (error) {
        next(error)
    }
});

router.post('/register',register)
router.post('/login',login)
router.get('/authenticate',authenticate)

module.exports = router;