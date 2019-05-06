import {LOAD_SETTINGS, AppActionTypes} from "./types";

interface AppState {
  setPreferences: boolean | undefined
}

const initialState: AppState = {
  setPreferences: undefined,
};

const AppReducer = (state = initialState, action: AppActionTypes): AppState => {
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