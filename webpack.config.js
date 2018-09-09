const path = require('path');
const devEnv = process.env.NODE_ENV === 'development' || process.argv[1].indexOf('webpack-dev-server') !== -1;

const HtmlWebpackPlugin = require('html-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const UglifyJsPlugin = require("uglifyjs-webpack-plugin");
const OptimizeCSSAssetsPlugin = require("optimize-css-assets-webpack-plugin");
const webpack = require('webpack');

module.exports = {
    entry: './src/index.js',
    devtool: devEnv ? 'inline-source-map' : undefined,
    plugins: [
        new CleanWebpackPlugin(['dist']),
        new HtmlWebpackPlugin({
            template:'./src/index.html'
        }),
        new MiniCssExtractPlugin({
            filename: devEnv ? '[name].css' : '[name].[hash].css',
            chunkFilename: devEnv ? '[id].css' : '[id].[hash].css',
        }),
        new webpack.HotModuleReplacementPlugin()
    ],
    optimization: {
        minimizer: [
            new UglifyJsPlugin({
                cache: true,
                parallel: true,
                sourceMap: true
            }),
            new OptimizeCSSAssetsPlugin({})
        ]
    },
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
                    {
                        loader: devEnv ? 'style-loader' : MiniCssExtractPlugin.loader
                    },{
                        loader: 'css-loader',
                        query: {
                            minimize: true
                        }
                    },{
                        loader: 'less-loader'
                    },
                ],
            },
            {
                test: /\.js$/,
               // exclude: /node_modules/,
                use: {
                    loader: 'babel-loader',
                    query: {
                        presets: ['@babel/preset-env']
                    }
                }
            },
            {
                test: /\.(woff(2)?|ttf|eot|svg)(\?v=\d+\.\d+\.\d+)?$/,
                use: [{
                    loader: 'file-loader',
                    query: {
                        name: '[name].[ext]',
                        outputPath: 'fonts/'
                    }
                }]
            }
        ]
    },
    mode: devEnv ? 'development' : 'production',
    devServer: {
        contentBase:'./dist',
        hot: true
    }

};