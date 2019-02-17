import dbUtils from '../db-utils';

class Settings {}

Settings.schema = {
  name: 'Settings',
  primaryKey: 'id',
  properties: {
    id: 'int',
    isFirstLoad: 'bool'
  }
}

Settings.getOrCreateSetting = () => {
  return dbUtils.firstOrCreateDb({schema: [Settings], schemaVersion: 1}, (realm) => {
    return realm.objects('Settings');
  }, (realm) => {
    return realm.create('Settings', {id: 1, isFirstLoad: true}, true);
  });
}

Settings.changeSetting = () => {
  return dbUtils.writeDb({schema: [Settings], schemaVersion: 1}, (realm) => {
    return realm.create('Settings', {id: 1, isFirstLoad: false}, true);
  });      
}

export default Settings;