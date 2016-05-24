module.exports = {
    entry: "./project5/index.js",
    output: {
        path: __dirname,
        filename: 'build.js'
    },
    module: {
        loaders: [{
            test: /\.vue$/,
            loader: "vue"
        }, {
            test: /\.js$/,
            loader: "babel",
            exclude: /node_modules/
        }, {
            test: /\.(png|jpg|gif)$/,
            loader: 'url-loader'
        },
        {
            test: /\.json$/,
            loader: "json"
        }]
    },
    babel: {
        presets: ["es2015"],
        plugins: ["transform-runtime"]
    },
    resolve: {
        extensions: ['', '.js', '.vue', '.css', '.json']
    }
}
