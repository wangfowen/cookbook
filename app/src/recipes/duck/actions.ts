import { RecipeActionTypes, LOAD_RECIPES, LOAD_INGREDIENTS_TOOLS } from './types'
import { DbRecipes } from 'app/db/Recipe';
import { Ingredient } from 'app/models/Ingredient';
import { Tool } from 'app/models/Tool';

export const loadRecipes = (recipes: DbRecipes): RecipeActionTypes => {
  return {
    type: LOAD_RECIPES,
    recipes
  }
};

export const loadIngredientsTools = (ingredients: Ingredient[], tools: Tool[]): RecipeActionTypes => {
  return {
    type: LOAD_INGREDIENTS_TOOLS,
    ingredients,
    tools
  }
}
