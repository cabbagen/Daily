import { combineReducers } from 'redux';
import main from './main';
import file from './file';
import calendar from './calendar';
import category from './category';


const rootReducer = combineReducers({
	main,
	file,
	calendar,
	category,
});

export default rootReducer;
