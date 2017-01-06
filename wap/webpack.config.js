module.exports = {
    entry: {
        wap_orderInfoNormal: "./wap/src/wap_orderInfoNormal.js",
        wap_healthInform: "./wap/src/wap_healthInform.js",
        wap_pay: "./wap/src/wap_pay.js",
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
        }, {
            test: /\.(png|jpg|gif)$/,
            loader: 'url-loader'
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
