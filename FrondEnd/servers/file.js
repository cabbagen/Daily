
import Require from '../utils/require';

export const requireFileContentAsync = (filePath, fileId) => {
  var params = {filePath, fileId};
  return Require.ajax('/Home/Files/requireFileContent', 'post', params).then(data => data, e => e);
};

export const deleteFileAsync = (fileId, from_folder_id) => {
  var params = {fileId, from_folder_id};
  return Require.ajax('/Home/Files/deleteFile', 'post', params).then(data => data, e => e);
};

export const updateFileAsync = (fileInfos) => {
  return Require.ajax('/Home/Files/saveFile', 'post', fileInfos).then(data => data, e => e);
};

export const createFileAsync = (params) => {
  return Require.ajax('/Home/Files/createFile', 'post', params).then(data => data, e => e);
};

export const uploadFileAsync = (params) => {
  return Require.formAjax('/Home/Files/uploadFile', 'post', params).then(data => data, e => e);
};

export const shareFileAsync = (params) => {
	return Require.ajax('/Home/Files/shareFile', 'post', params).then(data => data, e => e);
}