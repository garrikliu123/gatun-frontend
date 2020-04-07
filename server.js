var express = require("express");
var proxy = require("http-proxy-middleware").createProxyMiddleware;
var history = require("connect-history-api-fallback");
var port = process.env.PORT || 8080;

// 创建 express 实例
var app = express();

//重定向到index.html
history({
    rewrites: [{
        from: /^\/libs\/.*$/,
        to: "/index.html",
    }, ],
});

app.use(history());

// 静态资源地址
app.use(express.static("./dist"));

app.use(
    "/api",
    proxy({
        target: "http://localhost:8081/gatun",
        changeOrigin: true,
        pathRewrite: {
            "^/api": "",
        },
    })
);

app.listen(port, function(err) {
    if (err) {
        console.log(err);
        return;
    }

    console.log("Server is listening " + port + " port\n");
});