import {SettingsModel} from 'app/db/Settings';
import {RecipesModel} from 'app/db/Recipe';
import { ToolsModel } from 'app/db/Tool';
import { IngredientModel } from 'app/db/Ingredient';
import { InfosModel } from 'app/db/Info';

import {Settings} from 'app/models/Settings';
import {loadRecipes, loadIngredientsTools} from 'app/recipes/duck/actions';
import {LOAD_SETTINGS, AppActionTypes} from './types'
import { loadInfo } from 'app/learn/duck/actions';

export const initApp = () => {
  return async (dispatch) => {
    try {
      const dbInfos = await InfosModel.getInfos();
      if (dbInfos) {
        const infos = await InfosModel.mkMap(dbInfos.infos)
        dispatch(loadInfo(infos, dbInfos.version, dbInfos.id, dbInfos.learnInfoIds))
      }
      
      const tools = await ToolsModel.getAll() || [];
      const ingredients = await IngredientModel.getAll() || [];
      dispatch(loadIngredientsTools(ingredients, tools));

      const recipes = await RecipesModel.getRecipes();
      dispatch(loadRecipes(recipes));

      const settings = await SettingsModel.getOrCreate();
      dispatch(loadSettings(settings));
    } catch(e) {
      console.log(e);
    }
  }
}

export const loadSettings = (settings: Settings): AppActionTypes => {
  return {
    type: LOAD_SETTINGS,
    settings
  }
}
