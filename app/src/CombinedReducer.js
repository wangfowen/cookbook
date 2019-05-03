import {combineReducers} from 'redux';
import AppReducer from 'app/root/duck/reducer';
import RecipesReducer from 'app/recipes/duck/reducer';

const CombinedReducer = combineReducers({
  app: AppReducer,
  recipes: RecipesReducer
});

export default CombinedReducer;