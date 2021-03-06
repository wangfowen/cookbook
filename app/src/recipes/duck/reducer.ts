import { LOAD_RECIPES, RecipeActionTypes, LOAD_INGREDIENTS_TOOLS } from "./types";
import { Recipe, RecipesHelper, RecipeId } from "app/models/Recipe";
import { Ingredient, IngredientId } from "app/models/Ingredient";
import { Tool, ToolId } from "app/models/Tool";
import { ComponentId, Component, Version } from "app/models/common";

interface RecipesState {
  ingredients: Map<IngredientId, Ingredient>
  tools: Map<ToolId, Tool>
  recipes: Map<RecipeId, Recipe>
  recipesVersions: Map<ComponentId, Version>
}

const initialState: RecipesState = {
  ingredients: new Map(),
  recipes: new Map(),
  tools: new Map(),
  recipesVersions: new Map()
}

function mergeIn<T extends Component>(array: T[], map: Map<ComponentId, T>) {
  const newMap = new Map(map)
  for (const obj of array) {
    newMap.set(obj.id, obj)
  }

  return newMap
}

const RecipesReducer = (state = initialState, action: RecipeActionTypes): RecipesState => {
  switch (action.type) {
    case LOAD_RECIPES:
      const recipesVersions = new Map(state.recipesVersions)
      recipesVersions.set(action.recipes.id, action.recipes.version)

      const recipes = new Map(state.recipes)
      action.recipes.recipes.forEach((dbRecipe) => {
        const recipe = RecipesHelper.convertFromDb(dbRecipe) 
        recipes.set(recipe.id, recipe)
      })

      //TODO: for each recipe, add its id to ingredients that use it

      return {...state, recipes: recipes, recipesVersions};
    case LOAD_INGREDIENTS_TOOLS:
      return {
        ...state, 
        ingredients: mergeIn(action.ingredients, state.ingredients),
        tools: mergeIn(action.tools, state.tools)
      }
    default:
      return state;
  }
};

export default RecipesReducer;