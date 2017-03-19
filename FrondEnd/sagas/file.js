
import { delay } from 'redux-saga';
import { put, takeEvery, call } from 'redux-saga/effects';
import servers from '../servers';

// 请求文件内容数据
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

// 上传文件
function* uploadFileAsync(action) {
	var data = yield call(servers.fileServer.uploadFileAsync, action.params);
	if(data.status && data.status === 200) {
		yield put({type : 'uploadFileAsyncSuccess', msg : data.successMsg});
	} else if(data.status && data.status !== 200) {
		yield put({type : 'uploadFileAsyncError', msg : data.msg});
	} else {
		yield put({type : 'uploadFileAsyncError', msg : data.msg});
	}
}

export function* watchFile() {
	yield takeEvery('requireFileContent', requireFileContentAsync);
	yield takeEvery('uploadFile', uploadFileAsync);
};