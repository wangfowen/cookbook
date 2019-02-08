import Settings from './models/Settings';
import Realm from 'realm';

export default class dbUtils {
  _changeSetting = (isFirstLoad=true) => {
   return new Promise((resolve, reject) => {
     try {
       let modifiedDbObjects = []
       //TODO: this isn't working, look into why
       Realm.open({schema: [Settings]})
        .then(realm => {
          realm.write(() => {
            modifiedDbObjects.push(realm.create('Setting', {id: 1, isFirstLoad: isFirstLoad}, true));
          });
        });
        resolve(modifiedDbObjects)
      } catch (e) {
        reject(e)
      }
    })
  }

  //TODO: finish implement this 
  changeSetting = () => {
    this._changeSetting(false)
      .then((modifiedDbObjects) => {
        console.log(modifiedDbObjects);
        //this.store.dispatch(successAction(modifiedObjects))
      }).catch((e) => {
        console.log(e);
        //this.store.dispatch(errorAction(error))
      })
  }
}