import { InfoActionTypes, LOAD_INFO } from './types'
import { Info } from 'app/models/Info';
import { ComponentId, Version } from 'app/models/common';

export const loadInfo = (infos: Map<ComponentId, Info>, version: Version, infosId: ComponentId): InfoActionTypes => {
  return {
    type: LOAD_INFO,
    infos,
    version,
    infosId
  }
};
