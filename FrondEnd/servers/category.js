import Require from '../utils/require.js'

export const requireUserForAddFriendListAsync = (params) => {
	return Require.ajax('/Home/Category/searchFriends', 'post', params).then(data => data, e => e);
};

export const addFriendAsync = (params) => {
	return Require.ajax('/Home/Category/addFriendAndAddMsg', 'post', params).then(data => data, e => e);
};

export const deleteFriendAsync = (params) => {
	return Require.ajax('/Home/Category/deleteFriendAndQueryUsers', 'post', params).then(data => data, e => e);
};