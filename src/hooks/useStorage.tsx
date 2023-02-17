import AsyncStorage from "@react-native-async-storage/async-storage";
import { Alert } from "react-native";

interface ISaveStorage {
  key: string;
  value: any;
  isStringValue?: boolean;
}

interface IGetStorage {
  key: string;
  isStringValue?: boolean;
}

interface IRemoveStorage {
  key: string;
}

export function useStorage() {
  async function saveStorageData({ key, value, isStringValue }: ISaveStorage) {
    try {
      if (isStringValue) {
        await AsyncStorage.setItem(key, value);
      }

      if (!isStringValue) {
        await AsyncStorage.setItem(key, JSON.stringify(value));
      }

      // console.info(`[STORAGE DATA SAVED]`, key);
    } catch (error: any) {
      Alert.alert(`[STORAGE SAVE ERROR: ${key}]`, error.message);
    }
  }

  async function getStorageData({ key, isStringValue }: IGetStorage) {
    try {
      const jsonValue = await AsyncStorage.getItem(key);

      if (isStringValue) {
        return jsonValue != null ? jsonValue : null;
      }

      // console.info(`[STORAGE DATA RECOVERED]`, key);
      return jsonValue != null ? JSON.parse(jsonValue) : null;
    } catch (error: any) {
      Alert.alert(`[STORAGE RECOVER ERROR: ${key}]`, error.message);
    }
  }

  async function removeStorageData({ key }: IRemoveStorage) {
    try {
      await AsyncStorage.removeItem(key);
      // console.info(`[STORAGE DATA REMOVED]`, key);
    } catch (error: any) {
      Alert.alert(`[STORAGE REMOVE ERROR: ${key}]`, error.message);
    }
  }

  async function clearStorageData() {
    try {
      await AsyncStorage.clear();
      // console.info(`[STORAGE DATA CLEANED]`);
    } catch (error: any) {
      Alert.alert("[STORAGE CLEAR ERROR]", error.message);
    }
  }

  return {
    saveStorageData,
    getStorageData,
    removeStorageData,
    clearStorageData,
  };
}
