let {
    resolve
} = require('path');
let HtmlWebpackPlugin = require('html-webpack-plugin');
let {
    CleanWebpackPlugin
} = require('clean-webpack-plugin');
let CopyWebpackPlugin = require('copy-webpack-plugin');

let MiniCssExtractPlugin = require('mini-css-extract-plugin');

// require('@babel/polyfill')
 
module.exports = {
    mode: "production",
    entry:[ '@babel/polyfill','./src/main.js'] ,
    output: {
        filename: "[name].[hash:8].js",
        path: resolve(__dirname, './build')
    },
    module: {
        rules: [
            {
                test: /\.js$/,
                use:{ 
                    loader:'babel-loader',
                    options:{
                        presets:['@babel/preset-env' ]
                    }
                  },
                use:'babel-loader',
                exclude: [/node_modules/]
            },
            {
                test: /\.css$/,
                use: [MiniCssExtractPlugin.loader, 'css-loader',
                    {
                        loader: 'postcss-loader',
                        options: {
                            postcssOptions: {
                                plugins: [
                                    'postcss-preset-env'
                                ]
                            }
                        }
                    }
                ]
            },
            {
                test: /\.scss$/,
                use: [MiniCssExtractPlugin.loader, 'css-loader',
                    {
                        loader: 'postcss-loader',
                        options: {
                            postcssOptions: {
                                plugins: [
                                    require('postcss-preset-env')()
                                ]
                            }
                        }
                    },
                    'sass-loader'
                ]
            }

        ]
    },
    plugins: [
        new CleanWebpackPlugin(),
        new CopyWebpackPlugin({
            patterns: [{
                from: resolve(__dirname, './public'),
                to: resolve(__dirname, './build'),
                globOptions: {
                    ignore: [
                        // Ignore all `txt` files 
                        "**/*.html",
                        // Ignore all files in all subdirectories 排除所有子目录
                        //   "**/subdir/**",
                    ],
                },
            }]

        }),
        new MiniCssExtractPlugin({
            filename: 'css/index.css' // 输出路径和文件名
        }),

        new HtmlWebpackPlugin({
            template: resolve(__dirname, './public/index.html'),
        })
    ],
    resolve: {
        alias: {
            '@': resolve(__dirname, './src')
        } 
       
    },
    // externals:{

    // }

}