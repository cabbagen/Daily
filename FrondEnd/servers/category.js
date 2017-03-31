import Require from '../utils/require.js'

export const requireUserForAddFriendListAsync = (params) => {
  return Require.ajax('/Home/Category/searchFriends', 'post', params).then(data => data, e => e);
};

export const addFriendAsync = (params) => {
  return Require.ajax('/Home/Category/addFriendAndAddMsg', 'post', params).then(data => data, e => e);
};

export const confirmAddFriendAsync = (params) => {
	return Require.ajax('/Home/Category/agressAddFriend', 'post', params).then(data => data, e => e);
}

export const deleteFriendAsync = (params) => {
  return Require.ajax('/Home/Category/deleteFriendAndQueryUsers', 'post', params).then(data => data, e => e);
};

// 拒绝加好友加群
export const rejectRequireAsync = (to_user_id) => {
  var params = {to_user_id};
  return Require.ajax('/Home/category/rejectAddFriend', 'post', params).then(data => data, e => e);
};