/* eslint-disable no-var, prefer-template */
const webpack = require('webpack');
const merge = require('webpack-merge');
const baseConfig = require('./webpack.config');
const TerserJSPlugin = require('terser-webpack-plugin');
//-----------------------------------------------------------------------------

const devConfig = {
    // https://webpack.js.org/configuration/devtool/
    devtool: 'cheap-module-eval-source-map',
    watchOptions: {
        poll: 500,
    },
    plugins: [
        function() {
            this.plugin('watch-run', function(watching, callback) {
                console.log('Begin compile at ' + new Date());
                callback();
            });
        },
    ],
};

const production = {
    optimization: {
        minimizer: [
            new TerserJSPlugin({
                extractComments: true,
            }),
        ],
    },
    stats: {
        warningsFilter: 'size',
    },
    plugins: [new webpack.optimize.OccurrenceOrderPlugin()],
};

//-----------------------------------------------------------------------------

module.exports = (env = {}) => {
    let config = {};

    if (process.env.NODE_ENV === 'development') {
        config = merge(baseConfig, devConfig);
    } else {
        config = merge(baseConfig, production);
    }
    return config;
};
