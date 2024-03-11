require('dotenv').config({path:'./config/.env'})
const express = require('express');
const {createProxyMiddleware} = require('http-proxy-middleware')
const app = express();
const {PORT,AUTH_SERVICE_URL} = process.env

app.use('/auth', createProxyMiddleware({
    target : AUTH_SERVICE_URL,
    pathRewrite: {
     '^/auth' : '/'
    }
}))

app.listen(PORT,() => console.log('gateway listening on port',PORT))