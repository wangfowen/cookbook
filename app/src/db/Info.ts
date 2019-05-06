import DbHelper from './DbHelper';
import { InfoMeta, Info, InfoId, LearnInfoIds } from 'app/models/Info';
import { Component, ComponentId, Version } from 'app/models/common';

/*
  infos can have sub-infos because different parts can get marked read from visiting different recipes
  learn renders on learn index as array in order with content pulled from info map
  some info is custom for recipes and don't appear under learn but are referenced by recipes
  when update from server, we update learnInfoIds and infos, but leave meta alone
*/

interface DbInfo extends Component {
  id: InfoId
  content: string
  title?: string
  subInfoIds?: InfoId[]
}

export interface DbInfos extends Component {
  version: Version
  learnInfoIds: LearnInfoIds
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
  },

  async getInfos(): Promise<DbInfos> {
    //return await DbHelper.readDb<DbInfos>(INFO_KEY)
    return new Promise((resolve, reject) => {
      resolve({
        id: "1",
        version: 1,
        learnInfoIds: {
          general: ["f4"],
          ingredients: ["f5"],
          tools: []
        },
        infos: [
          {
            id: "f1",
            content: "Use a ripe one"
          }, {
            id: "f2",
            content: "Freshly ground is better"
          },
          {
            id: "f3",
            content: "salt and pepper to taste"
          },
          {
            id: "f4",
            title: "Food Storage",
            content: `
            How does food go bad?
            Exposure to bacteria - breaks down the food. Higher temperature leads to more bacteria up til a certain temp, at which point they die. Fastest growth at 40F-140F (room temperature is 70F). Bacteria is everywhere, so as long as your food is exposed + there's oxygen for it to breathe + water for it to drink, bacteria will grow.
            Exposure to air - oxidation causes fats to go rancid (oxygen bonds to fats), which makes it taste bad
            Enzymatic reactions - enzymes inside food cause it to do reactions that over time make it break down
            
            How preserve food?
            in car:
            keep in cooler - slows down microbial growth
            Ice packs / cooler bags - can freeze whenever you get the chance
            
            We’ve had a hard time keeping our cooler well stocked with ice and we don’t stop long enough for ice packs to freeze, so we’ve just rationed our food by perishability.
            From our experimentation, tofu lasts about 3 days at room temp, root vegetables a bit longer, egg quite a while before it fully goes bad but just a few days before quality degrades, meat no more than 1 day, vegetables a few days but it quickly degrades in quality. 
            
            at home:
            refrigerate - same as cooler but better
            Freeze - kills bacteria altogether! Slows down enzymes. This is great. Not all food freezes well though. Fruits and veggies the cell walls rupture from freezing (water expansion) and that makes most of them not as good. For some other ones, it actually makes it better! Corn / peas frozen preserve the sweetness better than fresh picked. 
            Wrap your food well to prevent freezer burn - happens from exposure to air causing dehydration on surface of food
            
            Advanced at home:
            Commercial uses these, but now there’s tools that allow you to do it at home as well!
            
            vacuum seal - no oxygen so no bacteria or oxidation! You can get a vacuum sealer + bags. Some are reusable
            Dehydrate - by removing the moisture, bacteria can’t grow as easily, slows down process
            Cure - you can try your hand at pickling veggies / curing meat / jamming. The salt prevents the food from going bad - osmosis from salt leads to dehydration at the surface, salt also messes with enzymes
            Sugar has similar attributes of drawing out moisture, but needs to be high enough quantity (jams). Too low and it becomes food for increasing microbial growth
            Smoking - food dries out a bit + chemicals in smoke inhibit bacteria
            
            commercial:
            freeze dry
            can - heat til bacteria dies, then vacuum seal into the can. this way no oxidation and nothing can get in so no bacteria / enzymes
            `
          },
          {
            id: "f5",
            title: "Herbs & Spices",
            content: `
              Bloom your spices.
            `,
            subInfoIds: ["f2"]
          }
        ]
      })
    })
  },
}