const webpack = require('webpack');
const merge = require('webpack-merge')
const common = require('./webpack.common.js')

module.exports = merge(common, {
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
})







