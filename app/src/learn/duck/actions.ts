import { InfoActionTypes, LOAD_INFO } from './types'
import { Info, LearnInfoIds } from 'app/models/Info';
import { ComponentId, Version } from 'app/models/common';

export const loadInfo = (infos: Map<ComponentId, Info>, version: Version, infosId: ComponentId, learnInfoIds: LearnInfoIds): InfoActionTypes => {
  return {
    type: LOAD_INFO,
    infos,
    version,
    infosId,
    learnInfoIds
  }
};
