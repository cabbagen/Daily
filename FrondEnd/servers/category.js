import Require from '../utils/require.js'

export const requireUserForAddFriendListAsync = (params) => {
	return Require.ajax('/Home/Category/searchFriends', 'post', params).then(data => data, e => e);
};