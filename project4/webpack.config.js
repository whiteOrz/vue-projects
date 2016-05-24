module.exports = {
    entry: "./project4/src/index.js",
    output: {
        path: __dirname,
        filename: 'build/build.js'
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
