import { Component, ComponentId } from "./common";
import { InfoId } from "./Info";

export type IngredientId = ComponentId

export interface Ingredient extends Component {
  id: IngredientId
  name: string
  infoId?: InfoId
}
