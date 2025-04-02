// Import required dependencies
const path = require('path');
const {CleanWebpackPlugin} = require('clean-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const {ProvidePlugin} = require('webpack');

module.exports = (env, argv) => {
    let config = {
        // Defines the main entry point for Webpack.
        // Webpack will start bundling from "jqueryWebpackDemo.js" and include all its dependencies.
        entry: {
            main: {
                import: path.resolve(__dirname, 'src/javascript/jqueryWebpackDemo'),
            }
        },
        // Defines where and how the bundled files will be generated.
        // "path" sets the output directory.
        // "filename" sets the name of the main bundle.
        // "chunkFilename" sets the name pattern for additional chunks (with a hash for cache busting).
        output: {
            path: path.resolve(__dirname, 'src/main/resources/javascript/apps'),
            filename: '[name].asset-webpack-example.bundle.js',
            chunkFilename: '[name].asset-webpack-example.[chunkhash:6].js'
        },
        // Defines how different types of files should be processed.
        // Here, all ".css" files will be handled by "css-loader" (to read CSS)
        // and "style-loader" (to inject CSS into the page).
        module: {
            rules: [
                {
                    test: /\.css$/i,
                    use: ["style-loader","css-loader"],
                }
            ]
        },
        // Plugins used to enhance the build process:
        // - ProvidePlugin: Automatically makes jQuery available in all modules (no need to import it manually).
        // - CleanWebpackPlugin: Cleans the output directory before each build.
        // - CopyWebpackPlugin: Copies the package.json file to the output folder (optional, used here for reference).
        // A list of plugins can be found at https://webpack.js.org/plugins
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
        // Configure how modules are resolved:
        // - alias: Forces Webpack to use specific versions/paths of jQuery and jQuery UI.
        // - modules: Defines folders where Webpack will look for modules when importing.
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

    // Enable source maps only in development mode (for easier debugging)
    config.devtool = (argv.mode === 'production') ? undefined : 'source-map';
    return config;
};
