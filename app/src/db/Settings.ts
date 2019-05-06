import Model from './DbHelper';
import { Settings } from 'app/models/Settings';


const KEY = "settings"
export const SettingsModel = {
  update(settings: Settings) {
    Model.writeDb<Settings>(KEY, settings)
  },

  async getOrCreate() {
    const settings = await Model.readDb<Settings>(KEY)
    if (settings) {
      return settings
    }
    const newSettings = {
      setPreferences: false
    }
    await Model.writeDb<Settings>(KEY, newSettings)
    return newSettings
  }
}