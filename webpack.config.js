const path = require('path');
const devEnv = process.env.NODE_ENV === 'development' || process.argv[1].indexOf('webpack-dev-server') !== -1;

const HtmlWebpackPlugin = require('html-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const webpack = require('webpack');

module.exports = {
    entry: './src/index.js',
    devtool: devEnv ? 'inline-source-map' : undefined,
    plugins: [
        new CleanWebpackPlugin(['dist']),
        new HtmlWebpackPlugin({
            title:'JS Task'
        }),
        new MiniCssExtractPlugin({
            filename: devEnv ? '[name].css' : '[name].[hash].css',
            chunkFilename: devEnv ? '[id].css' : '[id].[hash].css',
        }),
        new webpack.HotModuleReplacementPlugin()
    ],
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: devEnv ? './main.js' : './main.[hash].js'
    },
    module: {
        rules: [
            {
                test: /\.html$/,
                exclude: /node_modules/,
                use: {loader: 'html-loader'}
            },
            {
                test: /\.(le|c)ss$/,
                use: [
                    devEnv ? 'style-loader' : MiniCssExtractPlugin.loader,
                    'css-loader',
                    'less-loader',
                ],
            },
            {
                test: /\.js$/,
                exclude: /node_modules/,
                use: {
                    loader: 'babel-loader?cacheDirectory',
                    options: {
                        presets: ['@babel/preset-env']
                    }
                }
            }
        ]
    },
    mode: devEnv ? 'development' : 'production',
    devServer: {
        contentBase:'./dist',
        hot: true
    }

};