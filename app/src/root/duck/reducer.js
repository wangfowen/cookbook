import {LOAD_SETTINGS} from "./constants";

const initialState = {
  setPreferences: undefined,
  preferences: {}
};

const AppReducer = (state = initialState, action = {}) => {
  switch (action.type) {
    case LOAD_SETTINGS:
      return {
        ...state,
        setPreferences: action.settings.setPreferences
      };
    default:
      return state;
  }
};

export default AppReducer;