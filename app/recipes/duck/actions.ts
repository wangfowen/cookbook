import {LOAD_RECIPES} from './constants'
import { Recipe } from 'app/models/Recipe';

export const loadRecipes = (recipes: Recipe[]) => {
  return {
    type: LOAD_RECIPES,
    recipes
  }
};