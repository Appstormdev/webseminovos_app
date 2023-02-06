import { useStorage } from "@hooks/useStorage";
import { PERMISSION_STORAGE } from "./storageConfig";

export const saveStoragePermissions = async (permissions: string[]) => {
  const { saveStorageData } = useStorage();
  await saveStorageData({ key: PERMISSION_STORAGE, value: permissions });
};

export const getStoragePermissions = async () => {
  const { getStorageData } = useStorage();
  return await getStorageData({ key: PERMISSION_STORAGE });
};

export const removeStoragePermissions = async () => {
  const { removeStorageData } = useStorage();
  await removeStorageData({ key: PERMISSION_STORAGE });
};
