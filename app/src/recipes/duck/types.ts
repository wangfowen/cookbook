import { Ingredient } from "app/models/Ingredient";
import { Tool } from "app/models/Tool";
import { DbRecipes } from "app/db/Recipe";

export const LOAD_RECIPES = "LOAD_RECIPES";

interface LoadRecipeAction {
  type: typeof LOAD_RECIPES
  recipes: DbRecipes
}

export const LOAD_INGREDIENTS_TOOLS = "LOAD_INGREDIENTS_TOOLS";

interface LoadIngredientsToolsAction {
  type: typeof LOAD_INGREDIENTS_TOOLS
  ingredients: Ingredient[]
  tools: Tool[]
}

export type RecipeActionTypes = LoadRecipeAction | LoadIngredientsToolsAction