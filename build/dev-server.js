require('./check-versions')()

var config = require('../config')
if (!process.env.NODE_ENV) {
    process.env.NODE_ENV = JSON.parse(config.dev.env.NODE_ENV)
}

var opn = require('opn')
var path = require('path')
var express = require('express')
var webpack = require('webpack')
var proxyMiddleware = require('http-proxy-middleware')
var webpackConfig = require('./webpack.dev.conf')

var port = process.env.PORT || config.dev.port
var autoOpenBrowser = !!config.dev.autoOpenBrowser
var proxyTable = config.dev.proxyTable

var app = express()
var compiler = webpack(webpackConfig)

var devMiddleware = require('webpack-dev-middleware')(compiler, {
    publicPath: webpackConfig.output.publicPath,
    quiet: true
})

var hotMiddleware = require('webpack-hot-middleware')(compiler, {
    path: "/_webpack_.do",
    log: false,
    heartbeat: 1000
})
compiler.plugin('compilation', function (compilation) {
    compilation.plugin('html-webpack-plugin-after-emit', function (data, cb) {
        hotMiddleware.publish({action: 'reload'})
        cb()
    })
})

/** 需要代理到的后端ip */
var options = {
    target: "http://localhost:8088/"
};

/** 过滤器：让部分返回false的请求不走options中定义的ip */
var filter = function (pathname, req) {
    if (pathname.match('/druid/')) {
        return true;
    }
    if (pathname.match('.docx$')) {
        return true;
    }
    if (pathname.indexOf('.') > 0) {
        return false;
    }
    return true;
};
app.use(proxyMiddleware(filter, options));

app.use(devMiddleware)

app.use(hotMiddleware)

var staticPath = path.posix.join(config.dev.assetsPublicPath, config.dev.assetsSubDirectory)
/** 代理静态路径 */
app.use(staticPath, express.static('./static'))
/** 代理signIn.html登陆页面，可以定义为你自己的页面 */
app.use("/signIn.html", express.static('./static/signIn.html'))

/** 自动打开的页面路径 */
var uri = 'http://localhost:' + port + "/signIn.html";

var _resolve
var readyPromise = new Promise(resolve => {
    _resolve = resolve
})

console.log('> 启动测试环境中...')
devMiddleware.waitUntilValid(() => {
    console.log('> 正在监听： ' + uri + '\n')
    // when env is testing, don't need open it
    if (autoOpenBrowser && process.env.NODE_ENV !== 'testing') {
        opn(uri)
    }
    _resolve()
})

var server = app.listen(port)

module.exports = {
    ready: readyPromise,
    close: () => {
        server.close()
    }
}
