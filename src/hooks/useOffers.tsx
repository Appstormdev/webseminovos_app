import { useContext } from "react";

import { OffersContext } from "@context/OffersContext";

export function useOffers() {
  const context = useContext(OffersContext);

  return context;
}
