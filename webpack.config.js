const HtmlWebpackPlugin = require("html-webpack-plugin");
const path = require('path');
const ModuleFederationPlugin = require("webpack/lib/container/ModuleFederationPlugin");
const { dependencies } = require("./package.json");


module.exports = {
    entry: "./src/index",
    mode: "development",
    output: {
        publicPath: 'http://localhost:3000/',
    },
    devServer: {
        port: 3000,
        headers: {
            "Access-Control-Allow-Origin": "*",
        },
    },
    module: {
        rules: [
            {
                test: /\.(js|jsx)?$/,
                exclude: /node_modules/,
                use: [
                    {
                        loader: "babel-loader",
                        options: {
                            presets: ["@babel/preset-env", "@babel/preset-react"],
                        },
                    },
                ],
            },
            {
                test: /\.css$/i,
                use: ["style-loader", "css-loader"],
            },
        ],
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: path.resolve(__dirname, './public/index.html'),
        }),
        new ModuleFederationPlugin({
            name: "HomeApp",
            remotes: {
                "HeaderApp": "HeaderApp@http://localhost:3001/remoteEntry.js",
            },
            shared: {  // and shared
                ...dependencies,  // other dependencies
                react: { // react
                    singleton: true,
                    requiredVersion: dependencies["react"],
                },
                "react-dom": { // react-dom
                    singleton: true,
                    requiredVersion: dependencies["react-dom"],
                },
            },
        }),
    ],
    resolve: {
        extensions: [".js", ".jsx"],
    },
    target: "web",
};