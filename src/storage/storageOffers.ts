import { OffersDTO } from "@dtos/OffersDTO";
import { useStorage } from "@hooks/useStorage";

import { OFFERS_STORAGE } from "./storageConfig";

export async function storeOffers(offers: OffersDTO[]) {
  const { saveStorageData } = useStorage();
  await saveStorageData({ key: OFFERS_STORAGE, value: offers });
}

export async function getOffers() {
  const { getStorageData } = useStorage();
  return await getStorageData({ key: OFFERS_STORAGE });
}

export async function removeOffers() {
  const { removeStorageData } = useStorage();
  await removeStorageData({ key: OFFERS_STORAGE });
}
