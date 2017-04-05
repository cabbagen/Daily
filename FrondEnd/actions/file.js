
// 请求文件数据
export const requireFileContent = (filePath, fileId) => ({
  type : 'requireFileContent',
  filePath : filePath,
  fileId : fileId
});

// 文件状态重置
export const resetState = () => ({
  type : 'resetState'
});

// 上传文件
export const uploadFile = (formData) => ({
  type : 'uploadFile',
  params : formData
});

// 下载文件
export const downloadFile = () => ({
  type : 'downloadFile'
});


// 取消通知
export const removeNotification = () => ({
  type : 'removeNotification'
});

// 监听文件名称变化
export const fileNameChange = (fileName) => ({
	type : 'fileNameChange',
	fileName : fileName
});

// 监听文件内容变化
export const fileContentChange = (fileContent) => ({
	type : 'fileContentChange',
	fileContent : fileContent
});

// 取消重置
export const cancelResetEditState = () => ({
	type : 'cancelResetEditState'
});