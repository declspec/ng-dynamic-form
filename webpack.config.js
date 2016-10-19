var webpack = require('webpack');

module.exports = {
    entry: {
        'dynamic-form': [
            './src/index.js'
        ]
    },

    output: {
        path: './bin',
        publicPath: 'bin/',
        filename: '[name].js'
    },

    resolve: {
        extensions: [ '', '.webpack.js', '.web.js', '.js' ]
    },

    module: {
        loaders: [
            { 
                test: /\.html$/, 
                loader: 'html' 
            },
            { 
                test: /\.js$/,
                exclude: /node_modules/,
                loader: 'babel', // 'babel-loader' is also a valid name to reference
                query: {
                    presets: ['es2015']
                }
            }
        ]
    }
}