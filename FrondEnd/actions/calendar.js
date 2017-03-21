
// 取消通知
export const removeNotification = () => ({
	type : 'removeNotification'
});

// 拉取本月日程任务数据
export const requireMonthData = (timestamp) => ({
	type : 'requireMonthData',
	timestamp : timestamp
});

export const demo = () => ({
	type : 'demo'
});