import AsyncStorage from "@react-native-async-storage/async-storage";
import { USER_TOKEN_STORAGE } from "./storageConfig";

export const storeUserToken = async (userToken: string) => {
  try {
    await AsyncStorage.setItem(USER_TOKEN_STORAGE, userToken);
  } catch (error) {
    // saving error
  }
};

export const getUserToken = async () => {
  try {
    const jsonValue = await AsyncStorage.getItem(USER_TOKEN_STORAGE);

    if (jsonValue !== null) {
      return jsonValue;
    }

    return;
  } catch (error) {
    // error reading value
  }
};
