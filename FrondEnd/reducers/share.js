
const initShareState = {
  currentFileObject : null,
  currentFileContent : '',
  notifications : '',
  resetEditState : false
};

const shareReducerMap = {
	// 取消通知
  removeNotification : function(state, action) {
    var newState = Object.assign({}, state, {notifications : ''});
    return newState;
  },

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
  }
  
  
}

export default function(state=initShareState, action) {
  try {
    return shareReducerMap[action.type](state, action);
  } catch(e) {
    return state;
  }
}