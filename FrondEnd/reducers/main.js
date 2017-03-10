
const mainInitState = {
	userInfo : window.userInfo,
	isLoading : true,
	notifications : "",
	userMenuInfo : {}
};

const mainReducerMap = {
	sendEmailInvitation : function(state, action) {
		console.info(`发送邮件 action: ${JSON.stringify(action)}`);
		return state;
	},
	getUserMenuInfo : function(state, action) {
		console.info(`获取用户左侧菜单信息`);
		return state;
	},
	getUserMenuInfoAsyncSuccess : function(state, action) {
		console.info(`加载用户菜单信息成功 action: ${JSON.stringify(action)}`);
		action.userMenuInfo['Shares'] = [
			{id : 1, share_name : "来自我的分享"},
			{id : 2, share_name : "我收到的分享"}
		];
		return Object.assign({}, state, {isLoading:false, userMenuInfo:action.userMenuInfo});
	},
	getUserMenuInfoAsyncError : function(state, action) {
		console.info(`加载用户菜单信息失败 action: ${JSON.stringify(action)}`);
		return state;
	}
};

export default function(state = mainInitState, action) {
	try {
		return mainReducerMap[action.type](state, action);
	} catch(e) {
		return state;
	}
};