import { delay } from 'redux-saga';
import { put, takeEvery, call } from 'redux-saga/effects';
import servers from '../servers';

// 退群
// function* leaveTribeAsync(action) {
// 	var data = yield call(servers.groupServer.leaveTribeAsync, action.tribeId);
// 	if(data.status && data.status === 200) {
// 		yield put({type : 'leaveTribeAsyncSuccess'});
// 	} else if(data.status && data.status !== 200) {
// 		yield put({type : 'leaveTribeAsyncError', msg : data.msg});
// 	} else {
// 		yield put({type : 'leaveTribeAsyncError', msg : data.msg});
// 	}
// }

export function* watchFile() {
  // yield takeEvery('leaveTribe', leaveTribeAsync);
};