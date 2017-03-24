
export const demo = () => ({
	type : 'demo'
});

// 取消通知
export const removeNotification = () => ({
	type : 'removeNotification'
});

// 请求人员列表
export const requireUserForAddFriendList = (params) => ({
	type : 'requireUserForAddFriendList',
	params : params
});