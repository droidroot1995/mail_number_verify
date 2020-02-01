const path = require('path')
const webpack = require('webpack')

module.exports = {
    module: {
        rules: [
            {
                test: /\.js$/,
                use: {
                    loader: 'babel-loader',
                },
            },
            {
                test: /shadow\.css$/,
                use: {
                    loader: 'css-loader'
                },
            },
        ],
    },
    plugins: [],
    entry: {
        filename: path.join(__dirname, './src/', '/NumberComponent.js'),
    },
    output: {
        path: path.resolve(__dirname, './build/'),
        filename: 'NumberComponent.js',
        libraryTarget: 'commonjs'
    },
}
