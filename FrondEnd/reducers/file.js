
const initFileState = {
	tip : 'hello'
};

const fileReducerMap = {
	demo : function(state, action) {
		return state;
	}
};


export default function(state=initFileState, action) {
	try {
		return fileReducerMap[action.type](state, action);
	} catch(e) {
		return state;
	}
}