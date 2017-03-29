
const initGroupState = {
  notifications : ''
};

const groupReducerMap = {
  // 取消通知
  removeNotification : function(state, action) {
    var newState = Object.assign({}, state, {notifications : ''});
    return newState;
  }
};

export default function(state=initGroupState, action) {
  try {
    return groupReducerMap[action.type](state, action);
  } catch(e) {
    return state;
  }
}