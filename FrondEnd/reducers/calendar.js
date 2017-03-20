
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
	requireMonthDataSuccess : function(state, action) {
		console.log(action.monthAffair);
		return state;
	},
	requireMonthDataError : function(state, action) {
		return Object.assign({}, state, {
			notifications : action.msg
		});
	}

};

export default function(state=initCalendarState, action) {
	try {
		return calendarReducerMap[action.type](state, action);
	} catch(e) {
		return state;
	}
}
