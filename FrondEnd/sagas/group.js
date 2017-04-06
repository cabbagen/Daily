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

// 获取群文件内容
function* getTribeFileContentAsync(action) {
	var data = yield call(servers.fileServer.requireFileContentAsync, action.filePath, action.fileId);
  if(data.status && data.status === 200) {  
    yield put({type : 'getTribeFileContentAsyncSuccess', fileContent : data.data.fileContent, fileObject : data.data.fileObject});
  } else if(data.status && data.status !== 200) {
    yield put({type : 'getTribeFileContentAsyncError', msg : data.msg});
  } else {
    yield put({type : 'getTribeFileContentAsyncError', msg : data.msg});
  }
}

// 获取群文件列表
function* getTribeFilesAsync(action) {
	var filesData = yield call(servers.groupServer.getTribeFilesAsync, action.tribeId);
	if(filesData.status && filesData.status === 200) {
    yield put({type : 'getTribeFilesAsyncSuccess', tribeFiles : filesData.data});
  } else if(filesData.status && filesData.status !== 200) {
    yield put({type : 'getTribeFilesAsyncError', msg : filesData.msg});
  } else {
    yield put({type : 'getTribeFilesAsyncError', msg : filesData.msg});
  }
}

// 保存群文件
function* saveTribeFileAsync(action) {
	var data = yield call(servers.groupServer.saveTribeFileAsync, action.params);
	if(data.status && data.status === 200) {
		yield put({type : 'saveTribeFileAsyncSuccess', msg : data.msg});
	} else if(data.status && data.status !== 200) {
		yield put({type : 'saveTribeFileAsyncError', msg : data.msg});
	} else {
		yield put({type : 'saveTribeFileAsyncError', msg : data.msg});
	}
}


export function* watchFile() {
  yield takeEvery('getTribeFiles', getTribeFilesAsync);
  yield takeEvery('deleteTribeFiles', deleteTribeFilesAsync);
  yield takeEvery('getTribeFileContent', getTribeFileContentAsync);
  yield takeEvery('saveTribeFile', saveTribeFileAsync);
  yield takeEvery('getTribeFiles', getTribeFilesAsync);
};