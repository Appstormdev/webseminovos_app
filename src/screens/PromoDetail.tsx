import { useEffect, useState } from "react";
import { useNavigation } from "@react-navigation/native";

import { PromoDetailScreen } from "@components/PromoDetailScreen";
import { AppNavigatorRoutesProps } from "@routes/app.routes";
import { useOffers } from "@hooks/useOffers";
import { useAuth } from "@hooks/useAuth";

export function PromoDetail() {
  const navigation = useNavigation<AppNavigatorRoutesProps>();
  const { handleFavorited } = useAuth();
  const { selectedOffer, loadOffer, offers } = useOffers();

  useEffect(() => {
    loadOffer();
  }, [selectedOffer]);

  const handleGoBack = () => {
    navigation.goBack();
  };

  const handleFavoring = () => {
    const originalOfferData = offers.find(
      (item) => item.offer.offer_id === selectedOffer?.offer.offer_id
    );
    if (originalOfferData) handleFavorited(originalOfferData);
  };

  return (
    <PromoDetailScreen
      onHandleGoBack={() => handleGoBack()}
      onHandleFavoring={() => handleFavoring()}
    />
  );
}
