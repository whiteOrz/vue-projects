module.exports = {
    entry: ["./project8/src/index.js"],
    output: {
        path: __dirname,
        filename: "build/build.js"
    },
    module: {
        loaders: [
            {
                test: /\.js$/,
                loader: "babel",
                exclude: /node_modules/
            },
            {
                test : /\.json$/,
                loader : "json"
            },
            {
                test : /\.html$/,
                loader : "html"
            },
            {
                test: /\.css$/,
                loader: "style!css"
            }
        ]
    },
    babel: {
        presets: ["es2015"],
        plugins: ["transform-runtime"]
    },
    resolve: {
        extensions: ['', '.js','.json','.html',".css"]
    }
}
