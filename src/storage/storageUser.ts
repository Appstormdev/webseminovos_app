import { IUserLoggedInfo } from "@context/AuthContext";
import { useStorage } from "@hooks/useStorage";
import { USER_STORAGE } from "./storageConfig";

export const saveStorageUser = async (user: IUserLoggedInfo) => {
  const { saveStorageData } = useStorage();
  await saveStorageData({ key: USER_STORAGE, value: user });
};

export const getStorageUser = async () => {
  const { getStorageData } = useStorage();
  return await getStorageData({ key: USER_STORAGE });
};

export const removeStorageUser = async () => {
  const { removeStorageData } = useStorage();
  await removeStorageData({ key: USER_STORAGE });
};
