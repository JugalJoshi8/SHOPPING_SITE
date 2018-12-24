const HtmlWebPackPlugin = require("html-webpack-plugin");
const path = require('path');
const webpack = require("webpack");

const htmlPlugin = new HtmlWebPackPlugin({
    template: "./src/index.html",
    filename: "./index.html"
});

const CSSModuleLoader = {
    loader: 'css-loader',
    options: {
        modules: true,
        sourceMap: true,
        localIdentName: '[local]__[hash:base64:5]',
        //minimize: true
    }
}

const CSSLoader = {
    loader: 'css-loader',
    options: {
        modules: false,
        sourceMap: true,
        //minimize: true
    }
}


module.exports = {
    module: {
        rules: [
            {
                test: /\.(js|jsx)$/,
                exclude: /node_modules/,
                use: {
                    loader: "babel-loader"
                }
            },
            {
                test: /\.css$/,
                use: [
                    'style-loader',
                    'css-loader'
                ]
            },
            {
                test: /\.scss$/,
                exclude: /\.module\.scss$/,
                use: ['style-loader', CSSLoader, 'sass-loader']
            },
            {
                test: /\.module\.scss$/,
                use: [
                    'style-loader',
                    CSSModuleLoader,
                    'sass-loader',
                ]
            },
            {
                test: /\.(png|jpg|gif|svg)$/,
                use: [
                  {
                    loader: 'file-loader',
                    options: {},
                  },
                ],
            }
        ]
    },
    plugins: [htmlPlugin, new webpack.ProvidePlugin({
        $: 'jquery',
        jQuery: 'jquery'
      })]
};