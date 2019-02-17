import {LOAD_RECIPES} from "../actions/RecipeActions";

const RecipesReducer = (state = [], action = {}) => {
  switch (action.type) {
    case LOAD_RECIPES:
      return action.recipes;
    default:
      return state;
  }
};

export default RecipesReducer;