
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
