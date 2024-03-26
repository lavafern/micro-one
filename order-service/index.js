require('dotenv').config({path:'./config/.env'})
const express = require('express');
const app = express();
const {PORT} = process.env


app.get('/',(req,res) => {
    req.user= JSON.parse(req.headers.user)
    console.log('user : ',req.user);
    console.log('wwwww');
    res.send("hello from order service")
})

app.listen(PORT,() => console.log('order service listening on port',PORT))