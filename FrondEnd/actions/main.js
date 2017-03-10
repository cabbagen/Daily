
export const sendEmailInvitation = (emailAddress) => ({
	type : 'sendEmailInvitation',
	email : emailAddress
});

export const getUserMenuInfo = () => ({
	type : 'getUserMenuInfo'
});


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