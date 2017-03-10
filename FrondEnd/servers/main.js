
import Require from '../utils/require';

// 异步请求用户左侧菜单信息
export const getUserMenuInfoAsync = () => (
	Require.ajax('/Home/app/getUserMenuInfos', 'post').then(data => data, e => e)
);

