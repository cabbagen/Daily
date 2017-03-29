
const initFileState = {
  currentFileObject : null,
  currentFileContent : '',
  notifications : ''
};

const fileReducerMap = {

  // 请求文件内容
  requireFileContentAsyncSuccess : function(state, action) {
    return Object.assign({}, state, {
      currentFileObject : action.fileObject, 
      currentFileContent : action.fileContent
    });
  },
  requireFileContentAsyncError : function(state, action) {
    return Object.assign({}, state, {
      notifications : action.msg
    });
  },

  // 重置状态
  resetState : function(state, action) {
    return Object.assign({}, state, {
      currentFileObject : null,
      currentFileContent : ''
    });
  },

  // 上传文件
  uploadFileAsyncSuccess : function(state, action) {
    return Object.assign({}, state, {
      notifications : action.msg
    });
  },
  uploadFileAsyncError : function(state, action) {
    return Object.assign({}, state, {
      notifications : action.msg
    });
  },

  downloadFile : function(state, action) {
    return Object.assign({}, state, {
      notifications : '下载成功'
    });
  },

  // 取消通知
  removeNotification : function(state, action) {
    var newState = Object.assign({}, state, {notifications : ''});
    return newState;
  }
};


export default function(state=initFileState, action) {
  try {
    return fileReducerMap[action.type](state, action);
  } catch(e) {
    return state;
  }
}