const { createProxyMiddleware } = require('http-proxy-middleware');

module.exports = (app) => {
    app.use(
        '/ws',
        createProxyMiddleware({
            target: 'http://localhost:5001',
            ws: true, // Włącz proxy WebSocket
            changeOrigin: true,
        })
    );
};