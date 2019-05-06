import { LOAD_INFO, InfoActionTypes } from "./types";
import { ComponentId, Version } from "app/models/common";
import { Info } from "app/models/Info";

interface InfoState {
  infos: Map<ComponentId, Info>,
  versions: Map<ComponentId, Version>
}

const initialState: InfoState = {
  infos: new Map(),
  versions: new Map()
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
        versions
      };
    default:
      return state;
  }
};

export default InfoReducer;