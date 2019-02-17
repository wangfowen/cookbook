import Settings from '../db/models/Settings';
import Recipe from '../db/models/Recipe';
import {loadRecipes} from './RecipeActions';

export const INIT_APP = "INIT_APP";
export const initApp = () => {
  return async (dispatch) => {
    try {
      const recipes = await Recipe.loadRecipes();
      dispatch(loadRecipes(recipes));
      const settings = await Settings.getOrCreateSetting();
      dispatch(loadSettings(settings));
    } catch(e) {
      console.log(e);
    }
  }
};

export const LOAD_SETTINGS = "LOAD_SETTINGS";
export const loadSettings = (settings) => {
  return {
    type: LOAD_SETTINGS,
    settings
  }
};