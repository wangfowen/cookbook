import Realm from 'realm';

const dbUtils = {
  writeDb: (schema, writeFunc) => {
   return new Promise((resolve, reject) => {
      Realm.open(schema)
        .then(realm => {
          let modifiedDbObjects = []
          realm.write(() => {
            modifiedDbObjects.push(writeFunc(realm));
          });
          resolve(modifiedDbObjects);
        })
        .catch(e => {
          reject(e);
        });
    })
  },

  readDb: (schema, readFunc) => {
   return new Promise((resolve, reject) => {
      Realm.open(schema)
        .then(realm => {
          const results = readFunc(realm);
          resolve(results);
        })
        .catch(e => {
          reject(e);
        });
    })
  },

  firstOrCreateDb: (schema, readFunc, writeFunc) => {
    return new Promise((resolve, reject) => {
      Realm.open(schema)
        .then(realm => {
          let result = readFunc(realm)[0];
          if (result === undefined) {
            realm.write(() => {
              result = writeFunc(realm);
            });
          }

          resolve(result);
        })
        .catch(e => {
          reject(e);
        });
    });
  }
};

export default dbUtils;