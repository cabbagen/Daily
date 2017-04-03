
const initGroupState = {
  notifications : '',
  currentTribeFiles : null,
  tribeAdminInfo : null,
};

const groupReducerMap = {
  // 取消通知
  removeNotification : function(state, action) {
    var newState = Object.assign({}, state, {notifications : ''});
    return newState;
  },

  // 加载群文件
  getTribeFilesAsyncSuccess : function(state, action) {
    return Object.assign({}, state, {
      currentTribeFiles : action.tribeFiles
    });
  },
  getTribeFilesAsyncError : function(state, action) {
    return Object.assign({}, state, {
      notifications : action.msg
    });
  },

  // 获取群组管理员信息
  getTirbeAdminInfoAsyncSuccess : function(state, action) {
    return Object.assign({}, state, {
      tribeAdminInfo : action.tribeAdminInfo
    });
  },
  getTirbeAdminInfoAsyncError : function(state, action) {
    return Object.assign({}, state, {
      notifications : action.msg
    });
  },

  // 删除群文件
  deleteTribeFilesAsyncSuccess : function(state, action) {
    return Object.assign({}, state, {
      currentTribeFiles : action.tribeFiles
    });
  },
  deleteTribeFilesAsyncError : function(state, action) {
    return Object.assign({}, state, {
      notifications : action.msg
    });
  },
};

export default function(state=initGroupState, action) {
  try {
    return groupReducerMap[action.type](state, action);
  } catch(e) {
    return state;
  }
}