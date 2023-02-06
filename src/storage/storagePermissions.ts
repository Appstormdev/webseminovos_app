import { useStorage } from "@hooks/useStorage";
import { PERMISSION_STORAGE } from "./storageConfig";

export const saveStorePermissions = async (permissions: string[]) => {
  const { saveStorageData } = useStorage();
  await saveStorageData({ key: PERMISSION_STORAGE, value: permissions });
};

export const getStoreAuthToken = async () => {
  const { getStorageData } = useStorage();
  return await getStorageData({ key: PERMISSION_STORAGE });
};

export const removeStoreAuthToken = async () => {
  const { removeStorageData } = useStorage();
  await removeStorageData({ key: PERMISSION_STORAGE });
};
