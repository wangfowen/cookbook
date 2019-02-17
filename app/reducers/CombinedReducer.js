import {combineReducers} from 'redux';
import AppReducer from './AppReducer';
import RecipesReducer from './RecipesReducer';

const CombinedReducer = combineReducers({
  app: AppReducer,
  recipes: RecipesReducer
});

export default CombinedReducer;