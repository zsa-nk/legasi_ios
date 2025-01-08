import AsyncStorage from '@react-native-async-storage/async-storage';

const storeData = async (key, value) => {
  try {
    await AsyncStorage.setItem(key, value);
  } catch (e) {
    // saving error
    console.error(e);
  }
};

const storeObjectData = async (key, value) => {
  try {
    const jsonValue = JSON.stringify(value);
    await AsyncStorage.setItem(key, jsonValue);
  } catch (e) {
    // saving error
    console.error(e)
  }
};


const getData = async (key) => {
  try {
    const value = await AsyncStorage.getItem(key);
    if (value !== null) {
      return value
    }
  } catch (e) {
    // error reading value
    console.error(e)
  }
};


const getObjectData = async (key) => {
  try {
    const jsonValue = await AsyncStorage.getItem(key);
    return jsonValue != null ? JSON.parse(jsonValue) : null;
  } catch (e) {
    // error reading value
    console.error(e)
  }
};

const removeData = async (key) => {
    try {
        await AsyncStorage.removeItem(key);
    } catch (e) {
    // error removing value
    console.error(e);
    }
} 

module.exports = {
    getData,
    getObjectData,
    storeData,
    storeObjectData,
    removeData
}