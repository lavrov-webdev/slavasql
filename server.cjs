const express = require('express')
const path = require('path')
const proxy = require('http-proxy-middleware')
require('dotenv').config()

const app = express()
app.use(express.static(__dirname + '/dist'));

const apiProxy = proxy.createProxyMiddleware('/api', {
	target: process.env.BASE_URL,
	changeOrigin: true,
	pathRewrite: { '^/api': '' }
})
app.use('/api', apiProxy)

app.get('*', (req, res) => {
	res.sendFile(path.join(__dirname, '/dist/index.html'));
})

app.listen(process.env.PORT, () => {
	console.log(`Server listen port ${process.env.PORT}`)
})
