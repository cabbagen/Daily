
import { delay } from 'redux-saga';
import { put, takeEvery, call } from 'redux-saga/effects';
import servers from '../servers';

// 发送邀请邮件
function* sendEmailInvitationAsync(action) {
	var data = yield call(servers.mainServer.sendEmailInvitationAsync, action.email);
	if(data.status && data.status === 200) {
		yield put({type : 'sendEmailInvitationAsyncSuccess', msg : '邮件已成功发送'});
	} else if(data.status && data.status !== 200) {
		yield put({type : 'sendEmailInvitationAsyncError', msg : '服务繁忙，邮件发送失败，请稍后尝试吧。'});
	} else {
		yield put({type : 'sendEmailInvitationAsyncError', msg : '服务繁忙，邮件发送失败，请稍后尝试吧。'});
	}
}

// 获取二级文件列表部分
function* getFoldersCategoryItemAsync(action) {
	var data = yield call(servers.mainServer.getUserMenuCatagoryItemAsync, action.params);
	if(data.status && data.status === 200) {
		yield put({type:'getFoldersCategoryItemAsyncSuccess', foldersCategoryItem:data.data.content, id : data.data.id})
	} else if(data.status && data.status !== 200) {
		yield put({type:'getFoldersCategoryItemAsyncError', msg : data.msg});
	} else {
		yield put({type:'getFoldersCategoryItemAsyncError', msg : data.msg});
	}
}

function* getCalendarsCategoryItemAsync(action) {
	var data = yield call(servers.mainServer.getUserMenuCatagoryItemAsync, action.params);
	if(data.status && data.status === 200) {
		yield put({type:'getCalendarsCategoryItemAsyncSuccess', calendarsCategoryItem:data.data.content, id : data.data.id});
	} else if(data.status && data.status !== 200) {
		yield put({type:'getCalendarsCategoryItemAsyncError', msg : data.msg});
	} else {
		yield put({type:'getCalendarsCategoryItemAsyncError', msg : data.msg});
	}
}

function* getCategorysCategoryItemAsync(action) {
	var data = yield call(servers.mainServer.getUserMenuCatagoryItemAsync, action.params);
	if(data.status && data.status === 200) {
		yield put({type:'getCategorysCategoryItemAsyncSuccess', categorysCategoryItem:data.data.content, id : data.data.id});
	} else if(data.status && data.status !== 200) {
		yield put({type:'getCategorysCategoryItemAsyncError', msg : data.msg});
	} else {
		yield put({type:'getCategorysCategoryItemAsyncError', msg : data.msg});
	}
}

function* getGroupsCategoryItemAsync(action) {
	var data = yield call(servers.mainServer.getUserMenuCatagoryItemAsync, action.params);
	if(data.status && data.status === 200) {
		yield put({type:'getGroupsCategoryItemAsyncSuccess', groupsCategoryItem:data.data.content, id : data.data.id});
	} else if(data.status && data.status !== 200) {
		yield put({type:'getGroupsCategoryItemAsyncError', msg : data.msg});
	} else {
		yield put({type:'getGroupsCategoryItemAsyncError', msg : data.msg});
	}
}

function* getSharesCategoryItemAsync(action) {
	var data = yield call(servers.mainServer.getUserMenuCatagoryItemAsync, action.params);
	if(data.status && data.status === 200) {
		yield put({type:'getSharesCategoryItemAsyncSuccess', sharesCategoryItem:data.data.content, id : data.data.id});
	} else if(data.status && data.status !== 200) {
		yield put({type:'getSharesCategoryItemAsyncError', msg : data.msg});
	} else {
		yield put({type:'getSharesCategoryItemAsyncError', msg : data.msg});
	}
}

// 添加分类部分 ......  全部保存不做处理，处理单项操作

// 确认修改
function* confirmMenuCategoryModifyItemAsync(action) {
	var data = yield call(servers.mainServer.confirmMenuCategoryModifyItemAsync, action.newItemObject);
	if(data.status && data.status === 200) {
		yield put({type:'confirmMenuCategoryModifyItemAsyncSuccess', category : data.data});
	} else if(data.status && data.status !== 200) {
		yield put({type : 'confirmMenuCategoryModifyItemAsyncError', msg : data.msg});
	} else {
		yield put({type : 'confirmMenuCategoryModifyItemAsyncError', msg : data.msg});
	}
}

// 删除
function* deleteMenuCategoryItemAsync(action) {
	var data = yield call(servers.mainServer.deleteMenuCategoryItemAsync, action.deleteItemObj);
	if(data.status && data.status === 200) {
		yield put({type : 'deleteMenuCategoryItemAsyncSuccess', category : data.data});
	} else if(data.status && data.status !== 200) {
		yield put({type : 'deleteMenuCategoryItemAsyncError', msg : data.msg});
	} else {
		yield put({type : 'deleteMenuCategoryItemAsyncError', msg : data.msg});
	}
}

// 添加
function* addMenuCategoryItemAsync(action) {
	var data = yield call(servers.mainServer.addMenuCategoryItemAsync, action.addItemObject);
	if(data.status && data.status === 200) {
		yield put({type : 'addMenuCategoryItemAsyncSuccess', category : data.data});
	} else if(data.status && data.status !== 200) {
		yield put({type : 'addMenuCategoryItemAsyncError', msg : data.msg});
	} else {
		yield put({type : 'addMenuCategoryItemAsyncSuccess', msg : data.msg});
	}
}

// 删除二级列表 由于数据源放在 mainState 中， 所以相关的`增删`行为放置在这里`改查`行为放在对应的页面里

// 删除文件
function* deleteFileAsync(action) {
	var data = yield call(servers.fileServer.deleteFileAsync, action.fileId, action.from_folder_id);
	if(data.status && data.status === 200) {
		yield put({type : 'deleteFileAsyncSuccess', foldersCategoryItem : data.fileList});
	} else if(data.status && data.status !== 200) {
		yield put({type : 'deleteFileAsyncError', msg : data.msg});
	} else {
		yield put({type : 'deleteFileAsyncError', msg : data.msg});
	}
}

// 新建文件
function* createFileAsync(action) {
	var data = yield call(servers.fileServer.createFileAsync, action.params);
	if(data.status && data.status === 200) {
		yield put({type : 'createFileAsyncSuccess', foldersCategoryItem : data.fileList});
	} else if(data.status && data.status !== 200) {
		put({type : 'createFileAsyncError', msg : data.msg});
	} else {
		put({type : 'createFileAsyncError', msg : data.msg});
	}
}

// 更新文件
function* updateFileAsync(action) {
	var data = yield call(servers.fileServer.updateFileAsync, action.params);
	if(data.status && data.status === 200) {
		yield put({type : 'updateFileAsyncSuccess', foldersCategoryItem : data.fileList});
	} else if(data.status && data.status !== 200) {
		yield put({type : 'updateFileAsyncError', msg : data.msg});
	} else {
		yield put({type : 'updateFileAsyncAsyncError', msg : data.msg});
	}
}

// 保存文件
function* saveFileAsync(action) {
	var data = yield call(servers.fileServer.saveFileAsync, action.params);
	if(data.status && data.status === 200) {
		yield put({type : 'saveFileAsyncSuccess', foldersCategoryItem : data.fileList});
	} else if(data.status && data.status !== 200) {
		yield put({type : 'saveFileAsyncError', msg : data.msg});
	} else {
		yield put({type : 'saveFileAsyncError', msg : data.msg});
	}
}



export function* watchMain() {
	// 发送邀请邮件
	yield takeEvery('sendEmailInvitation', sendEmailInvitationAsync);

	// 获取二级菜单
	yield takeEvery('getFoldersCategoryItem', getFoldersCategoryItemAsync);
	yield takeEvery('getCalendarsCategoryItem', getCalendarsCategoryItemAsync);
	yield takeEvery('getCategorysCategoryItem', getCategorysCategoryItemAsync);
	yield takeEvery('getGroupsCategoryItem', getGroupsCategoryItemAsync);
	yield takeEvery('getSharesCategoryItem', getSharesCategoryItemAsync);

	// 一级菜单编辑选项
	yield takeEvery('confirmMenuCategoryModifyItem', confirmMenuCategoryModifyItemAsync);
	yield takeEvery('deleteMenuCategoryItem', deleteMenuCategoryItemAsync);
	yield takeEvery('addMenuCategoryItem', addMenuCategoryItemAsync);

	// 二级列表操作
	yield takeEvery('deleteFile', deleteFileAsync);
	yield takeEvery('createFile', createFileAsync);
	yield takeEvery('updateFile', updateFileAsync);
};