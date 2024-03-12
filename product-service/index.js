require('dotenv').config({path:'./config/.env'})
const express = require('express');
const app = express();
const {PORT} = process.env

app.get('/',(req,res) => res.send("hello from products service"))

app.listen(PORT,() => console.log('product service listening on port',PORT))