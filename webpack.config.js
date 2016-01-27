var path = require('path');
var webpack = require('webpack');

module.exports = {
    entry: "./src/json-casing.js",
    output: {
        path: __dirname,
        filename: "index.js",
        library: 'JSONCasing',
        libraryTarget: 'umd'
    },
    module: {
        loaders: [
            { test: /\.js$/, loader: "babel-loader" }
        ]
    },
    watch: true,
    devtool: 'source-map'
};