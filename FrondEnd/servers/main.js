
import Require from '../utils/require';

// 异步请求用户左侧菜单信息
export const getUserMenuInfoAsync = () => (
	Require.ajax('/Home/app/getUserMenuInfos', 'post').then(data => data, e => e)
);

// 异步请求用户菜单子分类列表
export const getUserMenuCatagoryItemAsync = (params) => (
	Require.ajax('/Home/app/getUserCategoryResource', 'post', params).then(data => data, e => e)
);

