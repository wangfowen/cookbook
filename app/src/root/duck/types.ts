import { Settings } from "app/models/Settings";

export const LOAD_SETTINGS = "LOAD_SETTINGS"

interface LoadSettingsAction {
  type: typeof LOAD_SETTINGS
  settings: Settings
}

export type AppActionTypes = LoadSettingsAction