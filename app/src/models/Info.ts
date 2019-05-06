import { Component, ComponentId } from "./common";

export type InfoId = ComponentId

export interface Info extends Component {
  id: InfoId
  title?: string
  content: string
  subInfoIds?: InfoId[]
  parentInfoIds?: InfoId[]
  meta?: InfoMeta
}

export interface InfoMeta extends Component {
  read: boolean
}

export interface LearnInfoIds {
  general: InfoId[]
  ingredients: InfoId[]
  tools: InfoId[]
}