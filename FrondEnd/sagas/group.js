import { delay } from 'redux-saga';
import { put, takeEvery, call } from 'redux-saga/effects';
import servers from '../servers';

// 加载群文件
function* getTribeFilesAsync(action) {
	var data = yield call(servers.groupServer.getTribeFilesAsync, action.tribeId);
	if(data.status && data.status === 200) {
		yield put({type : 'getTribeFilesAsyncSuccess', tribeFilesObject : data.data});
	} else if(data.status && data.status !== 200) {
		yield put({type : 'getTribeFilesAsyncError', msg : data.msg});
	} else {
		yield put({type : 'getTribeFilesAsyncError', msg : data.msg});
	}
}

// 删除群文件
function* deleteTribeFilesAsync(action) {
	var data = yield call(servers.groupServer.deleteTribeFilesAsync, action.tribeFileIds, action.tribeId);
	if(data.status && data.status === 200) {
		yield put({type : 'deleteTribeFilesAsyncSuccess', tribeFiles : data.tribeFiles});
	} else if(data.status && data.status !== 200) {
		yield put({type : 'deleteTribeFilesAsyncError', msg : data.msg});
	} else {
		yield put({type : 'deleteTribeFilesAsyncError', msg : data.msg});
	}
}


export function* watchFile() {
  yield takeEvery('getTribeFiles', getTribeFilesAsync);
  yield takeEvery('deleteTribeFiles', deleteTribeFilesAsync);
};