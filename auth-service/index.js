require('dotenv').config({path:'./config/.env'})
const express = require('express');
const app = express();
const authRoute = require('./routes/auth.routes')
const {PORT} = process.env

app.use(authRoute)
app.get('/',(req,res,next) => res.send('wow'))

app.listen(PORT,() => console.log('gateway listening on port',PORT))