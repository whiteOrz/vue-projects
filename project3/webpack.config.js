module.exports = {
    entry: {
        index: "./project3/src/index.js",
        order: "./project3/src/order.js",
        pay: "./project3/src/pay.js",
        payResult: "./project3/src/payResult.js"
    },
    output: {
        path: __dirname,
        filename: 'build/[name].js'
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
                test: /\.json$/,
                loader: "json"
            },
            {
                test: /\.css$/,
                loader: "style-loader!css-loader"
            }
        ]
    },
    babel: {
        presets: ["es2015"],
        plugins: ["transform-runtime"]
    },
    resolve: {
        extensions: ['', '.js', '.vue', '.css','.json']
    }
}
