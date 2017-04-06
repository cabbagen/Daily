import { delay } from 'redux-saga';
import { put, takeEvery, call } from 'redux-saga/effects';
import servers from '../servers';

// 请求分享文件内容
function* requireFileContentAsync(action) {
	var data = yield call(servers.fileServer.requireFileContentAsync, action.filePath, action.fileId);
	if(data.status && data.status === 200) {
		yield put({type : 'requireFileContentAsyncSuccess', fileContent : data.data.fileContent, fileObject : data.data.fileObject});
	} else if(data.status && data.status !== 200) {
		yield put({type : 'requireFileContentAsyncError', msg : data.msg});
	} else {
		yield put({type : 'requireFileContentAsyncError', msg : data.msg});
	}
}

export function* watchFile() {
  yield takeEvery('requireFileContent', requireFileContentAsync);
};