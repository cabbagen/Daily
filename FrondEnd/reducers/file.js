
const initFileState = {
	currentFileObject : null,
	currentFileContent : '',
	notifications : ''
};

const fileReducerMap = {
	// 示例
	demo : function(state, action) {
		return state;
	},
	requireFileContentAsyncSuccess : function(state, action) {
		return Object.assign({}, state, {
			currentFileObject : action.fileObject, 
			currentFileContent : action.fileContent
		});
	},
	requireFileContentAsyncError : function(state, action) {
		return Object.assign({}, state, {
			notifications : data.msg
		});
	},
	// saveFileAsyncSuccess : function(state, action) {
	// 	var currentFileContent = action.fileContent;
	// 	return Object.assign({}, state, {currentFileContent : currentFileContent});
	// },
	// saveFileAsyncError : function(state, action) {
	// 	console.log(action);
	// 	return state;
	// },
	// changeFileName : function(state, action) {
	// 	var copyCurrentFileObject = Object.assign(state.currentFileObject, {
	// 		file_name : action.file_name
	// 	});
	// 	console.log(action.file_name);
	// 	return Object.assign(state, { 
	// 		currentFileObject : copyCurrentFileObject
	// 	});
	// },
	resetState : function(state, action) {
		return Object.assign({}, state, {
			currentFileObject : null,
			currentFileContent : ''
		});
	}
};


export default function(state=initFileState, action) {
	try {
		return fileReducerMap[action.type](state, action);
	} catch(e) {
		return state;
	}
}