
// 取消通知
export const removeNotification = () => ({
  type : 'removeNotification'
});

// 退群
export const leaveTribe = (tribeId) => ({
	type : 'leaveTribe',
	tribeId : tribeId
});