const HtmlWebPackPlugin = require("html-webpack-plugin");

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
        minimize: true
    }
}

const CSSLoader = {
    loader: 'css-loader',
    options: {
        modules: false,
        sourceMap: true,
        minimize: true
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
                    {
                        loader: "style-loader"
                    },
                    {
                        loader: "css-loader",
                        options: {
                            modules: true,
                            importLoaders: 1,
                            localIdentName: "[name]_[local]_[hash:base64]",
                            sourceMap: true,
                            //minimize: true
                        }
                    }
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
            }
        ]
    },
    plugins: [htmlPlugin]
};