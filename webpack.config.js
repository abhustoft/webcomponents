const path = require('path');
const webpack = require('webpack');
const {CleanWebpackPlugin} = require('clean-webpack-plugin');

module.exports = {
    entry: {'input-component': './src/input-component/input-component','email-input-shadow': './src/email-input/email-input-shadow', 'one-dialog':'./src/bare/one-dialog'},
    output: {
        path: path.join(__dirname, 'target/build/js'),
        filename: '[name].js',
    },
    target: 'web',
    module: {
        rules: [
            {
                // Less files that are not CSS modules
                test: /^((?!module).)*.less$/,
                loaders: [
                    'style-loader',
                    'css-loader',
                    'postcss-loader',
                    'less-loader',
                ],
            },
            {
                // Less files that are used for css-in-js
                test: /module.less$/,
                use: [
                    {loader: 'style-loader'},
                    {
                        loader: 'css-loader',
                        options: {
                            sourceMap: true,
                            modules: {
                                mode: 'local',
                                localIdentName: '[local]_[hash:base64:5]',
                            },
                        },
                    },
                    // Needed for autoprefixer to transpile CSS Grid to IE targets
                    'postcss-loader',
                    {loader: 'less-loader'},
                ],
            },
        ],
    },
    resolve: {
        // options for resolving module requests
        // (does not apply to resolving to loaders)

        modules: ['node_modules', path.resolve(__dirname, 'src')],
        // directories where to look for modules

        extensions: ['.js', '.json', '.jsx', '.css'],
        // extensions that are used
    },
    plugins: [
        new CleanWebpackPlugin({
            verbose: true,
            cleanOnceBeforeBuildPatterns: ['**/*'],
        }),
        new webpack.DefinePlugin({
            'process.env': {
                NODE_ENV: JSON.stringify(process.env.NODE_ENV),
            },
        }),
        new webpack.NoEmitOnErrorsPlugin(),
    ],
};
