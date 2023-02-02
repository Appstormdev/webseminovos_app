import { createContext, ReactNode, useEffect, useState } from "react";

import { OffersDTO } from "@dtos/OffersDTO";
import { api } from "@services/api";
import { getOffers, storeOffers } from "@storage/storageOffers";
import { getFullAddress } from "@utils/addressTools";

export type OffersContextDataProps = {
  offers: OffersDTO[];
  selectedOffer: OffersDTO | null;
  offer: OfferType | null;
  fetchSearchOffers: (term: string) => Promise<void>;
  selectOffer: (offerId: string) => void;
  loadOffer: () => void;
};

type OffersContextProviderProps = {
  children: ReactNode;
};

type OfferType = {
  businessName: string;
  businessLogo: string;
  businessFullAddress: string;
  businessWhatsappNumber: string;
  carId: string;
  carTitle: string;
  carImage: string;
  carBrand: string;
  carModel: string;
  carDescription: string;
  carPrice: string;
  carYear: string;
  carEngine: string;
  carFuelType: string;
  carMileage: string;
};

export const OffersContext = createContext<OffersContextDataProps>(
  {} as OffersContextDataProps
);

export function OffersContextProvider({
  children,
}: OffersContextProviderProps) {
  const [offers, setOffers] = useState<OffersDTO[]>([]);
  const [offer, setOffer] = useState<OfferType | null>(null);
  const [selectedOffer, setSelectedOffer] = useState<OffersDTO | null>(null);

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

  function selectOffer(offerId: string) {
    const offer = offers.find((offer) => offer.id === offerId);

    if (offer) setSelectedOffer(offer);
    console.log("SELECTED:", offer);
  }

  function loadOffer() {
    if (selectedOffer) {
      const businessFullAddress = getFullAddress(selectedOffer);

      const promo: OfferType = {
        businessName: selectedOffer.name,
        businessLogo: selectedOffer.avatar,
        businessFullAddress,
        businessWhatsappNumber: selectedOffer.phone,
        carId: selectedOffer.id,
        carTitle: selectedOffer.titulo_oferta,
        carImage: selectedOffer.imagem_oferta,
        carBrand: selectedOffer.marca_oferta,
        carModel: selectedOffer.modelo_oferta,
        carDescription: selectedOffer.descricao_oferta,
        carPrice: selectedOffer.preco_oferta,
        carYear: selectedOffer.ano_oferta,
        carEngine: selectedOffer.motorizacao_oferta,
        carFuelType: selectedOffer.combustivel_oferta,
        carMileage: selectedOffer.km_oferta,
      };

      setOffer(promo);
    }
  }

  return (
    <OffersContext.Provider
      value={{
        offers,
        selectedOffer,
        offer,
        loadOffer,
        fetchSearchOffers,
        selectOffer,
      }}
    >
      {children}
    </OffersContext.Provider>
  );
}
