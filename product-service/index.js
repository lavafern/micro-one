require('dotenv').config({path:'./config/.env'})
const express = require('express');
const app = express();
const {PORT} = process.env

app.listen(PORT,() => console.log('product service listening on port',PORT))