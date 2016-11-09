const LIBRARY_NAME = 'ng-dynamic-form';

var webpack = require('webpack');

module.exports = {
    entry: {
        'ng-dynamic-form': './src/index.js',
        'ng-dynamic-form.min': './src/index.js'
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
                test: /\.js$/,
                exclude: /node_modules/,
                loader: 'babel',
                query: {
                    presets: ['es2015']
                }
            }
        ]
    },

    plugins: [
        new webpack.optimize.UglifyJsPlugin({
            include: /\.min\.js$/,
            minimize: true,
            mangle: {
                screw_ie8: true,
                keep_fnames: false
            },
            compress: {
                screw_ie8: true,
                warnings: false
            }
        })
    ]
};
