import { combineReducers } from 'redux';
import main from './main';
import file from './file';


const rootReducer = combineReducers({
	main,
	file
});

export default rootReducer;
