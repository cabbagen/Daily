import { combineReducers } from 'redux';
import main from './main';
import file from './file';
import calendar from './calendar';
import category from './category';
import group from './group';


const rootReducer = combineReducers({
  main,
  file,
  calendar,
  category,
  group,
});

export default rootReducer;
