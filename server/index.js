const express = require("express");
const fs = require("fs");
const path = require("path");
const ServerRenderer = require("./renderer");
const app = express();
const proxyMiddleware = require('http-proxy-middleware');

const isProd = process.env.NODE_ENV === "production";

let renderer;
let readyPromise;
let template = fs.readFileSync("./index.html", "utf-8");
if (isProd) {
    // 静态资源映射到dist路径下
    app.use("/dist", express.static(path.join(__dirname, "../dist")));

    let bundle = require("../dist/server-bundle.json");
    let stats = require("../dist/loadable-stats.json");
    renderer = new ServerRenderer(bundle, template, stats);
} else {
    readyPromise = require("./dev-server")(app, (
        bundle,
        stats) => {
        renderer = new ServerRenderer(bundle, template, stats);
    });
}

app.use("/public", express.static(path.join(__dirname, "../public")));

const proxyTable = {
    '/api': {
        target: 'http://api.jrucker.cn',
        changeOrigin: true
    }
};

Object.keys(proxyTable).forEach(function (context) {
    let options = proxyTable[context];
    if (typeof options === 'string') {
        options = {target: options}
    }
    app.use(proxyMiddleware(options.filter || context, options))
});

const render = (req, res) => {
    // 此对象会合并然后传给服务端路由，不需要可不传
    const context = {};

    renderer.renderToString(req, context).then(({error, html}) => {
        if (error) {
            if (error.url) {
                res.redirect(error.url);
            } else if (error.code) {
                res.status(error.code).send("error code：" + error.code);
            }
        }

        res.send(html);
    }).catch(error => {
        console.log(error);
        res.status(500).send("Internal server error");
    });
}

app.get("*", isProd ? render : (req, res) => {
    // 等待客户端和服务端打包完成后进行render
    readyPromise.then(() => render(req, res));
});

const port = process.env.PORT || 8091;
app.listen(port, () => {
    console.log(`server started at localhost:${port}`)
});
