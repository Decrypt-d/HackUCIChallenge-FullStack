module.exports = {
    entry: __dirname + "/src/app.js",

    output:{
        path: __dirname + "/dist",
        filename: "bundle.js",
    },

    module: {
        rules: [
            {
                test: /\.jsx?$/, 
                use: "babel-loader", 
                exclude : /node_modules/
            }
        ]
    }

}