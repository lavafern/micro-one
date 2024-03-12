require('dotenv').config({path:'./config/.env'})
const express = require('express');
const app = express();
const authRoute = require('./routes/auth.routes')
const {authenticate} = require('./services/auth.services')
const {PORT} = process.env
const {otherError,notFoundError} = require('./middlewares/error.middleware')
const cookies = require('cookie-parser');

app.use(cookies());
app.use(express.json());

app.use(authRoute);
app.get('/',(req,res,next) => res.send('wow'));

app.use(otherError);
app.use(notFoundError);

(authenticate)();

app.listen(PORT,() => console.log('auth-service listening on port',PORT))