import { Component, ComponentId } from "./common";
import { InfoId } from "./Info";

export type ToolId = ComponentId

export interface Tool extends Component {
  id: ToolId
  name: string
  infoId?: InfoId
}
