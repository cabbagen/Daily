
var path = require('path');
var webpack = require('webpack');
var UglifyJSPlugin = require('uglifyjs-webpack-plugin');
var ExtractTextPlugin = require('extract-text-webpack-plugin');
var CleanCSSPlugin = require('less-plugin-clean-css');

module.exports = {
  entry : {
    app : './app.js'
  },
  output : {
    path : path.resolve(__dirname, '../', './Public/javascript'),
    filename : '[name].js'
  },
  module : {
    rules : [
      {
        test : /\.less$/,
        use : ExtractTextPlugin.extract({
          fallback: 'style-loader',
          use :[
            { loader : 'css-loader', options : {importLoaders : 1, modules : true} },
            { loader : 'less-loader', options : {lessPlugins : [new CleanCSSPlugin({ advanced: true })]} },
          ]
        })
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
    new webpack.DefinePlugin({
      'process.env' : {
        NODE_ENV : JSON.stringify('production')
      }
    }),
    new UglifyJSPlugin(),
    new ExtractTextPlugin({
      filename : function(getPath) {
        return getPath('javascript/[name].css').replace('javascript', '../style');
      },
      allChunks: true
    })
  ]
};
