import { UserProps } from "@context/AuthContext";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { AUTH_TOKEN_STORAGE } from "./storageConfig";

export const saveStoreAuthToken = async (userToken: string) => {
  try {
    await AsyncStorage.setItem(AUTH_TOKEN_STORAGE, userToken);
  } catch (error) {
    // saving error
  }
};

export const getStoreAuthToken = async () => {
  try {
    const jsonValue = await AsyncStorage.getItem(AUTH_TOKEN_STORAGE);

    if (jsonValue !== null) {
      return jsonValue;
    }

    return;
  } catch (error) {
    // saving error reading value
  }
};

export const removeStoreAuthToken = async () => {
  await AsyncStorage.removeItem(AUTH_TOKEN_STORAGE);
};
