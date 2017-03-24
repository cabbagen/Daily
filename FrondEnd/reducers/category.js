
const initCalendarState = {
	notifications : '',

	// 当页人员数据列表
	currentUserList : null, 
	searchTotalPage : undefined,
};


const categoryReducerMap = {
	// 取消通知
	removeNotification : function(state, action) {
		var newState = Object.assign({}, state, {notifications : ''});
		return newState;
	},

	// 请求人员列表
	requireUserForAddFriendListAsyncSuccess : function(state, action) {
		return Object.assign({}, state, {
			currentUserList : action.currentUserList,
			searchTotalPage : action.searchTotalPage
		});
	},
	requireUserForAddFriendListAsyncError : function(state, action) {
		return Object.assign({}, state, {
			notifications : action.msg
		});
	},

	demo : function(state, action) {
		console.log('ok');
		return state;
	}

};

export default function(state=initCalendarState, action) {
	try {
		return categoryReducerMap[action.type](state, action);
	} catch(e) {
		return state;
	}
}
