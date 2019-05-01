import {combineReducers} from 'redux';
import AppReducer from 'root/duck/reducer';
import RecipesReducer from 'recipes/data/reducer';

const CombinedReducer = combineReducers({
  app: AppReducer,
  recipes: RecipesReducer
});

export default CombinedReducer;