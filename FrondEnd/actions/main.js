
// 发送邀请邮件
export const sendEmailInvitation = (emailAddress) => ({
  type : 'sendEmailInvitation',
  email : emailAddress
});

// 查询二级分类列表

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

// 添加错误提示
export const addNotification = (msg) => ({
  type : 'addNotification',
  msg : msg
});


// 二级菜单操作
// 文件模块

// 查询文件  params formData =>  {resourceCategory : 'folders', id : 2}
export const getFoldersCategoryItem = (params) => ({
  type : 'getFoldersCategoryItem',
  params : params
});

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

// 日程模块

// 查询
export const getCalendarsCategoryItem = (params) => ({
  type : 'getCalendarsCategoryItem',
  params : params
});

// 删除
export const deleteAffair = (affairId, from_calendar_id) => ({
  type : 'deleteAffair',
  affairId : affairId,
  from_calendar_id : from_calendar_id
});

// 更新
export const updateAffair = (params) => ({
  type : 'updateAffair',
  params : params
});

// 新建
export const addAffair = (params) => ({
  type : 'addAffair',
  params : params
});

// 评价
export const completeAffair = (affairId, from_calendar_id) => ({
  type : 'completeAffair',
  affairId : affairId,
  from_calendar_id : from_calendar_id
});
export const cancelCompleteAffair = (affairId, from_calendar_id) => ({
  type : 'cancelCompleteAffair',
  affairId : affairId,
  from_calendar_id : from_calendar_id
});


// 好友模块

// 添加好友
export const addFriend = (params) => ({
  type : 'addFriend',
  params : params
});
// 确认添加好友
export const confirmAddFriend = (params) => ({
  type : 'confirmAddFriend',
  params : params
});

// 删除好友
export const deleteFriend = (params) => ({
  type : 'deleteFriend',
  params : params
});


// 监听消息
export const listenerMsgFromServer = () => ({
  type : 'listenerMsgFromServer'
});
// 拒绝加好友或加群
export const rejectRequire = (toUserId) => ({
  type : 'rejectRequire',
  toUserId : toUserId
});

// 小组群模块
// 退群
export const leaveTribe = (tribeId) => ({
  type : 'leaveTribe',
  tribeId : tribeId
});

// 解散群
export const deleteTribe = (tribeId) => ({
  type : 'deleteTribe',
  tribeId : tribeId
});

// 邀请加群
export const inviteJoinTribe = (params) => ({
  type : 'inviteJoinTribe',
  params : params
});

// 同意加群
export const confirmJoinTribe = (params) => ({
  type : 'confirmJoinTribe',
  params : params
});

// 群组踢人
export const expelTribeMember = (params) => ({
  type : 'expelTribeMember',
  params : params
});