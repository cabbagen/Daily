// webpack.config.js

var webpack = require('webpack');

module.exports = {
	entry : {

	},
	output : {

	},
	module : {
		loaders : [
			{ test: /\.less$/, loader: 'style-loader!css-loader!less-loader' }, // use ! to chain loaders
			{test: /\.(png|jpg)$/, loader: 'url-loader?limit=8192'}
		]
	},
	plugins : [
		
	]
}
