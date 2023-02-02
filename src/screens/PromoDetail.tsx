import { useEffect } from "react";
import { useNavigation } from "@react-navigation/native";

import { PromoDetailScreen } from "@components/PromoDetailScreen";
import { AppNavigatorRoutesProps } from "@routes/app.routes";
import { useOffers } from "@hooks/useOffers";

export function PromoDetail() {
  const navigation = useNavigation<AppNavigatorRoutesProps>();
  const { selectedOffer, loadOffer, offer } = useOffers();

  useEffect(() => {
    loadOffer();
  }, [selectedOffer]);

  const handleGoBack = () => {
    navigation.goBack();
  };

  const handleFavoring = () => {
    console.info("Fazer");
  };

  return (
    <PromoDetailScreen
      onHandleGoBack={() => handleGoBack()}
      onHandleFavoring={() => handleFavoring()}
    />
  );
}
