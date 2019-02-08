import {INIT_APP} from '../actions/AppActions';

const initialState = {
  firstLoad: true,
  preferences: {}
};

const AppReducer = (state = initialState, action = {}) => {
  switch (action.type) {
    case INIT_APP:
      console.log("initing app");
      return state;
    default:
      return state;
  }
};

export default AppReducer;