import DbHelper from './DbHelper';
import { InfoMeta, Info, InfoId } from 'app/models/Info';
import { Component, ComponentId, Version } from 'app/models/common';

/*
  infos can have sub-infos because different parts can get marked read from visiting different recipes
  learn renders on learn index as array in order with content pulled from info map
  some info is custom for recipes and don't appear under learn but are referenced by recipes
  when update from server, we update learnInfoIds and infos, but leave meta alone
*/

interface DbInfo extends Component {
  id: InfoId
  title: string
  content: string
  subInfoIds?: InfoId[]
}

export interface DbInfos extends Component {
  version: Version
  learnInfoIds: {
    general: InfoId[]
    ingredients: InfoId[]
    tools: InfoId[]
  }
  infos: DbInfo[]
}

const INFO_KEY = "infos"
const META_KEY = "metas"
const metaKey = (id: string) => `${META_KEY}_${id}`

export const InfosModel = {
  //TODO: this is probably not the best way to do this... a lot of db reads
  //TODO: test this
  async mkMap(infos: DbInfo[]) {
    const infoMap = new Map<ComponentId, Info>()
    //add meta for every info
    for (const dbInfo of infos) {
      const info: Info = {...dbInfo, parentInfoIds: []}

      const meta = await DbHelper.readDb<InfoMeta>(metaKey(dbInfo.id))
      if (meta !== null) {
        info.meta = meta
      }

      infoMap.set(dbInfo.id,  info)
    }

    //set parent for every child
    infoMap.forEach((info) => {
      if (info.subInfoIds && info.subInfoIds.length > 0) {
        info.subInfoIds.forEach((id) => {
          const subInfo = infoMap.get(id)
          if (subInfo && subInfo.parentInfoIds) {
            subInfo.parentInfoIds.push(info.id)
            infoMap.set(id, subInfo)
          }
        })
      }
    })

    return infoMap
  },

  async getInfos() {
    return await DbHelper.readDb<DbInfos>(INFO_KEY)
  },

  async getMeta(id: string) {
    return await DbHelper.readDb<InfoMeta>(metaKey(id))
  },

  shouldUpdate(version: number, infos: DbInfos) {
    return infos.version < version
  },

  updateMeta(meta: InfoMeta) {
    DbHelper.writeDb<InfoMeta>(metaKey(meta.id), meta)
  },

  updateInfos(infos: DbInfos) {
    DbHelper.writeDb<DbInfos>(INFO_KEY, infos)
  }
}