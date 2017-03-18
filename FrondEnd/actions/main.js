
// 发送邀请邮件
export const sendEmailInvitation = (emailAddress) => ({
	type : 'sendEmailInvitation',
	email : emailAddress
});

// 查询二级分类列表
// params formData =>  {resourceCategory : 'folders', id : 2}
export const getFoldersCategoryItem = (params) => ({
	type : 'getFoldersCategoryItem',
	params : params
});

export const getCalendarsCategoryItem = (params) => ({
	type : 'getCalendarsCategoryItem',
	params : params
});

export const getCategorysCategoryItem = (params) => ({
	type : 'getCategorysCategoryItem',
	params : params
});

export const getGroupsCategoryItem = (params) => ({
	type : 'getGroupsCategoryItem',
	params : params
});

export const getSharesCategoryItem = (params) => ({
	type : 'getSharesCategoryItem',
	params : params
});


// 一级分类编辑及确认修改函数
export const confirmMenuCategoryModifyItem = (newItemObject) => ({
	type : 'confirmMenuCategoryModifyItem',
	newItemObject : newItemObject
});

export const editMenuCategoryItem = (categoryObj) => ({
	type : 'editMenuCategoryItem',
	categoryParams : categoryObj
});

export const deleteMenuCategoryItem = (deleteItemObj) => ({
	type : 'deleteMenuCategoryItem',
	deleteItemObj : deleteItemObj
});

export const addMenuCategoryItem = (addItemObject) => ({
	type : 'addMenuCategoryItem',
	addItemObject : addItemObject
});


// 清除提示
export const removeNotification = () => ({
	type : 'removeNotification'
});


// 二级菜单操作

// 删除文件
export const deleteFile = (fileId, from_folder_id) => ({
	type : 'deleteFile',
	fileId : fileId,
	from_folder_id : from_folder_id
});

// 新建文件
export const createFile = (params) => ({
	type : 'createFile',
	params : params
});

// 更新文件
export const updateFile = (params) => ({
	type : 'updateFile',
	params : params
});


