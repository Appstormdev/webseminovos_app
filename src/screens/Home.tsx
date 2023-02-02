import { useNavigation } from "@react-navigation/native";
import { AppNavigatorRoutesProps } from "@routes/app.routes";

import { useOffers } from "@hooks/useOffers";
import { OffersScreen } from "@components/OffersScreen";

export function Home() {
  const navigation = useNavigation<AppNavigatorRoutesProps>();
  const { selectOffer } = useOffers();

  function handleOpenPromoCardDetail(offerId: string) {
    selectOffer(offerId);
    navigation.navigate("promoDetail");
  }

  return (
    <OffersScreen
      handleOpenPromo={(promoId) => handleOpenPromoCardDetail(promoId)}
    />
  );
}
