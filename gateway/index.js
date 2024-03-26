require('dotenv').config({path:'./config/.env'})
const express = require('express');
const {otherError,notFoundError} = require('./middlewares/error.middleware')
const {createProxyMiddleware} = require('http-proxy-middleware')
const app = express();
const {PORT,AUTH_SERVICE_URL,PRODUCT_SERVICE_URL,ORDER_SERVICE_URL} = process.env
const cookies = require('cookie-parser');

app.use(cookies())

const authenticate= require('./middlewares/authentication.middleware')
const logger= require('./middlewares/logger.middleware')

app.use('/api/v1/auth' ,logger,createProxyMiddleware({
    target : AUTH_SERVICE_URL,
    pathRewrite: {
     '^/api/v1/auth' : '/'
    }
}))
app.use('/api/v1/products',logger, createProxyMiddleware({
    target : PRODUCT_SERVICE_URL,
    pathRewrite: {
     '^/api/v1/products' : '/'
    }
}))
app.use('/api/v1/orders',logger,authenticate, createProxyMiddleware({
    target : ORDER_SERVICE_URL,
    pathRewrite: {
     '^/api/v1/orders' : '/'
    },
    onProxyReq: (proxyreq,req,res) => {
        if (req.user) {
            proxyreq.setHeader('user',JSON.stringify(req.user))
        }
    }
}))

app.use(otherError)
app.use(notFoundError)



app.listen(PORT,() => console.log('gateway listening on port',PORT))