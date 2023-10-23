const path = require('path');
const {CleanWebpackPlugin} = require('clean-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const {ProvidePlugin} = require('webpack');

module.exports = (env, argv) => {
    let config = {
        entry: {
            main: {
                import: path.resolve(__dirname, 'src/javascript/jqueryWebpackDemo'),
            }
        },
        output: {
            path: path.resolve(__dirname, 'src/main/resources/javascript/apps'),
            filename: '[name].asset-webpack-example.bundle.js',
            chunkFilename: '[name].asset-webpack-example.[chunkhash:6].js'
        },
        module: {
            rules: [
                {
                    test: /\.css$/i,
                    use: ["style-loader","css-loader"],
                }
            ]
        },
        plugins: [
            new ProvidePlugin({
                'window.jQuery': 'jquery',
                'window.$': 'jquery',
                'jQuery': 'jquery',
                '$': 'jquery',
            }),
            new CleanWebpackPlugin({verbose: false}),
            new CopyWebpackPlugin({patterns: [{from: './package.json', to: ''}]}),
        ],
        resolve: {
            alias: {
                'jquery': 'jquery/src/jquery',
                'jquery-ui': 'jquery-ui/dist/jquery-ui'
            },
            modules: [
                path.resolve(__dirname, 'src/javascript'),
                path.resolve(__dirname, 'node_modules')
            ]
        },
        mode: argv.mode || 'development'
    };

    config.devtool = (argv.mode === 'production') ? undefined : 'source-map';
    return config;
};
