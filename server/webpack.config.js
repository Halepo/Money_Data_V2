const path = require('path');
const nodeExternals = require('webpack-node-externals');
const TsconfigPathsPlugin = require('tsconfig-paths-webpack-plugin');
const WebpackShellPlugin = require('webpack-shell-plugin');
const NodemonPlugin = require('nodemon-webpack-plugin')
/*
This line is only required if you are specifying `TS_NODE_PROJECT` for whatever reason.
 */
// delete process.env.TS_NODE_PROJECT;
const entries = ['./src/index.ts'];

module.exports = {
    context: __dirname,
    mode: 'development',
    watch: true,
    entry: entries,
    devtool: 'source-map',
    resolve: {
        // Add `.ts` and `.tsx` as a resolvable extension.
        extensions: ['', '.webpack.js', '.web.js', '.ts', '.tsx', '.js', '.jsx'],
        symlinks: false,
        cacheWithContext: false,
        plugins: [
            new TsconfigPathsPlugin({
                configFile: './tsconfig.paths.json',
            }),
        ],
    },
    output: {
        libraryTarget: 'commonjs',
        path: path.join(__dirname, 'build'),
        filename: '[name].js',
    },
    optimization: {
        concatenateModules: false,
    },
    target: 'node',
    externals: [nodeExternals()],
    module: {
        rules: [
            // all files with a `.ts` or `.tsx` extension will be handled by `ts-loader`
            {
                test: /\.ts?$/,
                loader: 'ts-loader',
                exclude: [
                    [
                        path.resolve(__dirname, 'node_modules'),
                        path.resolve(__dirname, 'build'),
                    ],
                ],
                options: {
                    transpileOnly: true,
                    experimentalWatchApi: true,
                },
            },
        ],
    },
    plugins: [
        new NodemonPlugin()
    ],
};