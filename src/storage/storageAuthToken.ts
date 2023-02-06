import { useStorage } from "@hooks/useStorage";
import { AUTH_TOKEN_STORAGE } from "./storageConfig";

export async function saveStorageAuthToken(userToken: string) {
  const { saveStorageData } = useStorage();
  await saveStorageData({
    key: AUTH_TOKEN_STORAGE,
    value: userToken,
    isStringValue: true,
  });
}

export const getStorageAuthToken = async () => {
  const { getStorageData } = useStorage();
  return await getStorageData({ key: AUTH_TOKEN_STORAGE, isStringValue: true });
};

export const removeStorageAuthToken = async () => {
  const { removeStorageData } = useStorage();
  await removeStorageData({ key: AUTH_TOKEN_STORAGE });
};
