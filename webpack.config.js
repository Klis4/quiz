const path = require('path');
const webpack = require('webpack');

module.exports ={
    entry:{
        app: './index.js'
    },
    output:{
        filename: '[name].js',
        path: path.resolve(__dirname, './dist'),
        publicPath: '/dist' 
    },
    module:{
        rules:[{
            test: /\.js$/,
            exclude: '/node_modules/'
        }]
    },
    devServer:{
        overlay: true,
        hot: true
    },
    plugins: [
        new webpack.HotModuleReplacementPlugin()
    ]
}
