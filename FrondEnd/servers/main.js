
import Require from '../utils/require';

// 异步请求用户菜单子分类列表
export const getUserMenuCatagoryItemAsync = (params) => (
	Require.ajax('/Home/app/getUserCategoryResource', 'post', params).then(data => data, e => e)
);

// 发送邀请邮件
export const sendEmailInvitationAsync = (email) => {
	var params = {
		email
	};
	return Require.ajax('/Home/Email/sendEmailToInviter', 'post', params).then(data => data, e => e);
};

// 修改确认
export const confirmMenuCategoryModifyItemAsync = (confirmObject) => {
	var params = {
		confirmObject
	};
	return Require.ajax('/Home/app/confirmModify', 'post', params).then(data => data, e => e);
};

// 删除处理
export const deleteMenuCategoryItemAsync = (deleteItemObject) => {
	var params = {
		deleteItemObject
	};
	return Require.ajax('/Home/app/deleteItem', 'post', params).then(data => data, e => e);
};

// 添加处理
export const addMenuCategoryItemAsync = (addItemObject) => {
	var params = {
		addItemObject
	};
	return Require.ajax('/Home/app/addItem', 'post', params).then(data => data, e => e);
};

// 监听处理
export const listenerMsgFromServerAsync = () => {
	return Require.ajax('/Home/base/listenMsgLongNotification', 'post', {}).then(data => data, e => e);
}