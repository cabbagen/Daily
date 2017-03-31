
const mainInitState = {
  // 用户信息内容
  userInfo : window.userInfo,

  // loading 暂时不用
  isLoading : true,

  // 错误消息通知
  notifications : "",

  // 一级菜单相关分类内容
  userMenuInfo : window.menuCategoryInfos,

  // 单个文件里的文件
  foldersCategoryItem : [],
  calendarsCategoryItem : [],
  categorysCategoryItem : [],
  groupsCategoryItem : [],
  sharesCategoryItem : [],

  // 当前分类的 id ， 这里匹配 `from_**_id` 字段, 这里类似于文件夹 id
  currentCategoryId : '',

  // 消息通知对象
  msgFromServer : null,
};

const mainReducerMap = {

  // 发送邮件部分
  sendEmailInvitationAsyncSuccess : function(state, action) {
    var newState = Object.assign({}, state, {notifications : action.msg});
    return newState;
  },
  sendEmailInvitationAsyncError : function(state, action) {
    var newState = Object.assign({}, state, {notifications : action.msg});
    return newState;
  },

  // 一级分类编辑及确认修改函数, 一级菜单内容这里从 `window.menuCategoryInfos` 获取初始数据
  confirmMenuCategoryModifyItemAsyncSuccess : function(state, action) {
    var tempObj = Object.assign({}, state.userMenuInfo, action.category);
    return Object.assign({}, state, {userMenuInfo : tempObj});
  },
  confirmMenuCategoryModifyItemAsyncError : function(state, action) {
    var newState = Object.assign({}, state, {notifications : action.msg});
    return newState;
  },
  editMenuCategoryItem : function(state, action) {
    var newUserMenuInfo = Object.assign({}, state.userMenuInfo, action.categoryParams);
    return Object.assign({}, state, {userMenuInfo : newUserMenuInfo});
  },
  deleteMenuCategoryItemAsyncSuccess : function(state, action) {
    var tempObj = Object.assign({}, state.userMenuInfo, action.category);
    return Object.assign({}, state, {userMenuInfo : tempObj});
  },
  deleteMenuCategoryItemAsyncError : function(state, action) {
    var newState = Object.assign({}, state, {notifications : action.msg});
    return newState;
  },
  addMenuCategoryItemAsyncSuccess : function(state, action) {
    var tempObj = Object.assign({}, state.userMenuInfo, action.category);
    return Object.assign({}, state, {userMenuInfo : tempObj});
  },
  addMenuCategoryItemAsyncError : function(state, action) {
    var newState = Object.assign({}, state, {notifications : action.msg});
    return newState;
  },

  // 清除提示
  removeNotification : function(state, action) {
    var newState = Object.assign({}, state, {notifications : ''});
    return newState;
  },
  // 添加提示
  addNotification : function(state, action) {
    return Object.assign({}, state, {
      notifications : action.msg
    });
  },

  
  // 二级分类相关操作处理
  // 文件模块操作
  // 获取
  getFoldersCategoryItemAsyncSuccess : function(state, action) {
    return Object.assign({}, state, { 
      foldersCategoryItem : action.foldersCategoryItem, 
      currentCategoryId : action.id
    });
  },
  getFoldersCategoryItemAsyncError : function(state, action) {
    return Object.assign({}, state, { 
      notifications : action.msg
    });
  },

  // 删除 
  deleteFileAsyncSuccess : function(state, action) {
    return Object.assign({}, state, { 
      foldersCategoryItem : action.foldersCategoryItem 
    });
  },
  deleteFileAsyncError : function(state, action) {
    return Object.assign({}, state, {
      notifications : action.msg
    });
  },

  // 新建
  createFileAsyncSuccess : function(state, action) {
    return Object.assign({}, state, {
      foldersCategoryItem : action.foldersCategoryItem
    });
  },
  createFileAsyncError : function(state, action) {
    return Object.assign({}, state, {
      notifications : action.msg
    });
  },

  // 更新
  updateFileAsyncSuccess : function(state, action) {
    return Object.assign({}, state, {
      foldersCategoryItem : action.foldersCategoryItem
    });
  },
  updateFileAsyncError : function(state, action) {
    return Object.assign({}, state, {
      notifications : action.msg
    });
  },

  // 日程操作模块 
  // 获取
  getCalendarsCategoryItemAsyncSuccess : function(state, action) {
    var tempObj = {calendarsCategoryItem : action.calendarsCategoryItem, currentCategoryId : action.id};
    return Object.assign({},state, tempObj);
  },
  getCalendarsCategoryItemAsyncError : function(state, action) {
    var newState = Object.assign({}, state, {notifications : action.msg});
    return newState;
  },
  // 删除
  deleteAffairAsyncSuccess : function(state, action) {
    return Object.assign({}, state, {
      calendarsCategoryItem : action.calendarsCategoryItem
    });
  },
  deleteAffairAsyncError : function(state, action) {
    return Object.assign({}, state, {
      notifications : action.msg
    });
  },
  // 更新
  updateAffairAsyncSuccess : function(state, action) {
    return Object.assign({}, state, {
      calendarsCategoryItem : action.calendarsCategoryItem
    });
  },
  updateAffairAsyncError : function(state, action) {
    return Object.assign({}, state, {
      notifications : action.msg
    });
  },
  // 创建
  addAffairAsyncSuccess : function(state, action) {
    return Object.assign({}, state, {
      calendarsCategoryItem : action.calendarsCategoryItem
    });
  },
  addAffairAsyncError : function(state, action) {
    return Object.assign({}, state, {
      notifications : action.msg
    });
  },
  // 评价
  completeAffairAsyncSuccess : function(state, action) {
    return Object.assign({}, state, {
      calendarsCategoryItem : action.calendarsCategoryItem
    });
  },
  completeAffairAsyncError : function(state, action) {
    return Object.assign({}, state, {
      notifications : action.msg
    });
  },
  cancelCompleteAffairAsyncSuccess : function(state, action) {
    return Object.assign({}, state, {
      calendarsCategoryItem : action.calendarsCategoryItem
    });
  },
  cancelCompleteAffairAsyncError : function(state, action) {
    return Object.assign({}, state, {
      notifications : action.msg
    });
  },


  // 好友模块
  // 获取
  getCategorysCategoryItemAsyncSuccess : function(state, action) {
    var tempObj = {categorysCategoryItem : action.categorysCategoryItem, currentCategoryId : action.id};
    return Object.assign({}, state, tempObj);
  },
  getCategorysCategoryItemAsyncError : function(state, action) {
    var newState = Object.assign({}, state, {notifications : action.msg});
    return newState;
  },
  // 添加好友
  addFriendAsyncSuccess : function(state, action) {
    return Object.assign({}, state, {
      notifications : action.msg
    });
  },
  addFriendAsyncError : function(state, action) {
    return Object.assign({}, state, {
      notifications : action.msg
    });
  },
  confirmAddFriendAsyncSuccess : function(state, action) {
    return Object.assign({}, state, {
      notifications : action.msg,
      msgFromServer : null
    });
  },
  confirmAddFriendAsyncError : function(state, action) {
    return Object.assign({}, state, {
      notifications : action.msg,
      msgFromServer : null
    });
  },
  // 删除好友
  deleteFriendAsyncSuccess : function(state, action) {
    return Object.assign({}, state, {
      categorysCategoryItem : action.categorysCategoryItem
    });
  },
  deleteFriendAsyncError : function(state, action) {
    return Object.assign({}, state, {
      notifications : action.msg
    });
  },


  // 监听处理
  listenerMsgFromServerAsyncSuccess : function(state, action) {
    console.log(action.data);
    return Object.assign({}, state, {
      msgFromServer : action.data
    });
  },
  listenerMsgFromServerAsyncError : function(state, action) {
    return state;
  },
  rejectRequireAsyncSuccess : function(state, action) {
    return Object.assign({}, state, {
      notifications : action.msg,
      msgFromServer : null
    });
  },
  rejectRequireAsyncError : function(state, action) {
    return Object.assign({}, state, {
      notifications : action.msg,
      msgFromServer : null
    });
  },

  // 小组群模块
  // 获取
  getGroupsCategoryItemAsyncSuccess : function(state, action) {
    var tempObj = {groupsCategoryItem : action.groupsCategoryItem, currentCategoryId : action.id};
    return Object.assign({}, state, tempObj);
  },
  getGroupsCategoryItemAsyncError : function(state, action) {
    var newState = Object.assign({}, state, {notifications : action.msg});
    return newState;
  },

  // 主动退群
  leaveTribeAsyncSuccess : function(state, action) {
    var tempObj = Object.assign({}, state.userMenuInfo, {Groups : action.groupList});
    return Object.assign({}, state, {userMenuInfo : tempObj});
  },
  leaveTribeAsyncError : function(state, action) {
    return Object.assign({}, state, {
      notifications : action.msg
    });
  },

  // 删除群
  deleteTribeAsyncSuccess : function(state, action) {
    var tempObj = Object.assign({}, state.userMenuInfo, {Groups : action.groupList});
    return Object.assign({}, state, {userMenuInfo : tempObj});
  },
  deleteTribeAsyncError : function(state, action) {
    return Object.assign({}, state, {
      notifications : action.msg
    });
  },



  
  getSharesCategoryItemAsyncSuccess : function(state, action) {
    var tempObj = {sharesCategoryItem : action.sharesCategoryItem, currentCategoryId : action.id};
    return Object.assign({}, state, tempObj);
  },
  getSharesCategoryItemAsyncError : function(state, action) {
    var newState = Object.assign({}, state, {notifications : action.msg});
    return newState;
  },

  

};

export default function(state = mainInitState, action) {
  try {
    return mainReducerMap[action.type](state, action);
  } catch(e) {
    return state;
  }
};