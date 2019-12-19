import { Component, ComponentId } from "./common";
import { Ingredient, IngredientId } from "./Ingredient";
import { InfoId } from "./Info";
import { ToolId } from "./Tool";
import { DbRecipe, DbStep } from "app/db/Recipe";

export type RecipeId = ComponentId
export type UnfinishedId = ComponentId
export type RecipeComponentId = RecipeId | IngredientId | UnfinishedId

export interface UnfinishedComponent extends Component {
  id: UnfinishedId
  name: string
  //TODO(improve): errors if it's ComponentType.Unfinished, but the other one doesn't fail
  type: ComponentType
}

export interface RecipeComponent extends Component {
  id: IngredientId | RecipeId
  type: ComponentType.Ingredient | ComponentType.Recipe
  amount?: number
  size?: string
  customInfoId?: InfoId
}

//TODO(improve): naming is hard
export type InclusiveComponent = UnfinishedComponent | RecipeComponent

export type StepInfo = string

export interface Step {
  //inputIds: RecipeComponentId[]
//TODO: step info is an array of tokens
  tokenizedInfo: StepInfo
  outputId: UnfinishedId
}

export interface Recipe extends Component {
  id: RecipeId
  title: string
  heroImage: string
  description: string
  cookMin: number
  prepMin: number
  servings: number
  ingredients: {
    mainIds: RecipeComponentId[]
    garnishIds: RecipeComponentId[]
    basicsIds: RecipeComponentId[]
  }
  components: Map<RecipeComponentId, InclusiveComponent>
  toolIds: ToolId[]
  steps: {
    prep: Step[]
    cook: Step[]
  }
}

export enum ComponentType {
  Ingredient = "ingredient",
  Recipe = "recipe",
  Unfinished = "unfinished"
}

export const RecipesHelper = {
  allStepUnfinishedRegex: /\]\{u: [A-Za-z\s]+\}/g,
  stepUnfinishedStrRegex: /\]\{u: ([A-Za-z\s]+)\}/,
  allStepInputIdRegex: /\]\{[i|u|r]: ([i|u|r][0-9]+)\}/g,
  stepInputIdRegex: /\]\{[i|u|r]: ([i|u|r][0-9]+)\}/,
  hourify(min: number) {
    if (min >= 60) {
      const hours = min / 60
      const leftover = min % 60
      return `${hours} hr ${leftover} min`
    } else {
      return `${min} min`
    }
  },

  componentDescriptor(r: RecipeComponent, i: Ingredient) {
    const amount = r.amount ? r.amount + " " : ""
    const size = r.size ? r.size + " " : ""
    return `${amount}${size}${i.name}`
  },

  //TODO: test this
  convertFromDb(dbRecipe: DbRecipe): Recipe {
    //convert components to map
    const components: Map<ComponentId, InclusiveComponent> = new Map()
    dbRecipe.components.map((component) => {
      components.set(component.id, component)
    })

    let i = 1
    const unfinished = {}
    const convertStep = (dbStep: DbStep) => {
      /*
        - assign an id for output
        - override mentions of output with outputId instead
      */
      const step: Step = {
        outputId: `u${i}`,
        tokenizedInfo: dbStep.info,
        //inputIds: []
      }
      const component = {
        id: step.outputId,
        name: dbStep.output,
        type: ComponentType.Unfinished
      }
      components.set(component.id, component)
      unfinished[dbStep.output] = component.id
      i += 1

      //TODO: tokenize. replace outputs with outputId in tokenization
      //look for outputs mentioned, replace with outputId
      const unfinishedMatches = step.tokenizedInfo.match(RecipesHelper.allStepUnfinishedRegex)
      if (unfinishedMatches) {
        unfinishedMatches.forEach((match) => {
          const str = match.match(RecipesHelper.stepUnfinishedStrRegex)
          if (str && str[1]) {
            const newStr = match.replace(str[1], unfinished[str[1]])
            step.tokenizedInfo = step.tokenizedInfo.replace(match, newStr)
          }
        })
      }

      /*
      don't seem to actually need this?
      //look for inputs mentioned, add to inputIds
      const matches = step.info.match(RecipesHelper.allStepInputIdRegex)
      if (matches) {
        matches.forEach((match) => {
          const id = match.match(RecipesHelper.stepInputIdRegex)
          if (id && id[1]) {
            step.inputIds = step.inputIds.concat(id[1])
          }
        })
      }
      */

      return step
    }

    // convert step, add to map, add to step
    const steps = {
      prep: dbRecipe.steps.prep.map((dbStep) => {
        return convertStep(dbStep)
      }),
      cook: dbRecipe.steps.cook.map((dbStep) => {
        return convertStep(dbStep)
      }),
    }

    return {
      ...dbRecipe,
      components,
      steps
    }
  }
}