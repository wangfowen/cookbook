import dbUtils from '../db/db-utils';

const db = new dbUtils();
export const INIT_APP = "INIT_APP";
export const initApp = () => {
  return dispatch => {
    db.changeSetting();
  }
}