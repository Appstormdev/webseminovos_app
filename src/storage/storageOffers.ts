import { OffersDTO } from "@dtos/OffersDTO";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { OFFERS_STORAGE } from "./storageConfig";

export const storeOffers = async (offers: OffersDTO[]) => {
  const jsonOffers = JSON.stringify(offers);
  try {
    await AsyncStorage.setItem(OFFERS_STORAGE, jsonOffers);
  } catch (error) {
    // saving error
  }
};

export const getOffers = async () => {
  try {
    const jsonValue = await AsyncStorage.getItem(OFFERS_STORAGE);

    if (jsonValue !== null) {
      return JSON.parse(jsonValue);
    }

    return;
  } catch (error) {
    // error reading value
  }
};
