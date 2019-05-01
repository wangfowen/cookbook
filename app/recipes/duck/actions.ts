import {LOAD_RECIPES} from './constants'
import { Recipe } from 'models/Recipe';

export const loadRecipes = (recipes: Recipe[]) => {
  return {
    type: LOAD_RECIPES,
    recipes
  }
};