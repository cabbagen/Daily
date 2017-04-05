
const initShareState = {
  notifications : '',
};

const shareReducerMap = {
	// 取消通知
  removeNotification : function(state, action) {
    var newState = Object.assign({}, state, {notifications : ''});
    return newState;
  },

  
}

export default function(state=initShareState, action) {
  try {
    return shareReducerMap[action.type](state, action);
  } catch(e) {
    return state;
  }
}