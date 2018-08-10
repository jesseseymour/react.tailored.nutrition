const webpack = require('webpack');
const path = require("path");

module.exports = {
  entry: "./src/index.js",
  output: {
    path: path.resolve(__dirname, "dist/assets"),
    filename: "tailorednutrition.min.js",
    publicPath: "/"
  },
  module: {
    loaders: [
      {
        test: /\.js$/,
        exclude: /(node_modules)/,
        loader: "babel-loader"
      },
      {
        test: /\.json$/,
        exclude: /(node_modules)/,
        loader: "json-loader"
      }
    ]
  },
  devtool: "source-map",
  devServer: {
    inline: true,
    contentBase: './dist',
    historyApiFallback: true,
    port: 3000,
    hot: true,
    hotOnly: true,
    proxy: [{
      context: ["/api", "/Content", "/Sitefinity", "/images"],
      target: "http://localhost:51879",
      secure: false,
      changeOrigin: true
    }]
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NamedModulesPlugin()
  ]
}








