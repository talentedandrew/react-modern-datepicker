var path = require("path");
var webpack = require("webpack");

module.exports = {
  mode: "development",
  entry: "./lib/index.js",
  output: {
    path: path.resolve(__dirname, "dist"),
    filename: "main.js"
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader"
        }
      }
    ]
  },
  plugins: [
    new webpack.ContextReplacementPlugin(/moment[\/\\]locale$/, /de|fr|hu/)
    // new webpack.IgnorePlugin(/^\.\/locale$/, /moment$/)
  ]
};
