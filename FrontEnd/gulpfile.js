
var gulp = require('gulp'),
	configFn = require('./configFn.js'),
	path = require('path'),
	webpack = require('webpack'),
	webpackStream = require('webpack-stream'),
	less = require('gulp-less'),
	cleanCss = require('gulp-clean-css'),
	autoprefixer = require('gulp-autoprefixer');


// javascitpt 
gulp.task('webpack', function() {
	return gulp.src('./javascript/*.js')
		.pipe(webpackStream({
			entry : configFn.getEntryFile('./javascript/'),
			output : {
				path : '/',
				filename : '[name].js'
			},
			plugins : [
				new webpack.optimize.UglifyJsPlugin({
					warnings : false
				})
			]
		}))
		.pipe(gulp.dest('../Public/javascript/'));
});

// css 
gulp.task('less', function() {
	return gulp.src('./style/*.less')
		.pipe(less({
			path : [path.join(__dirname), 'commom']
		}))
		.pipe(autoprefixer({
			browsers : ['last 2 versions'],
			cascade : false
		}))
		.pipe(cleanCss({
			debug : true,
			compatibility : 'ie8'
		}))
		.pipe(gulp.dest('../Public/style/'));
});

// watch
gulp.task('watch', function() {
	gulp.watch(['./javascript/*.js', './javascript/**/*.js'], ['webpack']);
	gulp.watch(['./style/*.less', './style/**/*.less'], ['less']);
});


gulp.task('default', ['less', 'webpack', 'watch']);



