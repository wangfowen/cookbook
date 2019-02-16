import Settings from '../db/models/Settings';

export const INIT_APP = "INIT_APP";
export const initApp = () => {
  return async (dispatch) => {
    try {
      const settings = await Settings.getOrCreateSetting();
      dispatch(loadSettings(settings));
    } catch(e) {
      console.log(e);
    }
  }
};

export const LOAD_SETTINGS = "LOAD_SETTINGS";
export const loadSettings = (settings) => {
  return {
    type: LOAD_SETTINGS,
    settings
  }
};