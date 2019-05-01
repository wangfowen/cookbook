//import Model from '../../common/Model'

export enum ComponentType {
  Ingredient = "ingredient",
  Recipe = "recipe",
  Unfinished = "unfinished"
}

export interface RecipeComponent {
  id: string
  type: ComponentType
  amount?: number
  size?: string
  customInfoId?: string
}

export interface Step {
  info: string
  output: RecipeComponent
}

export interface Recipe {
  id: string
  title: string
  heroImage: string
  ingredients: {
    main: RecipeComponent[]
    garnish: RecipeComponent[]
    basics: RecipeComponent[]
  }
  cookMin: number
  prepMin: number
  servings: number
  toolIds: string[]
  steps: {
    prep: Step[]
    cook: Step[]
  }
}

export interface Recipes {
  recipes: Recipe[]
  version: number
}

const KEY = "recipes"
export const RecipesModel = {
  mkMap(recipes: Recipe[]) {
    return recipes.reduce((obj, recipe) => {
      obj[recipe.id] = recipe
      return obj
    }, {})
  },

  shouldUpdate(version: number, recipes: Recipes) {
    return recipes.version < version
  },

  loadRecipes(): Promise<Recipe[]> {
    //return await Model.readDb<Recipes>(this.key).recipes
    return new Promise((resolve, reject) => {
      resolve([
        {
          id: "1",
          title: "Fancy Avocado",
          heroImage: "link",
          ingredients: {
            main: [
              {
                amount: 1,
                size: "large",
                id: "Avocado",
                type: ComponentType.Ingredient,
                customInfoId: "Use a ripe one"
              }, {
                amount: 0.5,
                id: "Lemon",
                type: ComponentType.Ingredient
              }
            ],
            garnish: [
              {
                id: "Black Pepper",
                type: ComponentType.Ingredient,
                //except this would probably be a normal info
                customInfoId: "Freshly ground is better"
              }
            ],
            basics: [
              {
                id: "Salt",
                type: ComponentType.Ingredient,
              }
            ]
          },
          cookMin: 10,
          prepMin: 5,
          servings: 2,
          toolIds: ["Knife", "Cutting Board"],
          steps: {
            prep: [
              {
                info: "Cut [avocado](Avocado), remove core, cut into slices",
                output: {
                  id: "Sliced Avocado",
                  type: ComponentType.Unfinished
                }
              }
            ],
            cook: [
              {
                info: "Squeeze [lemon](Lemon) on [avocado](Sliced Avocado). Add {[salt](Salt) and [pepper](Black Pepper)}(1 -> salt and pepper to taste)",
                output: {
                  id: "Fancy Avocado",
                  type: ComponentType.Recipe
                }
              }
            ]
          }
        }
      ]);
    });
  }
}