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
  for now, it'll get it from a JSON file
  */

  //TODO: come up with format for recipes
  return new Promise((resolve, reject) => {
    resolve([
      {
        key: "1",
        title: "test",
        ingredients: "blah, blah"
      },
      {
        key: "2",
        title: "test 2",
        ingredients: "blah, blah"
      }
    ]);
  });

  //TODO: load latest data from JSON
  //TODO: if data is different from what's in realm, overwrite what's in realm
  //TODO: if no internet, load from realm, parsing the stored content
}

export default Recipe;