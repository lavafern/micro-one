require('dotenv').config({path:'./config/.env'})
const express = require('express');
const {otherError,notFoundError} = require('./middlewares/error.middleware')
const {createProxyMiddleware} = require('http-proxy-middleware')
const app = express();
const {PORT,AUTH_SERVICE_URL,PRODUCT_SERVICE_URL,ORDER_SERVICE_URL} = process.env
const cookies = require('cookie-parser');

app.use(cookies())

const authenticate= require('./middlewares/authentication.middleware')
app.use('/api/v1/auth', createProxyMiddleware({
    target : AUTH_SERVICE_URL,
    pathRewrite: {
     '^/api/v1/auth' : '/'
    }
}))
app.use('/api/v1/products', createProxyMiddleware({
    target : PRODUCT_SERVICE_URL,
    pathRewrite: {
     '^/api/v1/products' : '/'
    }
}))
app.use('/api/v1/orders',authenticate, createProxyMiddleware({
    target : ORDER_SERVICE_URL,
    pathRewrite: {
     '^/api/v1/orders' : '/'
    }
}))

app.use(otherError)
app.use(notFoundError)



app.listen(PORT,() => console.log('gateway listening on port',PORT))