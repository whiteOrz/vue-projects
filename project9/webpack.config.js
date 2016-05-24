module.exports = {
    entry: {
        wap_orderinfo : "./project9/src/wap_orderinfo.js",
        wap_pay : "./project9/src/wap_pay.js"
    },
    output: {
        path: __dirname,
        filename: "js/[name].js"
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
