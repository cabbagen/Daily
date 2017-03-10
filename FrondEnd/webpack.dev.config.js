
var path = require('path');
var HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
	entry : {
		app : './app.js'
	},
	output : {
		path : path.resolve(__dirname, 'dist'),
		filename : '[name].js'
	},
	module : {
		rules : [
			{
				test : /\.less$/,
				use : [
					'style-loader',
					{ loader : 'css-loader', options : {importLoaders : 1, modules : true} },
					'less-loader'
				],
				include : [path.resolve(__dirname, 'components'), path.resolve(__dirname, 'container')]
			},
			{
				test : /\.less$/,
				use : [
					'style-loader',
					{ loader : 'css-loader', options : {importLoaders : 1} },
					'less-loader'
				],
				include : path.resolve(__dirname, 'node_modules')
			},
			{
				test : /\.jsx?$/,
				exclude : /node_modules/,
				loader : 'babel-loader',
				include : [
					path.join(__dirname, 'components'),
					__dirname
				],
				query : {
					presets : ['es2015', 'react', 'es2017']
				}
			},
			{
				test : /\.html$/,
				loader : 'html-loader'
			}
		]
	},
	plugins: [
		new HtmlWebpackPlugin({
			template : "./template.html",
		})
	],
	devServer : {
		contentBase : path.join(__dirname, 'dist'),
		compress : true,
		port: 9000,
		watchContentBase : true,
		clientLogLevel: "warning"
	}
};
