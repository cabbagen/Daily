
import { delay } from 'redux-saga';
import { put, takeEvery, call } from 'redux-saga/effects';
import servers from '../servers';

// 请求本月日程任务数据
function* requireMonthData() {
	var data = yield call(servers.calendarServer.requireMonthData);
	if(data.status && data.status === 200) {
		yield put({type : 'requireMonthDataSuccess', monthAffair : data.monthAffair});
	} else if(data.status && data.status !== 200) {
		yield put({type : 'requireMonthDataError', msg : data.msg});
	} else {
		yield put({type : 'requireMonthDataError', msg : data.msg});
	}
}

export function* watchFile() {
	yield takeEvery('requireMonthData', requireMonthDataAsync);
};