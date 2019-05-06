import { Info } from "app/models/Info";
import { ComponentId, Version } from "app/models/common";

export const LOAD_INFO = "LOAD_INFO";

interface LoadInfoAction {
  type: typeof LOAD_INFO
  infos: Map<ComponentId, Info>
  version: Version
  infosId: ComponentId
}


export type InfoActionTypes = LoadInfoAction 