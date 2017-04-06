
const initGroupState = {
  notifications : '',
  currentTribeFiles : null,
  tribeAdminInfo : null,
  tribeFileContent : '',
  tribeFileObject : null,
  isGetInitTribeFileContent : false,
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

  // 请求群文件内容
  getTribeFileContentAsyncSuccess : function(state, action) {
    return Object.assign({}, state, {
      isGetInitTribeFileContent : true,
      tribeFileContent : action.fileContent,
      tribeFileObject : action.fileObject
    });
  },
  getTribeFileContentAsyncError : function(state, action) {
    return Object.assign({}, state, {
      notifications : action.msg
    });
  },

  // 重置初始化文件内容
  resetGetInitTribeFileContent : function(state, action) {
    return Object.assign({}, state, {
      isGetInitTribeFileContent : false
    });
  },

  // 创建群文件
  createTribeFile : function(state, action) {
    return Object.assign({}, state, {
      tribeFileObject : null
    });
  },

  // 保存文件
  saveTribeFileAsyncSuccess : function(state, action) {
    return Object.assign({}, state, {
      notifications : action.msg
    });
  },
  saveTribeFileAsyncError : function(state, action) {
    return Object.assign({}, state, {
      notifications : action.msg
    });
  }
};

export default function(state=initGroupState, action) {
  try {
    return groupReducerMap[action.type](state, action);
  } catch(e) {
    return state;
  }
}