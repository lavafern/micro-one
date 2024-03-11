const router = require('express').Router()

router.get('/hello',(req,res) => res.send("hello from auth service"))

module.exports = router;