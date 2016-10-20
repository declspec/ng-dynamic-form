var webpack = require('webpack'),
    pkg = require('./package.json'),
    libName = 'ng-dynamic-form-' + pkg.version;

module.exports = {
    entry: {
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
                loader: 'ngtemplate?relativeTo=src/&prefix=ng-dynamic-form-!html' 
            },
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
            mangle: true
        })
    ]
};

module.exports.entry[libName] = module.exports.entry[libName + '.min'] = [ './src/index.js' ];