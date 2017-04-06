
// 取消通知
export const removeNotification = () => ({
  type : 'removeNotification'
});

// 加载群文件
export const getTribeFiles = (tribeId) => ({
	type : 'getTribeFiles',
	tribeId : tribeId
});

// 删除群文件
export const deleteTribeFiles = (tribeFileIds, tribeId) => ({
	type : 'deleteTribeFiles',
	tribeFileIds : tribeFileIds,
	tribeId : tribeId
});

// 获取群文件内容
export const getTribeFileContent = (filePath, fileId) => ({
	type : 'getTribeFileContent',
	filePath : filePath,
	fileId : fileId
});

// 重置初始加载数据
export const resetGetInitTribeFileContent = () => ({
	type : 'resetGetInitTribeFileContent'
});

// 创建群文件
export const createTribeFile = () => ({
	type : 'createTribeFile'
});

// 保存群文件
export const saveTribeFile = (params) => ({
	type : 'saveTribeFile',
	params : params
});