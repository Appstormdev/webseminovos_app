import { OffersDTO } from "@dtos/OffersDTO";
import { useStorage } from "@hooks/useStorage";

import { OFFERS_STORAGE } from "./storageConfig";

export async function saveStorageOffers(offers: OffersDTO[]) {
  const { saveStorageData } = useStorage();
  await saveStorageData({ key: OFFERS_STORAGE, value: offers });
}

export async function getStorageOffers() {
  const { getStorageData } = useStorage();
  return await getStorageData({ key: OFFERS_STORAGE });
}

export async function removeStorageOffers() {
  const { removeStorageData } = useStorage();
  await removeStorageData({ key: OFFERS_STORAGE });
}
