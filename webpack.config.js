const path = require("path");
module.exports = {
    entry: "./script/src/script.ts",
    output: {
        filename: "[name].js",
        path: path.resolve(__dirname, "script/dist"),
        clean: true
    },
    module: {
        rules: [
            {
                test: /\.ts$/i,
                use: "ts-loader"
            }
        ]
    },
    resolve: {
        extensions: [".ts"]
    },
    mode: "development"
};