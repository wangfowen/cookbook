import { Tool } from "app/models/Tool";
import DbHelper from "./DbHelper";

const KEY = "tools"
export const ToolsModel = {
  async getAll(): Promise<Tool[]> {
    //return await DbHelper.readDb<Tool[]>(KEY)
    return new Promise((resolve, reject) => {
      resolve([
        {
          id: "t1",
          name: "Knife",
        }, {
          id: "t2",
          name: "Cutting Board",
        },
      ])
    })
  },

  update(tools: Tool[]) {
    DbHelper.writeDb<Tool[]>(KEY, tools)
  }
}