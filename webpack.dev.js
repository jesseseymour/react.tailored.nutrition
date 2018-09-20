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
			target: "https://iams-develop.catapultstaging.com",
			secure: false,
			changeOrigin: true
		}]
	},
	plugins: [
		new webpack.HotModuleReplacementPlugin(),
		new webpack.NamedModulesPlugin(),
		new webpack.DefinePlugin({
			"process.env": {
				NODE_ENV: JSON.stringify("development")
			}
		})
	]
})







