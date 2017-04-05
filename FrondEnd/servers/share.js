
import Require from '../utils/require';

// 删除分享文件
export const deleteShareFileAsync = (fileId, type) => {
	var params = {fileId, type};
	return Require.ajax('/Home/Shares/deleteShareFile', 'post', params).then(data => data, e => e);
}