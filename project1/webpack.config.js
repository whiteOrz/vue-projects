module.exports = {
    entry: "./project1/index.js",
    output: {
        path: __dirname,
        filename: "build.js"
    },
    module: {
        loaders: [
            {
                test: /\.vue$/,
                loader: "vue"
            },
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
            }
        ]
    },
    babel: {
        presets: ["es2015"],
        plugins: ["transform-runtime"]
    },
    resolve: {
        extensions: ['', '.js', '.vue','.json','.html']
    }
}
