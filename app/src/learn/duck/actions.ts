import { InfoActionTypes, LOAD_INFO, MARK_READ } from './types'
import { Info, LearnInfoIds, InfoMeta } from 'app/models/Info';
import { ComponentId, Version } from 'app/models/common';
import { InfosModel } from 'app/db/Info';

export const loadInfo = (infos: Map<ComponentId, Info>, version: Version, infosId: ComponentId, learnInfoIds: LearnInfoIds): InfoActionTypes => {
  return {
    type: LOAD_INFO,
    infos,
    version,
    infosId,
    learnInfoIds
  }
};

export const markRead = (infos: Info[]) => {
  return async (dispatch) => {
    try {
      for (const info of infos) {
        const newMeta: InfoMeta = {
          id: info.id,
          read: true
        }
        await InfosModel.updateMeta(newMeta);
        info.meta = newMeta
      }

      dispatch(markReadState(infos))
    } catch(e) {
      console.log(e);
    }
  }
}

const markReadState = (infos: Info[]): InfoActionTypes => {
  return {
    type: MARK_READ,
    infos
  }
}