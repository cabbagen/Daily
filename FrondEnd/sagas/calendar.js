
import { delay } from 'redux-saga';
import { put, takeEvery, call } from 'redux-saga/effects';
import servers from '../servers';

// 请求本月日程任务数据
function* requireMonthDataAsync(action) {
	var data = yield call(servers.calendarServer.requireMonthDataAsync, action.timestamp);
	if(data.status && data.status === 200) {
		yield put({type : 'requireMonthDataAsyncSuccess', monthAffair : data.monthAffair});
	} else if(data.status && data.status !== 200) {
		yield put({type : 'requireMonthDataAsyncError', msg : data.msg});
	} else {
		yield put({type : 'requireMonthDataAsyncError', msg : data.msg});
	}
}

// 拉取当日日程任务数据
function* requireDayDataAsync(action) {
	var data = yield call(servers.calendarServer.requireDayDataAsync, action.timestamp);
	if(data.status && data.status === 200) {
		yield put({type : 'requireDayDataAsyncSuccess', currentAffairList : data.dayAffairList});
	} else if(data.status && data.status !== 200) {
		yield put({type : 'currentAffairListAsyncError', msg : data.msg});
	} else {
		yield put({type : 'currentAffairListAsyncError', msg : data.msg});
	}
}

export function* watchFile() {
	yield takeEvery('requireMonthData', requireMonthDataAsync);
	yield takeEvery('requireDayData', requireDayDataAsync);
};