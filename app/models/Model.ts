import { AsyncStorage } from 'react-native';

const Model = {
  writeDb<T>(key: string, jsonData: T) {
    return AsyncStorage.setItem(key, JSON.stringify(jsonData))
  },

  async readDb<T>(key: string): Promise<T | null> {
    const data = await AsyncStorage.getItem(key);
    if (data) {
      return JSON.parse(data)
    } 
    return null
  }
}

export default Model 