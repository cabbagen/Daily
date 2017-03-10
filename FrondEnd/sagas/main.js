
import { delay } from 'redux-saga';
import { put, takeEvery, call } from 'redux-saga/effects';
import servers from '../servers';


// 抛出该方法，在请求页面的时候获取用户数据
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


function* getFoldersCategoryItemAsync(action) {
	var data = yield call(servers.mainServer.getUserMenuCatagoryItemAsync, action.params);
	if(data.status && data.status === 200) {
		yield put({type:'getFoldersCategoryItemAsyncSuccess', foldersCategoryItem:data.data})
	} else if(data.status && data.status !== 200) {
		yield put({type:'getFoldersCategoryItemAsyncError'});
	} else {
		yield put({type:'getFoldersCategoryItemAsyncError'});
	}
}

function* getCalendarsCategoryItemAsync(action) {
	var data = yield call(servers.mainServer.getUserMenuCatagoryItemAsync, action.params);
	if(data.status && data.status === 200) {
		yield put({type:'getCalendarsCategoryItemAsyncSuccess', calendarsCategoryItem:data.data});
	} else if(data.status && data.status !== 200) {
		yield put({type:'getCalendarsCategoryItemAsyncError'});
	} else {
		yield put({type:'getCalendarsCategoryItemAsyncError'});
	}
}

function* getCategorysCategoryItemAsync(action) {
	var data = yield call(servers.mainServer.getUserMenuCatagoryItemAsync, action.params);
	if(data.status && data.status === 200) {
		yield put({type:'getCategorysCategoryItemAsyncSuccess', categorysCategoryItem:data.data});
	} else if(data.status && data.status !== 200) {
		yield put({type:'getCategorysCategoryItemAsyncError'});
	} else {
		yield put({type:'getCategorysCategoryItemAsyncError'});
	}
}

function* getGroupsCategoryItemAsync(action) {
	var data = yield call(servers.mainServer.getUserMenuCatagoryItemAsync, action.params);
	if(data.status && data.status === 200) {
		yield put({type:'getGroupsCategoryItemAsyncSuccess', groupsCategoryItem:data.data});
	} else if(data.status && data.status !== 200) {
		yield put({type:'getGroupsCategoryItemAsyncError'});
	} else {
		yield put({type:'getGroupsCategoryItemAsyncError'});
	}
}

function* getSharesCategoryItemAsync(action) {
	var data = yield call(servers.mainServer.getUserMenuCatagoryItemAsync, action.params);
	if(data.status && data.status === 200) {
		yield put({type:'getSharesCategoryItemAsyncSuccess', sharesCategoryItem:data.data});
	} else if(data.status && data.status !== 200) {
		yield put({type:'getSharesCategoryItemAsyncError'});
	} else {
		yield put({type:'getSharesCategoryItemAsyncError'});
	}
}

// 缺失添加分类部分 ......



export function* watchGetUserMenuInfo() {
	yield takeEvery('getUserMenuInfo', getUserMenuInfoAsync);
	yield takeEvery('getFoldersCategoryItem', getFoldersCategoryItemAsync);
	yield takeEvery('getCalendarsCategoryItem', getCalendarsCategoryItemAsync);
	yield takeEvery('getCategorysCategoryItem', getCategorysCategoryItemAsync);
	yield takeEvery('getGroupsCategoryItem', getGroupsCategoryItemAsync);
	yield takeEvery('getSharesCategoryItem', getSharesCategoryItemAsync);
};