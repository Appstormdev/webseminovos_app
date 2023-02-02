import { PromoCard } from "@components/PromoCard";
import { ScreenHeader } from "@components/ScreenHeader";
import { useNavigation } from "@react-navigation/native";
import { AppNavigatorRoutesProps } from "@routes/app.routes";
import { VStack, Box, Text, View } from "native-base";
import { useEffect, useState } from "react";
import { Container } from "@components/Container";
import { useAuth } from "@hooks/useAuth";
import { useOffers } from "@hooks/useOffers";

type IPromoProps = {
  promoId: string;
  title: string;
  description: string;
  imageUrl: string;
};

export function Favorites() {
  const navigation = useNavigation<AppNavigatorRoutesProps>();
  const { getFavoritedList, favorites: userFavoritedList } = useAuth();
  const { selectOffer, selectedOffer } = useOffers();

  const [favorites, setFavorites] = useState<IPromoProps[]>([]);

  useEffect(() => {
    setFavorites(getFavoritedList());
  }, []);

  useEffect(() => {
    setFavorites(getFavoritedList());
  }, [userFavoritedList]);

  function handleOpenPromo(promoId: string) {
    selectOffer(promoId);
    navigation.navigate("promoDetail");
  }

  useEffect(() => {
    console.log(selectedOffer);
  }, [selectedOffer]);

  return (
    <Container>
      <VStack flex={1}>
        <ScreenHeader title="Favoritos" />

        <Box
          marginX={4}
          marginY={8}
          style={
            favorites.length === 0 && { flex: 1, justifyContent: "center" }
          }
        >
          {favorites.length > 0 ? (
            favorites.map((item) => (
              <PromoCard
                imageUrl={item.imageUrl}
                title={item.title}
                description={item.description}
                key={item.promoId}
                onPress={() => handleOpenPromo(item.promoId)}
              />
            ))
          ) : (
            <View justifyContent="center" alignItems="center">
              <Text color="gray.100" textAlign="center">
                Você não possui promoções salvas.
              </Text>
            </View>
          )}
        </Box>
      </VStack>
    </Container>
  );
}
