import {combineReducers} from 'redux';
import AppReducer from './AppReducer';

const CombinedReducer = combineReducers({
  app: AppReducer
});

export default CombinedReducer;