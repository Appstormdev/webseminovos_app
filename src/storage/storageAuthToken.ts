import { useStorage } from "@hooks/useStorage";
import { AUTH_TOKEN_STORAGE } from "./storageConfig";

export async function saveStoreAuthToken(userToken: string) {
  const { saveStorageData } = useStorage();
  await saveStorageData({
    key: AUTH_TOKEN_STORAGE,
    value: userToken,
    isStringValue: true,
  });
}

export const getStoreAuthToken = async () => {
  const { getStorageData } = useStorage();
  return await getStorageData({ key: AUTH_TOKEN_STORAGE, isStringValue: true });
};

export const removeStoreAuthToken = async () => {
  const { removeStorageData } = useStorage();
  await removeStorageData({ key: AUTH_TOKEN_STORAGE });
};
