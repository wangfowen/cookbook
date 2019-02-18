import dbUtils from '../db-utils';

class Recipe {}

Recipe.schema = {
  name: 'Recipe',
  primaryKey: 'id',
  properties: {
    id: 'int',
    data: 'string'
  }
}

Recipe.loadRecipes = () => {
  /*
  in the future, this should load from an endpoint if there's internet to get the latest data
  for now, it'll get it from a file
  */

  return new Promise((resolve, reject) => {
    resolve([
      {
        key: "1",
        title: "Fancy Avocado",
        hero_image: "link",
        ingredients: {
          main: [
            {
              amount: 1,
              size: "large",
              name: "Avocado",
              info: "Use a ripe one"
            }, {
              amount: 0.5,
              name: "Lemon"
            }
          ],
          garnish: [
            {
              name: "Black Pepper",
              info: "Freshly ground is better"
            }
          ],
          basics: [
            {
              name: "Salt"
            }
          ]
        },
        cook_min: 10,
        prep_min: 5,
        servings: 2,
        tools: ["Knife", "Cutting Board"],
        steps: {
          prep: [
            {
              info: "Cut [avocado](Avocado), remove core, cut into slices",
              tools: ["Knife", "Cutting Board"],
              output: "Sliced Avocado"
            }
          ],
          cook: [
            {
              info: "Squeeze [lemon](Lemon) on [avocado](Sliced Avocado). Add {[salt](Salt) and [pepper](Black Pepper)}(1)",
              tools: ["Knife"],
              output: "Fancy Avocado"
            }
          ]
        },
        notes: {
          1: "Salt and pepper to taste."
        }
      }
    ]);
  });

  //TODO: think about how write recipes to be easy to write, but then can convert into data needed
  //TODO: load latest data from file
  //TODO: if data is different from what's in realm, overwrite what's in realm
  //TODO: if no internet, just load from realm
  //TODO: parse data into JSON
}

export default Recipe;