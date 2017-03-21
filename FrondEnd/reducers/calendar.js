
const initCalendarState = {
	notifications : '',
	monthAffair : null
};

const calendarReducerMap = {
	// 取消通知
	removeNotification : function(state, action) {
		var newState = Object.assign({}, state, {notifications : ''});
		return newState;
	},

	// 请求本月日程任务数据
	requireMonthDataAsyncSuccess : function(state, action) {
		return Object.assign({}, state, {
			monthAffair : action.monthAffair
		});
	},
	requireMonthDataAsyncError : function(state, action) {
		return Object.assign({}, state, {
			notifications : action.msg
		});
	},
	demo : function(state, action) {
		console.log('0000');
		return state;
	}

};

export default function(state=initCalendarState, action) {
	try {
		return calendarReducerMap[action.type](state, action);
	} catch(e) {
		return state;
	}
}
