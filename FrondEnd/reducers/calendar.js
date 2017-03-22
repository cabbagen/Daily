
const initCalendarState = {
	notifications : '',
	monthAffair : null,
	currentAffairList : [],
	chartData : [],
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

	// 请求单日日程任务数据
	requireDayDataAsyncSuccess : function(state, action) {
		return Object.assign({}, state, {
			currentAffairList : action.currentAffairList
		});
	},
	requireDayDataAsyncError : function(state, action) {
		return Object.assign({}, state, {
			notifications : action.msg
		});
	},

	// 请求图表数据
	requireChartDataAsyncSuccess : function(state, action) {
		var adapterData = action.chartData.map(item => {
			item.completed = item.completed ? parseInt(item.completed, 10) : 0;
			item.uncompleted = item.uncompleted ? parseInt(item.uncompleted, 10) : 0;
			return item;
		});
		return Object.assign({}, state, {
			chartData : adapterData
		});

	},
	requireChartDataAsyncError : function(state, action) {
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
