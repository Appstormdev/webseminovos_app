import { useNavigation } from "@react-navigation/native";
import { AuthNavigatorRoutesProps } from "@routes/auth.routes";

import { useOffers } from "@hooks/useOffers";
import { OffersScreen } from "@components/OffersScreen";

export function Offers() {
  const navigation = useNavigation<AuthNavigatorRoutesProps>();
  const { selectOffer } = useOffers();

  function handleOpenPromoCardDetail(offerId: string) {
    selectOffer(offerId);
    navigation.navigate("promoDetailUnauthenticated");
  }

  return (
    <OffersScreen
      handleOpenPromo={(promoId) => handleOpenPromoCardDetail(promoId)}
    />
  );
}
