import { IOffersDTO } from "@dtos/OffersDTO";

export const getFullAddress = (offer: IOffersDTO) => {
  const { company } = offer;
  const {
    company_address,
    company_number,
    company_complement,
    company_neighbour,
    company_zip_code,
    company_city,
    company_state,
  } = company;

  const firstLine = `${company_address}, ${
    company_number ? company_number : "(S/N)"
  }${
    company_complement && `, ${company_complement}`
  } - bairro ${company_neighbour}.`;
  const secondLine = `CEP: ${company_zip_code}. ${company_city}/${company_state}`;

  const fullAddress = `${firstLine} ${secondLine}`;

  return fullAddress;
};
