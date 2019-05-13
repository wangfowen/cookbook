import { LOAD_INFO, InfoActionTypes, MARK_READ } from "./types";
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
  const infos = new Map(state.infos)
  switch (action.type) {
    case LOAD_INFO:
      action.infos.forEach((info) => {
        infos.set(info.id, info)
      })

      const versions = new Map(state.versions)
      versions.set(action.infosId, action.version)

      return {
        ...state, 
        infos,
        versions,
        //TODO(future): when add more modules, merge instead of replace
        learnInfoIds: action.learnInfoIds
      };

    case MARK_READ:
      for (const obj of action.infos) {
        infos.set(obj.id, obj)
      }

      return {
        ...state,
        infos
      }
    default:
      return state;
  }
};

export default InfoReducer;