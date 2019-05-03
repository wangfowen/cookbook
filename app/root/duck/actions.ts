import {SettingsModel} from 'app/models/Settings';
import {RecipesModel} from 'app/models/Recipe';
import {loadRecipes} from 'app/recipes/duck/actions';
import {LOAD_SETTINGS} from './constants'

export const initApp = () => {
  return async (dispatch) => {
    try {
      const recipes = await RecipesModel.loadRecipes();
      dispatch(loadRecipes(recipes));
      const settings = await SettingsModel.getOrCreate();
      dispatch(loadSettings(settings));
    } catch(e) {
      console.log(e);
    }
  }
}

export const loadSettings = (settings) => {
  return {
    type: LOAD_SETTINGS,
    settings
  }
}
