import { combineReducers } from 'redux';
import main from './main';
import file from './file';
import calendar from './calendar';


const rootReducer = combineReducers({
	main,
	file,
	calendar
});

export default rootReducer;
