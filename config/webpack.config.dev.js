const merge = require('webpack-merge');
const webpack = require('webpack');
const baseWebpackConfig = require('./webpack.base');

const webpackConfig = merge(baseWebpackConfig, {
    mode: 'development',
    cache: true,
    devtool: 'source-map',
    plugins: [new webpack.HotModuleReplacementPlugin(), new webpack.NamedModulesPlugin()],
    devServer: {
        host: process.env.HOST, // 默认是：`localhost`
        port: process.env.PORT, // 默认是：8080
        open: true, // 浏览器自启动
        quiet: true,
        overlay: true, // 开启浏览器端的错误浮层功能
        proxy: {
            '/mock': {
                target: 'http://localhost:3000',
                secure: false,
                pathRewrite: {
                    '^/mock': ''
                },
                changeOrigin: true
            },
            '/dev': {
                target: 'http://10.171.160.65:8800',
                secure: false,
                pathRewrite: {
                    '^/dev': ''
                },
                changeOrigin: true
            },
            '/test': {
                target: 'http://10.171.160.132:8800',
                secure: false,
                pathRewrite: {
                    '^/test': ''
                },
                changeOrigin: true
            }
        },
        watchOptions: {
            // Delay the rebuild after the first change
            // 非常好性能, 根据情况进行注释
            aggregateTimeout: 300,
            // Poll using interval (in ms, accepts boolean too)
            poll: 1000
        }
    },
    performance: {
        hints: false
    }
});

module.exports = webpackConfig;
