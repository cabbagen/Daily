
const mainInitState = {
	userInfo : window.userInfo,
	isLoading : true,
	notifications : "",
	userMenuInfo : window.menuCategoryInfos,
	foldersCategoryItem : [],
	calendarsCategoryItem : [],
	categorysCategoryItem : [],
	groupsCategoryItem : [],
	sharesCategoryItem : []
};

const mainReducerMap = {

	// 发送邮件部分
	sendEmailInvitationAsyncSuccess : function(state, action) {
		var newState = Object.assign({}, state, {notifications : action.msg});
		return newState;
	},
	sendEmailInvitationAsyncError : function(state, action) {
		var newState = Object.assign({}, state, {notifications : action.msg});
		return newState;
	},
	
	// 查询二级分类列表
	getFoldersCategoryItemAsyncSuccess : function(state, action) {
		var tempObj = {foldersCategoryItem : action.foldersCategoryItem};
		return Object.assign({}, state, tempObj);
	},
	getFoldersCategoryItemAsyncError : function(state, action) {
		var newState = Object.assign({}, state, {notifications : action.msg});
		return newState;
	},
	getCalendarsCategoryItemAsyncSuccess : function(state, action) {
		var tempObj = {calendarsCategoryItem : action.calendarsCategoryItem};
		return Object.assign({},state, tempObj);
	},
	getCalendarsCategoryItemAsyncError : function(state, action) {
		var newState = Object.assign({}, state, {notifications : action.msg});
		return newState;
	},
	getCategorysCategoryItemAsyncSuccess : function(state, action) {
		var tempObj = {categorysCategoryItem : action.categorysCategoryItem};
		return Object.assign({}, state, tempObj);
	},
	getCategorysCategoryItemAsyncError : function(state, action) {
		var newState = Object.assign({}, state, {notifications : action.msg});
		return newState;
	},
	getGroupsCategoryItemAsyncSuccess : function(state, action) {
		var tempObj = {groupsCategoryItem : action.groupsCategoryItem};
		return Object.assign({}, state, tempObj);
	},
	getGroupsCategoryItemAsyncError : function(state, action) {
		var newState = Object.assign({}, state, {notifications : action.msg});
		return newState;
	},
	getSharesCategoryItemAsyncSuccess : function(state, action) {
		var tempObj = {sharesCategoryItem : action.sharesCategoryItem};
		return Object.assign({}, state, tempObj);
	},
	getSharesCategoryItemAsyncError : function(state, action) {
		var newState = Object.assign({}, state, {notifications : action.msg});
		return newState;
	},

	// 一级分类编辑及确认修改函数
	confirmMenuCategoryModifyItemAsyncSuccess : function(state, action) {
		var tempObj = Object.assign({}, state.userMenuInfo, action.category);
		return Object.assign({}, state, {userMenuInfo : tempObj});
	},
	confirmMenuCategoryModifyItemAsyncError : function(state, action) {
		var newState = Object.assign({}, state, {notifications : action.msg});
		return newState;
	},
	editMenuCategoryItem : function(state, action) {
		var newUserMenuInfo = Object.assign({}, state.userMenuInfo, action.categoryParams);
		return Object.assign({}, state, {userMenuInfo : newUserMenuInfo});
	},
	deleteMenuCategoryItemAsyncSuccess : function(state, action) {
		var tempObj = Object.assign({}, state.userMenuInfo, action.category);
		return Object.assign({}, state, {userMenuInfo : tempObj});
	},
	deleteMenuCategoryItemAsyncError : function(state, action) {
		var newState = Object.assign({}, state, {notifications : action.msg});
		return newState;
	},
	addMenuCategoryItemAsyncSuccess : function(state, action) {
		var tempObj = Object.assign({}, state.userMenuInfo, action.category);
		return Object.assign({}, state, {userMenuInfo : tempObj});
	},
	addMenuCategoryItemAsyncError : function(state, action) {
		var newState = Object.assign({}, state, {notifications : action.msg});
		return newState;
	},

	// 清除提示
	removeNotification : function(state, action) {
		var newState = Object.assign({}, state, {notifications : ''});
		return newState;
	}
};

export default function(state = mainInitState, action) {
	try {
		return mainReducerMap[action.type](state, action);
	} catch(e) {
		return state;
	}
};