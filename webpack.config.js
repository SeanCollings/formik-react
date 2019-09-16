var path = require('path');
var HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
    entry: './index.js',
    // output: {
    //     path: path.resolve(__dirname, 'dist'),
    //     filename: 'index_bundle.js',
    //     publicPath: '/assets/'
    // },
    module: {
        rules: [
            { test: /\.(js)$/, use: 'babel-loader' },
            { test: /\.css$/, use: ['style-loader', 'css-loader'] }
        ]
    },
    mode: 'development',
    plugins: [
        new HtmlWebpackPlugin({
            template: 'index.html'
        })
    ],
    devServer: {
        //redirect api calls to backend server
        publicPath: '/',
        filename: 'index.js',
    },
};