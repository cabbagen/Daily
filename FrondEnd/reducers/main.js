
const mainInitState = {
	userInfo : window.userInfo,
	isLoading : true,
	notifications : "",
	userMenuInfo : {},
	foldersCategoryItem : [],
	calendarsCategoryItem : [],
	categorysCategoryItem : [],
	groupsCategoryItem : [],
	sharesCategoryItem : []
};

const mainReducerMap = {
	sendEmailInvitation : function(state, action) {
		// console.info(`发送邮件 action: ${JSON.stringify(action)}`);
		return state;
	},
	getUserMenuInfo : function(state, action) {
		return state;
	},
	getUserMenuInfoAsyncSuccess : function(state, action) {
		action.userMenuInfo['Shares'] = [
			{id : 1, share_name : "来自我的分享"},
			{id : 2, share_name : "我收到的分享"}
		];
		return Object.assign({}, state, {isLoading:false, userMenuInfo:action.userMenuInfo});
	},
	getUserMenuInfoAsyncError : function(state, action) {
		return state;
	},
	getFoldersCategoryItem : function(state, action) {
		// console.log('获取文件夹内的文件');
		return state;
	},
	getFoldersCategoryItemAsyncSuccess : function(state, action) {
		// console.log('获取文件夹内的文件成功');
		return Object.assign({}, state, action);
	},
	getFoldersCategoryItemAsyncError : function(state, action) {
		// console.log('获取文件夹内的文件失败');
		return state;
	},
	getCalendarsCategoryItem : function(state, action) {
		return state;
	},
	getCalendarsCategoryItemAsyncSuccess : function(state, action) {
		// console.log('获取日程组内的日程成功');
		return Object.assign({},state, action);
	},
	getCalendarsCategoryItemAsyncError : function(state, action) {
		// console.log('获取日程组内的日程失败');
		return state;
	},
	getCategorysCategoryItem : function(state, action) {
		return state;
	},
	getCategorysCategoryItemAsyncSuccess : function(state, action) {
		// console.log('获取好友组内的好友成功');
		return Object.assign({}, state, action);
	},
	getCategorysCategoryItemAsyncError : function(state, action) {
		// console.log('获取好友组内的好友失败');
		return state;
	},
	getGroupsCategoryItem : function(state, action) {
		return state;
	},
	getGroupsCategoryItemAsyncSuccess : function(state, action) {
		// console.log('获取好友群内的好友列表成功');
		return Object.assign({}, state, action);
	},
	getGroupsCategoryItemAsyncError : function(state, action) {
		// console.log('获取好友群内的好友列表失败');
		return state; 
	},
	getSharesCategoryItem : function(state, action) {
		return state;
	},
	getSharesCategoryItemAsyncSuccess : function(state, action) {
		// console.log('获取分享文件成功');
		return Object.assign({}, state, action);
	},
	getSharesCategoryItemAsyncError : function(state, action) {
		// console.log('获取分享文件失败');
		return state;
	}
};

export default function(state = mainInitState, action) {
	try {
		return mainReducerMap[action.type](state, action);
	} catch(e) {
		return state;
	}
};