import { PromoCard } from "@components/PromoCard";
import { ScreenHeader } from "@components/ScreenHeader";
import { VStack, Box, Text, View } from "native-base";
import { useState } from "react";
import Container from "../components/Container";

type IPromoProps = {
  promoId: string;
  title: string;
  description: string;
  imageUrl: string;
};

export function Favorites() {
  // const [favorites, setFavorites] = useState<IPromoProps[]>([]);
  const [favorites, setFavorites] = useState<IPromoProps[]>([
    {
      promoId: "0",
      title: "Chevrolet Onix 2017",
      description: "Chevrolet Onyx 2017 1.0 Joy SPE/4",
      imageUrl:
        "https://images.unsplash.com/photo-1503376780353-7e6692767b70?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80",
    },
    {
      promoId: "1",
      title: "Chevrolet Onix 2017",
      description: "Chevrolet Onyx 2017 1.0 Joy SPE/4",
      imageUrl:
        "https://images.unsplash.com/photo-1503376780353-7e6692767b70?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80",
    },
    {
      promoId: "2",
      title: "Chevrolet Onix 2017",
      description: "Chevrolet Onyx 2017 1.0 Joy SPE/4",
      imageUrl:
        "https://images.unsplash.com/photo-1503376780353-7e6692767b70?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80",
    },
  ]);

  return (
    <Container hasHeader>
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
