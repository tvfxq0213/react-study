const {createProxyMiddleware} = require('http-proxy-middleware');
module.exports = function(app) {
  app.use(
    '/api',
    createProxyMiddleware({ //proxy-middleware 사용하는 방법이 변경됨
      target: 'http://localhost:5000',
      changeOrigin:true
    })
  )
}