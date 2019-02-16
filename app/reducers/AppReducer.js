import {LOAD_SETTINGS} from "../actions/AppActions";

const initialState = {
  firstLoad: undefined,
  preferences: {}
};

const AppReducer = (state = initialState, action = {}) => {
  switch (action.type) {
    case LOAD_SETTINGS:
      return {
        ...state,
        firstLoad: action.settings.isFirstLoad
      };
    default:
      return state;
  }
};

export default AppReducer;