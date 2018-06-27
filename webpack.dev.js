const webpack = require('webpack');
const merge = require('webpack-merge')
const common = require('./webpack.common.js')

const path = require("path");

module.exports = merge(common, {
	plugins: [
		new webpack.HotModuleReplacementPlugin(),
		new webpack.NamedModulesPlugin()
	],
	devtool: "source-map",
	devServer: {
		inline: true,
		contentBase: './dist',
		port: 3000,
		historyApiFallback: true,
		hot: true,
		hotOnly: true,
		proxy: [{
			context: ["/api", "/Content", "/Sitefinity", "/images"],
			target: "http://localhost:51879",
			secure: false,
			changeOrigin: true
		}]
	}
})







