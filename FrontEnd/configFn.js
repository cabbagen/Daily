
// 定义 `webpake` 配置工具函数
var fs = require('fs'),
	path = require('path');

/**
 * 获取 `webpack` 入口文件对象
 * @param  {String} dirPath 入口文件夹路径
 * @return {Object} 返回入口文件对象        
 */
function getEntryFile(dirPath) {
	var files = {};

	dirPath = (dirPath.slice(-1) == '/') ? dirPath : dirPath + '/'; // 路径补全

	fs.readdirSync(dirPath, 'utf8').forEach(function(value, index) {
		var isFile = fs.lstatSync(dirPath + value).isFile();
		if(isFile) {
			files[path.basename(value, '.js')] = dirPath + value;
		}
	});

	return files;
}


module.exports = {
	getEntryFile : getEntryFile
}

