var path = require('path')

module.exports = {
    /** 项目build时的配置 */
    build: {
        env: require('./prod.env'),
        index: path.resolve(__dirname, 'main.html文件打包后放置的位置'),
        assetsRoot: path.resolve(__dirname, '项目打包后放置的根目录'),
        assetsSubDirectory: '项目打包静态文件的放置目录',
        assetsPublicPath: '/',
        assetsSignPagePath: './',
        productionSourceMap: false,
        productionGzip: false,
        productionGzipExtensions: ['js', 'css'],
        bundleAnalyzerReport: process.env.npm_config_report
    },
    /** 测试环境配置 */
    dev: {
        env: require('./dev.env'),
        port: 8080,
        autoOpenBrowser: true,
        assetsSubDirectory: 'static',
        assetsPublicPath: '/',
        /** 需要代理到的后端地址 */
        proxyTable: {'/**': "http://localhost:8088/"},
        cssSourceMap: false
    }
}
