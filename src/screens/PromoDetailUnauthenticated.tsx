import { useNavigation } from "@react-navigation/native";
import { useEffect } from "react";
import { useToast } from "native-base";

import { PromoDetailScreen } from "@components/PromoDetailScreen";
import { AuthNavigatorRoutesProps } from "@routes/auth.routes";
import { useOffers } from "@hooks/useOffers";

export function PromoDetailUnauthenticated() {
  const navigation = useNavigation<AuthNavigatorRoutesProps>();

  const { selectedOffer, loadOffer } = useOffers();

  useEffect(() => {
    loadOffer();
  }, [selectedOffer]);

  const toast = useToast();

  const handleGoBack = () => {
    navigation.goBack();
  };

  const handleFavoring = () => {
    toast.show({
      title: "Faça seu login ou crie uma conta para salvar seus favoritos!",
      placement: "top",
      bgColor: "blue.200",
      _title: {
        color: "gray.700",
        fontSize: "md",
        fontWeight: "semibold",
        paddingX: 8,
        textAlign: "center",
      },
    });
    navigation.navigate("signIn");
  };
  return (
    <PromoDetailScreen
      onHandleGoBack={() => handleGoBack()}
      onHandleFavoring={() => handleFavoring()}
    />
  );
}
