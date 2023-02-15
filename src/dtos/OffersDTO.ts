export type IOffersDTO = {
  company: ICompanyDTO;
  offer: IOfferDTO;
};

type ICompanyDTO = {
  company_id: string;
  company_name: string;
  company_number: string;
  company_neighbour: string;
  company_complement: string;
  company_identification: number;
  company_country: string;
  company_city: string;
  company_state: string;
  company_phone: string;
  company_responsible_name: string;
  company_responsible_email: string;
  company_segment: string;
  company_segment_description: string;
  company_address: string;
  company_zip_code: string;
  company_avatar: string;
  company_zap: string;
};

type IOfferDTO = {
  offer_id: string;
  offer_status: string;
  offer_titulo: string;
  offer_descricao: string;
  offer_cupom: string;
  offer_data_cadastro: string;
  offer_data_inicio: string;
  offer_data_fim: string;
  offer_beacon: string;
  offer_dias_semana: string;
  offer_acessos: number;
  offer_imagem: string;
  offer_marca: string;
  offer_modelo: string;
  offer_ano: string;
  offer_motorizacao: string;
  offer_combustivel: string;
  offer_km: string;
  offer_preco: string;
};
