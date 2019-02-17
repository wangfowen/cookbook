export const LOAD_RECIPES = "LOAD_RECIPES";
export const loadRecipes = (recipes) => {
  return {
    type: LOAD_RECIPES,
    recipes
  }
};