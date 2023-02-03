import { UserProps } from "@context/AuthContext";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { USER_STORAGE } from "./storageConfig";

export const saveStoreUser = async (user: UserProps) => {
  try {
    const jsonUser = JSON.stringify(user);
    await AsyncStorage.setItem(USER_STORAGE, jsonUser);
  } catch (error) {
    // saving error
  }
};

export const getStoreUser = async () => {
  try {
    const jsonUser = await AsyncStorage.getItem(USER_STORAGE);
    return jsonUser !== null ? JSON.parse(jsonUser) : null;
  } catch (error) {
    // error reading value
  }
};

export const removeStoreUser = async () => {
  await AsyncStorage.removeItem(USER_STORAGE);
};
