// import { delay } from 'redux-saga';
// import { put, takeEvery, call } from 'redux-saga/effects';
// import servers from '../servers';

// // 删除分享文件
// function* deleteShareFileAsync(action) {
// 	var data = yield call(servers.shareServer.deleteShareFileAsync, action.fileId, action.type);
// 	if(data.status && data.status === 200) {
// 		yield put({type : 'deleteShareFileAsyncSuccess', shareFiles : data.shareFiles});
// 	} else if(data.status && data.status !== 200) {
// 		yield put({type : 'deleteShareFileAsyncError', msg : data.msg});
// 	} else {
// 		yield put({type : 'deleteShareFileAsyncError', msg : data.msg});
// 	}
// }

export function* watchFile() {
  // yield takeEvery('deleteShareFile', deleteShareFileAsync);
};