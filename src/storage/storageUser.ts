import { UserProps } from "@context/AuthContext";
import { useStorage } from "@hooks/useStorage";
import { USER_STORAGE } from "./storageConfig";

export const saveStoreUser = async (user: UserProps) => {
  const { saveStorageData } = useStorage();
  await saveStorageData({ key: USER_STORAGE, value: user });
};

export const getStoreUser = async () => {
  const { getStorageData } = useStorage();
  return await getStorageData({ key: USER_STORAGE });
};

export const removeStoreUser = async () => {
  const { removeStorageData } = useStorage();
  await removeStorageData({ key: USER_STORAGE });
};
