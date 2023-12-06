const path = require('path');
const CleanPlugin = require('clean-webpack-plugin');
// const Dotenv = require('dotenv-webpack');
const webpack = require('webpack');
const dotenv = require('dotenv')
dotenv.config({ path: require('find-config')('.env') });

// const isProduction = NODE_ENV === 'production';
const dotenvFilename = '.env';

module.exports = {
    entry: './src/app.ts',
    mode: 'production',
    devServer: {
        static: [
            {
                directory: path.join(__dirname)
            }
        ]
    },
    output: {
        filename: 'bundle.js',
        path: path.join(__dirname, 'dist')
    },
    module: {
        rules: [
            {
                test: /\.ts$/,
                use: 'ts-loader',
                exclude: /node_modules/
            }
        ]
    },
    resolve: {
        extensions: ['.ts', '.js'],
        fallback: {
            "crypto": false,
            "os": false,
            "path": require.resolve("path-browserify")
        }
    },
    plugins: [
        new CleanPlugin.CleanWebpackPlugin(),
        new webpack.ProvidePlugin({
            process: 'process/browser',
        }),
        new webpack.DefinePlugin({
            'process.env': JSON.stringify(process.env)
        })
    ]
}