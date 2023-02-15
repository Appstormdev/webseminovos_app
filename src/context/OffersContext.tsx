import { createContext, ReactNode, useState } from "react";

import { IOffersDTO } from "@dtos/OffersDTO";
import { api } from "@services/api";
import { getStorageOffers, saveStorageOffers } from "@storage/storageOffers";
import { getFullAddress } from "@utils/addressTools";

export type OffersContextDataProps = {
  offers: IOffersDTO[];
  selectedOffer: IOffersDTO;
  offer: OfferType;
  fetchSearchOffers: (term: string) => Promise<void>;
  selectOffer: (offerId: string) => void;
  loadOffer: () => void;
};

type OffersContextProviderProps = {
  children: ReactNode;
};

type OfferType = {
  company: {
    companyName: string;
    companyLogo: string;
    companyFullAddress: string;
    companyWhatsappPhone: string;
    companyPhone: string;
  };
  offer: {
    offerId: string;
    offerTitle: string;
    offerImage: string;
    offerBrand: string;
    offerModel: string;
    offerDescription: string;
    offerPrice: string;
    offerYear: string;
    offerEngine: string;
    offerFuelType: string;
    offerMileage: string;
  };
};

const initialOfferState = {
  company: {
    companyName: "",
    companyLogo: "",
    companyFullAddress: "",
    companyWhatsappPhone: "",
    companyPhone: "",
  },
  offer: {
    offerId: "",
    offerTitle: "",
    offerImage: "",
    offerBrand: "",
    offerModel: "",
    offerDescription: "",
    offerPrice: "",
    offerYear: "",
    offerEngine: "",
    offerFuelType: "",
    offerMileage: "",
  },
};

const initialSelectedOfferState = {
  company: {
    company_id: "",
    company_name: "",
    company_number: "",
    company_neighbour: "",
    company_complement: "",
    company_identification: 0,
    company_country: "",
    company_city: "",
    company_state: "",
    company_phone: "",
    company_responsible_name: "",
    company_responsible_email: "",
    company_segment: "",
    company_segment_description: "",
    company_address: "",
    company_zip_code: "",
    company_avatar: "",
    company_zap: "",
  },
  offer: {
    offer_id: "",
    offer_status: "",
    offer_titulo: "",
    offer_descricao: "",
    offer_cupom: "",
    offer_data_cadastro: "",
    offer_data_inicio: "",
    offer_data_fim: "",
    offer_beacon: "",
    offer_dias_semana: "",
    offer_acessos: 0,
    offer_imagem: "",
    offer_marca: "",
    offer_modelo: "",
    offer_ano: "",
    offer_motorizacao: "",
    offer_combustivel: "",
    offer_km: "",
    offer_preco: "",
  },
};

export const OffersContext = createContext<OffersContextDataProps>(
  {} as OffersContextDataProps
);

export function OffersContextProvider({
  children,
}: OffersContextProviderProps) {
  const [offers, setOffers] = useState<IOffersDTO[]>([]);
  const [offer, setOffer] = useState<OfferType>(initialOfferState);

  const [selectedOffer, setSelectedOffer] = useState<IOffersDTO>(
    initialSelectedOfferState
  );

  async function fetchSearchOffers(term: string) {
    try {
      const response = await api.get(`company/all_by_marca?title=${term}`);

      const { data } = response?.data;

      setOffers(data);
      saveStorageOffers(data);
    } catch (error) {
      console.error(error);
    }
  }

  async function loadOffers() {
    try {
      const offers = await getStorageOffers();

      if (offers) {
        setOffers(offers);
      }
    } catch (error) {}
  }

  function selectOffer(offerId: string) {
    const offer = offers.find((item) => item.offer.offer_id === offerId);

    if (offer) setSelectedOffer(offer);
  }

  function loadOffer() {
    if (selectedOffer) {
      const companyFullAddress = getFullAddress(selectedOffer);

      const promo: OfferType = {
        company: {
          companyName: selectedOffer.company.company_name,
          companyLogo: selectedOffer.company.company_avatar,
          companyFullAddress,
          companyWhatsappPhone: selectedOffer.company.company_zap,
          companyPhone: selectedOffer.company.company_phone,
        },
        offer: {
          offerId: selectedOffer.offer.offer_id,
          offerTitle: selectedOffer.offer.offer_titulo,
          offerImage: selectedOffer.offer.offer_imagem,
          offerBrand: selectedOffer.offer.offer_marca,
          offerModel: selectedOffer.offer.offer_modelo,
          offerDescription: selectedOffer.offer.offer_descricao,
          offerPrice: selectedOffer.offer.offer_preco,
          offerYear: selectedOffer.offer.offer_ano,
          offerEngine: selectedOffer.offer.offer_motorizacao,
          offerFuelType: selectedOffer.offer.offer_combustivel,
          offerMileage: selectedOffer.offer.offer_km,
        },
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
