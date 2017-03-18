
// demo 示例
export const greet = () => ({
	type : 'demo'
});

// 请求文件数据
export const requireFileContent = (filePath, fileId) => ({
	type : 'requireFileContent',
	filePath : filePath,
	fileId : fileId
});

// 删除文件
// export const deleteFile = (fileId) => ({
// 	type : 'deleteFile',
// 	fileId : fileId
// });

// 保存文件
export const saveFile = (fileInfos) => ({
	type : 'saveFile',
	fileInfos : fileInfos
});

// 新建文件

// 文件更名
export const changeFileName = (fileName) => ({
	type : 'changeFileName',
	file_name : fileName
});

// 文件状态重置
export const resetState = () => ({
	type : 'resetState'
});

// 更新文件夹ID
// export const updateFolder = (currentFolderId) => ({
// 	type : 'updateFolder',
// 	currentFolderId : currentFolderId
// });
