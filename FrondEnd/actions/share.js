
// 取消通知
export const removeNotification = () => ({
  type : 'removeNotification'
});

// 请求文件内容
export const requireFileContent = (filePath, fileId) => ({
	type : 'requireFileContent',
	filePath : filePath,
	fileId : fileId
});