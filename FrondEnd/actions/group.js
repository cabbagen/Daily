
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