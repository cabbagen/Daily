
import { delay } from 'redux-saga';
import { put, takeEvery, call } from 'redux-saga/effects';
import servers from '../servers';


export function* getUserMenuInfoAsync() {
	var data = yield call(servers.mainServer.getUserMenuInfoAsync);
	if(data.status && data.status === 200) {
		yield put({type:'getUserMenuInfoAsyncSuccess', userMenuInfo:data.data});
	} else if(data.status && data.status !== 200) {
		yield put({type:'getUserMenuInfoAsyncError'});
	} else {
		yield put({type:'getUserMenuInfoAsyncError'});
	}
};


// 缺失添加分类部分 ......



export function* watchGetUserMenuInfo() {
	yield takeEvery('getUserMenuInfo', getUserMenuInfoAsync);
};