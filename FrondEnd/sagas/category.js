import { delay } from 'redux-saga';
import { put, takeEvery, call } from 'redux-saga/effects';
import servers from '../servers';

function* requireUserForAddFriendListAsync(action) {
	var data = yield call(servers.categoryServer.requireUserForAddFriendListAsync, action.params);
	if(data.status && data.status === 200) {
		yield put({
			type : 'requireUserForAddFriendListAsyncSuccess', 
			currentUserList : data.data.usersList, 
			searchTotalPage : data.data.totalPage,
			searchCurrentPage : data.data.currentPage
		});
	} else if(data.status && data.status !== 200) {
		yield put({type : 'requireUserForAddFriendListAsyncError', msg : data.msg});
	} else {
		yield put({type : 'requireUserForAddFriendListAsyncError', msg : data.msg});
	}
}

export function* watchFile() {
	yield takeEvery('requireUserForAddFriendList', requireUserForAddFriendListAsync);
};