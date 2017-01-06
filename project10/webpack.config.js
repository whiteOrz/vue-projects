module.exports = {
    entry: {
        build : "./project10/src/index.js",
        test : "./project10/src/test1.js"
    },
    output: {
        path: __dirname,
        filename: "js/[name].js"
    },
    module: {
        loaders: [{
            test: /\.js$/,
            loader: "babel",
            exclude: /node_modules/
        }, {
            test: /\.json$/,
            loader: "json"
        }, {
            test: /\.html$/,
            loader: "html"
        }, {
            test: /\.css$/,
            loader: "style!css"
        }]
    },
    babel: {
        presets: ["es2015"],
        plugins: ["transform-runtime"]
    },
    resolve: {
        extensions: ['', '.js', '.json', '.html', ".css"]
    }
}
