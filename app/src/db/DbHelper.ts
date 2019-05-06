import AsyncStorage from '@react-native-community/async-storage';

const DbHelper = {
  writeDb<T>(key: string, jsonData: T) {
    try {
      return AsyncStorage.setItem(key, JSON.stringify(jsonData))
    } catch (e) {
      console.log(e)
      return null
    }
  },

  async readDb<T>(key: string): Promise<T | null> {
    try {
      const data = await AsyncStorage.getItem(key);
      if (data) {
        return JSON.parse(data)
      } 
      return null
    } catch (e) {
      console.log(e)
      return null
    }
  }
}

export default DbHelper 