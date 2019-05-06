import { Ingredient } from "app/models/Ingredient";
import DbHelper from "./DbHelper";

const KEY = "ingredients"
export const IngredientModel = {
  async getAll(): Promise<Ingredient[]> {
    //return await DbHelper.readDb<Ingredient[]>(KEY)
    return new Promise((resolve, reject) => {
      resolve([
        {
          id: "i1",
          name: "Avocado",
        }, {
          id: "i2",
          name: "Lemon",
        },
        {
          id: "i3",
          name: "Black Pepper",
          infoId: "Freshly ground is better"
        },
        {
          id: "i4",
          name: "Salt",
        }
      ])
    })
  },

  update(ingredients: Ingredient[]) {
    DbHelper.writeDb<Ingredient[]>(KEY, ingredients)
  }
}