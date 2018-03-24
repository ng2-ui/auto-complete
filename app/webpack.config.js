const path = require('path');
const webpack = require('webpack');
const helpers = require('./helpers');

const ContextReplacementPlugin = require('webpack/lib/ContextReplacementPlugin');

const config = {
    resolve: {
        extensions: ['.ts', '.webpack.js', '.web.js', '.js'],
        alias: {
            '@ngui/auto-complete': path.join(__dirname, '..', 'src', 'index')
        }
    },
    devtool: 'source-map',
    entry: './app/main.ts',
    module: {
        rules: [
            {
                test: /\.ts$/,
                use: [
                    {
                        loader: 'ts-loader',
                        options: {}
                    },
                    'angular2-template-loader'
                ]
            },
            {test: /\.html$/, use: ['raw-loader']}
        ]
    },
    plugins: [
        new ContextReplacementPlugin(
            /**
             * The (\\|\/) piece accounts for path separators in *nix and Windows
             */
            /\@angular(\\|\/)core(\\|\/)esm5/,
            helpers.root('src'), // location of your src
            {
                /**
                 * your Angular Async Route paths relative to this root directory
                 */
            }
        )
    ],
    output: {
        path: `${__dirname}/build/`,
        publicPath: '/build/',
        filename: 'app.js'
    }
};

if (process.env.NODE_ENV === 'prod') {
    config.plugins = [
        new webpack.optimize.UglifyJsPlugin({compress: {warnings: false}}),
        new ContextReplacementPlugin(
            /**
             * The (\\|\/) piece accounts for path separators in *nix and Windows
             */
            /\@angular(\\|\/)core(\\|\/)esm5/,
            helpers.root('src'), // location of your src
            {
                /**
                 * your Angular Async Route paths relative to this root directory
                 */
            }
        )
    ];
    config.module.rules.push({
        test: /\.ts$/, use: 'strip-loader?strip[]=debug,strip[]=console.log'
    });
}

module.exports = config;
