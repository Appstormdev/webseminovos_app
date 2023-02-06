import { useStorage } from "@hooks/useStorage";
import { PERSISTENCE_STORAGE } from "./storageConfig";

export async function saveStoragePersistence(state: any) {
  const { saveStorageData } = useStorage();
  await saveStorageData({ key: PERSISTENCE_STORAGE, value: state });
}

export const getStoragePersistence = async () => {
  const { getStorageData } = useStorage();
  return await getStorageData({ key: PERSISTENCE_STORAGE });
};

export const removeStoragePersistence = async () => {
  const { removeStorageData } = useStorage();
  await removeStorageData({ key: PERSISTENCE_STORAGE });
};
