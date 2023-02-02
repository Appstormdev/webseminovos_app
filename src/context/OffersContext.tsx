import { createContext, ReactNode, useEffect, useState } from "react";

import { OffersDTO } from "@dtos/OffersDTO";
import { api } from "@services/api";
import { getOffers, storeOffers } from "@storage/storageOffers";

export type OffersContextDataProps = {
  offers: OffersDTO[];
  fetchSearchOffers: (term: string) => Promise<void>;
};

type OffersContextProviderProps = {
  children: ReactNode;
};

export const OffersContext = createContext<OffersContextDataProps>(
  {} as OffersContextDataProps
);

export function OffersContextProvider({
  children,
}: OffersContextProviderProps) {
  const [offers, setOffers] = useState<OffersDTO[]>([]);

  async function fetchSearchOffers(term: string) {
    try {
      const response = await api.get(`/company/all_by_marca?title=${term}`);

      const { data } = response?.data;

      setOffers(data);
      storeOffers(data);
    } catch (error) {}
  }

  async function loadOffers() {
    try {
      const offers = await getOffers();

      if (offers) {
        setOffers(offers);
      }
    } catch (error) {}
  }

  useEffect(() => {
    loadOffers();
  }, []);

  return (
    <OffersContext.Provider
      value={{
        offers,
        fetchSearchOffers,
      }}
    >
      {children}
    </OffersContext.Provider>
  );
}
