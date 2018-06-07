'use strict';

const path = require('path')
const webpack = require('webpack')

module.exports = {
    entry: "./resources/assets/js/main.js",

    resolve: {
        alias: {
            'vue$': 'vue/dist/vue.common.js'
        }
    },
    
    output: {
        path: path.resolve(__dirname, './public/js'),
        publicPath: '/public/js/',
        filename: 'bundle.js'
    },

    module: {
        rules: [
            {
                test: /\.vue$/,
                loader: 'vue-loader'
            },
            {
                test: /\.js$/,
                loader: 'babel-loader',
                exclude: /node_modules/
            },
            {
                test: /\.css$/,
                use: [{
                    loader: "style-loader"
                }, {
                    loader: "css-loader"
                }]
            }
        ]
    }

    //watch: true
};
