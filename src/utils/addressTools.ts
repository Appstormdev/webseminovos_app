import { OffersDTO } from "@dtos/OffersDTO";

export const getFullAddress = (offer: OffersDTO) => {
  const { address, number, complement, neighbour, zip_code, city, state } =
    offer;

  const firstLine = `${address}, ${number ? number : "(S/N)"}${
    complement && `, ${complement}`
  } - bairro ${neighbour}.`;
  const secondLine = `CEP: ${zip_code}. ${city}/${state}`;

  const fullAddress = `${firstLine} ${secondLine}`;

  return fullAddress;
};
