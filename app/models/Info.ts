import Model from './Model';

/*
  infos can have sub-infos because different parts can get marked read from visiting different recipes
  learn renders on learn index as array in order with content pulled from info map
  some info is custom for recipes and don't appear under learn but are referenced by recipes
  when update from server, we update learnInfoIds and infos, but leave meta alone
*/
export interface Info {
  id: string
  title: string
  content: string
  subInfoIds?: string[]
}

export interface InfoMeta {
  id: string
  read: boolean
}

interface LearnInfoIds {
  general: string[]
  ingredients: string[]
  tools: string[]
}

export interface Infos {
  version: number
  learnInfoIds: LearnInfoIds
  infos: Info[]
}

const INFO_KEY = "infos"
const META_KEY = "metas"
const metaKey = (id: string) => `${META_KEY}_${id}`

export const InfosModel = {
  async mkMap(infos: Info[]) {
    const infoMap = {}
    for (const info of infos) {
      infoMap[info.id] = {info}

      const meta = await Model.readDb<InfoMeta>(metaKey(info.id))
      if (meta !== null) {
        infoMap[info.id].meta = meta
      }
    }

    return infoMap
  },

  async getInfos() {
    return await Model.readDb<Infos>(INFO_KEY)
  },

  async getMeta(id: string) {
    return await Model.readDb<InfoMeta>(metaKey(id))
  },

  shouldUpdate(version: number, infos: Infos) {
    return infos.version < version
  },

  updateMeta(meta: InfoMeta) {
    Model.writeDb<InfoMeta>(metaKey(meta.id), meta)
  },

  updateInfos(infos: Infos) {
    Model.writeDb<Infos>(INFO_KEY, infos)
  }
}