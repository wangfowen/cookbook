import { LOAD_INFO, InfoActionTypes } from "./types";
import { ComponentId, Version } from "app/models/common";
import { Info, InfoId, LearnInfoIds } from "app/models/Info";

interface InfoState {
  infos: Map<InfoId, Info>
  versions: Map<ComponentId, Version>
  learnInfoIds: LearnInfoIds
}

const initialState: InfoState = {
  infos: new Map(),
  versions: new Map(),
  learnInfoIds: {
    general: [],
    ingredients: [],
    tools: []
  }
}

const InfoReducer = (state = initialState, action: InfoActionTypes): InfoState => {
  switch (action.type) {
    //TODO: also put in the learn modules
    case LOAD_INFO:
      const infos = new Map(state.infos)
      action.infos.forEach((info) => {
        infos.set(info.id, info)
      })

      const versions = new Map(state.versions)
      versions.set(action.infosId, action.version)

      return {
        ...state, 
        infos,
        versions,
        //TODO: merge instead of replace
        learnInfoIds: action.learnInfoIds
      };
    default:
      return state;
  }
};

export default InfoReducer;