
const initFileState = {
  currentFileObject : null,
  currentFileContent : '',
  notifications : '',
  resetEditState : false
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
      currentFileContent : '',
      resetEditState : true
    });
  },

  // 取消重置状态
  cancelResetEditState : function(state, action) {
    return Object.assign({}, state, {
      resetEditState : false
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
  },

  // 文件标题修改
  fileNameChange : function(state, action) {
    var newFileObject = Object.assign({}, state, {
      file_name : action.fileName
    });
    return Object.assign({}, state, {
      currentFileObject : newFileObject
    });
  },

  // 文件内容修改
  fileContentChange : function(state, action) {
    return Object.assign({}, state, {
      currentFileContent : action.fileContent
    });
  }
};


export default function(state=initFileState, action) {
  try {
    return fileReducerMap[action.type](state, action);
  } catch(e) {
    return state;
  }
}