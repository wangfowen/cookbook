import {combineReducers} from 'redux';
import AppReducer from 'app/root/duck/reducer';
import RecipesReducer from 'app/recipes/duck/reducer';
import InfoReducer from 'app/learn/duck/reducer';

const CombinedReducer = combineReducers({
  app: AppReducer,
  recipes: RecipesReducer,
  info: InfoReducer
});

export default CombinedReducer;
export type ReduxState = ReturnType<typeof CombinedReducer>
