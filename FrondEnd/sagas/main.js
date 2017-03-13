
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
		yield put({type:'getFoldersCategoryItemAsyncSuccess', foldersCategoryItem:data.data})
	} else if(data.status && data.status !== 200) {
		yield put({type:'getFoldersCategoryItemAsyncError', msg : data.msg});
	} else {
		yield put({type:'getFoldersCategoryItemAsyncError', msg : data.msg});
	}
}

function* getCalendarsCategoryItemAsync(action) {
	var data = yield call(servers.mainServer.getUserMenuCatagoryItemAsync, action.params);
	if(data.status && data.status === 200) {
		yield put({type:'getCalendarsCategoryItemAsyncSuccess', calendarsCategoryItem:data.data});
	} else if(data.status && data.status !== 200) {
		yield put({type:'getCalendarsCategoryItemAsyncError', msg : data.msg});
	} else {
		yield put({type:'getCalendarsCategoryItemAsyncError', msg : data.msg});
	}
}

function* getCategorysCategoryItemAsync(action) {
	var data = yield call(servers.mainServer.getUserMenuCatagoryItemAsync, action.params);
	if(data.status && data.status === 200) {
		yield put({type:'getCategorysCategoryItemAsyncSuccess', categorysCategoryItem:data.data});
	} else if(data.status && data.status !== 200) {
		yield put({type:'getCategorysCategoryItemAsyncError', msg : data.msg});
	} else {
		yield put({type:'getCategorysCategoryItemAsyncError', msg : data.msg});
	}
}

function* getGroupsCategoryItemAsync(action) {
	var data = yield call(servers.mainServer.getUserMenuCatagoryItemAsync, action.params);
	if(data.status && data.status === 200) {
		yield put({type:'getGroupsCategoryItemAsyncSuccess', groupsCategoryItem:data.data});
	} else if(data.status && data.status !== 200) {
		yield put({type:'getGroupsCategoryItemAsyncError', msg : data.msg});
	} else {
		yield put({type:'getGroupsCategoryItemAsyncError', msg : data.msg});
	}
}

function* getSharesCategoryItemAsync(action) {
	var data = yield call(servers.mainServer.getUserMenuCatagoryItemAsync, action.params);
	if(data.status && data.status === 200) {
		yield put({type:'getSharesCategoryItemAsyncSuccess', sharesCategoryItem:data.data});
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

export function* watchGetUserMenuInfo() {
	yield takeEvery('sendEmailInvitation', sendEmailInvitationAsync);

	yield takeEvery('getFoldersCategoryItem', getFoldersCategoryItemAsync);
	yield takeEvery('getCalendarsCategoryItem', getCalendarsCategoryItemAsync);
	yield takeEvery('getCategorysCategoryItem', getCategorysCategoryItemAsync);
	yield takeEvery('getGroupsCategoryItem', getGroupsCategoryItemAsync);
	yield takeEvery('getSharesCategoryItem', getSharesCategoryItemAsync);

	yield takeEvery('confirmMenuCategoryModifyItem', confirmMenuCategoryModifyItemAsync);
	yield takeEvery('deleteMenuCategoryItem', deleteMenuCategoryItemAsync);
	yield takeEvery('addMenuCategoryItem', addMenuCategoryItemAsync);
};