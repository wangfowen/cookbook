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

  //TODO: think about what JSON data need to look like to render
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

  //TODO: think about how write recipes to be easy to write, but then can convert into data needed
  //TODO: load latest data from file
  //TODO: if data is different from what's in realm, overwrite what's in realm
  //TODO: if no internet, just load from realm
  //TODO: parse data into JSON
}

export default Recipe;