
import { delay } from 'redux-saga';
import { put, takeEvery, call, race } from 'redux-saga/effects';
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

// 在这个接口获取 群组成员 和 群组文件
function* getGroupsCategoryItemAsync(action) {

  var [data, filesData, tribeAdminData] = yield [
    call(servers.mainServer.getUserMenuCatagoryItemAsync, action.params),
    call(servers.groupServer.getTribeFilesAsync, action.params.id),
    call(servers.groupServer.getTirbeAdminInfoAsync, action.params.id)
  ];

  if(data.status && data.status === 200) {
    yield put({type:'getGroupsCategoryItemAsyncSuccess', groupsCategoryItem:data.data.content, id : data.data.id});
  } else if(data.status && data.status !== 200) {
    yield put({type:'getGroupsCategoryItemAsyncError', msg : data.msg});
  } else {
    yield put({type:'getGroupsCategoryItemAsyncError', msg : data.msg});
  }

  if(filesData.status && filesData.status === 200) {
    yield put({type : 'getTribeFilesAsyncSuccess', tribeFiles : filesData.data});
  } else if(filesData.status && filesData.status !== 200) {
    yield put({type : 'getTribeFilesAsyncError', msg : filesData.msg});
  } else {
    yield put({type : 'getTribeFilesAsyncError', msg : filesData.msg});
  }

  if(tribeAdminData.status && tribeAdminData.status === 200) {
    yield put({type : 'getTirbeAdminInfoAsyncSuccess', tribeAdminInfo : tribeAdminData.data});
  } else if(tribeAdminData.status && tribeAdminData.status !== 200) {
    yield put({type : 'getTirbeAdminInfoAsyncError', msg : tribeAdminData.msg});
  } else {
    yield put({type : 'getTirbeAdminInfoAsyncError', msg : tribeAdminData.msg});
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

// 删除二级列表 由于数据源放在 mainState 中， 所以相关的`增删改查``行为放置在这里

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

// 删除日程任务
function* deleteAffairAsync(action) {
  var data = yield call(servers.calendarServer.deleteAffairAsync, action.affairId, action.from_calendar_id);
  if(data.status && data.status === 200) {
    yield put({type : 'deleteAffairAsyncSuccess', calendarsCategoryItem : data.affairList});
  } else if(data.status && data.status !== 200) {
    yield put({type : 'deleteAffairAsyncError', msg : data.msg});
  } else {
    yield put({type : 'deleteAffairAsyncError', msg : data.msg});
  }
}

// 更新日程
function* updateAffairAsync(action) {
  var data = yield call(servers.calendarServer.updateAffairAsync, action.params);
  if(data.status && data.status === 200) {
    yield put({type : 'updateAffairAsyncSuccess', calendarsCategoryItem : data.affairList});
  } else if(data.status && data.status !== 200) {
    yield put({type : 'updateAffairAsyncError', msg : data.msg});
  } else {
    yield put({type : 'updateAffairAsyncError', msg : data.msg});
  }
}

// 新建日程任务
function* addAffairAsync(action) {
  var data = yield call(servers.calendarServer.addAffairAsync, action.params);
  if(data.status && data.status === 200) {
    yield put({type : 'addAffairAsyncSuccess', calendarsCategoryItem : data.affairList});
  } else if(data.status && data.status !== 200) {
    yield put({type : 'addAffairAsyncError', msg : data.msg});
  } else {
    yield put({type : 'addAffairAsyncError', msg : data.msg});
  }
}

// 评价日程任务
function* completeAffairAsync(action) {
  var data = yield call(servers.calendarServer.completeAffairAsync, action.affairId, action.from_calendar_id);
  if(data.status && data.status === 200) {
    yield put({type : 'completeAffairAsyncSuccess', calendarsCategoryItem : data.affairList});
  } else if(data.status && data.status !== 200) {
    yield put({type : 'completeAffairAsyncError', msg : data.msg});
  } else {
    yield put({type : 'completeAffairAsyncError', msg : data.msg});
  }
}

function* cancelCompleteAffairAsync(action) {
  var data = yield call(servers.calendarServer.cancelCompleteAffairAsync, action.affairId, action.from_calendar_id);
  if(data.status && data.status === 200) {
    yield put({type : 'cancelCompleteAffairAsyncSuccess', calendarsCategoryItem : data.affairList});
  } else if(data.status && data.status !== 200) {
    yield put({type : 'cancelCompleteAffairAsyncError', msg : data.msg});
  } else {
    yield put({type : 'cancelCompleteAffairAsyncError', msg : data.msg});
  }
}


// 添加好友
// 这里会拉取用户列表
function* addFriendAsync(action) {
  var data = yield call(servers.categoryServer.addFriendAsync, action.params);
  if(data.status && data.status === 200) {
    yield put({type : 'addFriendAsyncSuccess', msg : data.msg});
  } else if(data.status && data.status !== 200) {
    yield put({type : 'addFriendAsyncError', msg : data.msg});
  } else {
    yield put({type : 'addFriendAsyncError', msg : data.msg});
  }
}

// 确认添加好友
function* confirmAddFriendAsync(action) {
  var data = yield call(servers.categoryServer.confirmAddFriendAsync, action.params);
  if(data.status && data.status === 200) {
    yield put({type : 'confirmAddFriendAsyncSuccess', msg : data.msg});
  } else if(data.status && data.status !== 200) {
    yield put({type : 'confirmAddFriendAsyncError', msg : data.msg});
  } else {
    yield put({type : 'confirmAddFriendAsyncError', msg : data.msg});
  }
}

// 删除好友
// 这里会拉取用户列表
function* deleteFriendAsync(action) {
  var data = yield call(servers.categoryServer.deleteFriendAsync, action.params);
  if(data.status && data.status === 200) {
    yield put({type : 'deleteFriendAsyncSuccess', categorysCategoryItem : data.data.friendList});
    yield put({
      type : 'requireUserForAddFriendListAsyncSuccess', 
      currentUserList : data.data.searchPage.usersList,
      searchTotalPage : data.data.searchPage.totalPage,
      searchCurrentPage : data.data.searchPage.currentPage
    });
  } else if(data.status && data.status !== 200) {
    yield put({type : 'deleteFriendAsyncError', msg : data.msg});
  } else {
    yield put({type : 'deleteFriendAsyncError', msg : data.msg});
  }
}

// 拒绝加好友或加群
function* rejectRequireAsync(action) {
  var data = yield call(servers.categoryServer.rejectRequireAsync, action.toUserId);
  if(data.status && data.status === 200) {
    yield put({type : 'rejectRequireAsyncSuccess', msg : data.msg});
  } else if(data.status && data.status !== 200) {
    yield put({type : 'rejectRequireAsyncError', msg : data.msg});
  } else {
    yield put({type : 'rejectRequireAsyncError', msg : data.msg});
  }
}

// 监听消息 
function* listenerMsgFromServerAsync() {
  var data = yield call(servers.mainServer.listenerMsgFromServerAsync);
  if(data.status && data.status === 200) {
    yield put({type : 'listenerMsgFromServerAsyncSuccess', data : data.data});
  } else if(data.status && data.status !== 205) {
    yield put({type : 'listenerMsgFromServerAsyncError', msg : data.msg});
  } else {
    yield put({type : 'listenerMsgFromServerAsyncError'});
  }
} 


// 小组群模块
// 退群
function* leaveTribeAsync(action) {
  var data = yield call(servers.groupServer.leaveTribeAsync, action.tribeId);
  if(data.status && data.status === 200) {
    yield put({type : 'leaveTribeAsyncSuccess', groupList : data.groupList});
  } else if(data.status && data.status !== 200) {
    yield put({type : 'leaveTribeAsyncError', msg : data.msg});
  } else {
    yield put({type : 'leaveTribeAsyncError', msg : data.msg});
  }
}
// 删除群
function* deleteTribeAsync(action) {
  var data = yield call(servers.groupServer.deleteTribeAsync, action.tribeId);
  if(data.status && data.status === 200) {
    yield put({type : 'deleteTribeAsyncSuccess', groupList : data.groupList});
  } else if(data.status && data.status !== 200) {
    yield put({type : 'deleteTribeAsyncError', msg : data.msg});
  } else {
    yield put({type : 'deleteTribeAsyncError', msg : data.msg});
  }
}
// 邀请加群
function* inviteJoinTribeAsync(action) {
  var data = yield call(servers.groupServer.inviteJoinTribeAsync, action.params);
  if(data.status && data.status === 200) {
    yield put({type : 'inviteJoinTribeAsyncSuccess', msg : data.msg});
  } else if(data.status && data.status !== 200) {
    yield put({type : 'inviteJoinTribeAsyncError', msg : data.msg});
  } else {
    yield put({type : 'inviteJoinTribeAsyncError', msg : data.msg});
  }
}
// 同意加群
function* confirmJoinTribeAsync(action) {
  var data = yield call(servers.groupServer.confirmJoinTribeAsync, action.params);
  if(data.status && data.status === 200) {
    yield put({type : 'confirmJoinTribeAsyncSuccess', msg : data.msg});
  } else if(data.status && data.status !== 200) {
    yield put({type : 'confirmJoinTribeAsyncError', msg : data.msg});
  } else {
    yield put({type : 'confirmJoinTribeAsyncError', msg : data.msg});
  }
}

// 群组踢人
function* expelTribeMemberAsync(action) {
  var data = yield call(servers.groupServer.expelTribeMemberAsync, action.params);
  if(data.status && data.status === 200) {
    yield put({type : 'expelTribeMemberAsyncSuccess', memberList : data.memberList});
  } else if(data.status && data.status !== 200) {
    yield put({type : 'expelTribeMemberAsyncError', msg : data.msg});
  } else {
    yield put({type : 'expelTribeMemberAsyncError', msg : data.msg});
  }
}

// === 分享模块
// 删除分享文件
function* deleteShareFileAsync(action) {
  var data = yield call(servers.shareServer.deleteShareFileAsync, action.fileId, action.shareType);
  if(data.status && data.status === 200) {
    yield put({type : 'deleteShareFileAsyncSuccess', shareFiles : data.shareFiles});
  } else if(data.status && data.status !== 200) {
    yield put({type : 'deleteShareFileAsyncError', msg : data.msg});
  } else {
    yield put({type : 'deleteShareFileAsyncError', msg : data.msg});
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

  yield takeEvery('deleteAffair', deleteAffairAsync);
  yield takeEvery('updateAffair', updateAffairAsync);
  yield takeEvery('addAffair', addAffairAsync);
  yield takeEvery('completeAffair', completeAffairAsync);
  yield takeEvery('cancelCompleteAffair', cancelCompleteAffairAsync);

  yield takeEvery('addFriend', addFriendAsync);
  yield takeEvery('confirmAddFriend', confirmAddFriendAsync);
  yield takeEvery('deleteFriend', deleteFriendAsync);

  yield takeEvery('listenerMsgFromServer', listenerMsgFromServerAsync);
  yield takeEvery('rejectRequire', rejectRequireAsync);

  yield takeEvery('leaveTribe', leaveTribeAsync);
  yield takeEvery('deleteTribe', deleteTribeAsync);
  yield takeEvery('inviteJoinTribe', inviteJoinTribeAsync);
  yield takeEvery('confirmJoinTribe', confirmJoinTribeAsync);
  yield takeEvery('expelTribeMember', expelTribeMemberAsync);

  yield takeEvery('deleteShareFile', deleteShareFileAsync);

};