import {
  VStack,
  Box,
  ScrollView,
  Image,
  AspectRatio,
  Heading,
  Text,
} from "native-base";
import Container from "@components/Container";

import { HomeHeader } from "@components/HomeHeader";
import { PromoCard } from "@components/PromoCard";
import { useState } from "react";
import { useNavigation } from "@react-navigation/native";
import { AppNavigatorRoutesProps } from "@routes/app.routes";

import CoverCar from "../assets/cover_car.png";
import { Dimensions } from "react-native";
import { Input } from "@components/Input";
import { Button } from "@components/Button";
import { ScreenHeader } from "@components/ScreenHeader";
import { ScreenHeaderAuth } from "@components/ScreenHeaderAuth";

type IPromoProps = {
  promoId: string;
  title: string;
  description: string;
  imageUrl: string;
};

export function Offers() {
  const [promos, setPromos] = useState<IPromoProps[]>([
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
    {
      promoId: "3",
      title: "Chevrolet Onix 2017",
      description: "Chevrolet Onyx 2017 1.0 Joy SPE/4",
      imageUrl:
        "https://images.unsplash.com/photo-1503376780353-7e6692767b70?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80",
    },
    {
      promoId: "4",
      title: "Chevrolet Onix 2017",
      description: "Chevrolet Onyx 2017 1.0 Joy SPE/4",
      imageUrl:
        "https://images.unsplash.com/photo-1503376780353-7e6692767b70?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80",
    },
  ]);

  const [newSearch, setNewSearch] = useState<string>();

  const navigation = useNavigation<AppNavigatorRoutesProps>();

  function handleOpenPromoCardDetail() {
    navigation.navigate("promoDetail");
  }

  return (
    <Container hasHeader>
      <VStack flex={1}>
        <ScreenHeaderAuth title="Ofertas" />

        <ScrollView mt={6}>
          <Image
            w="full"
            h="236px"
            source={CoverCar}
            resizeMode="cover"
            alt="Imagem de uma ferrari"
          />

          <Box mx={4}>
            <Input
              placeholder="digite o modelo ou marca do veículo...."
              autoCapitalize="none"
              variant="outline"
              type="text"
              onChangeText={(value) => setNewSearch(value)}
            />
            <Button title="Procurar ofertas" />
          </Box>

          <VStack flex={1} mx={4} mb={8} mt={8}>
            <Heading color="gray.100" size="sm">
              Ofertas localizadas
            </Heading>
            {promos.length > 0 && (
              <Text color="gray.300" fontSize="xs">
                Selecione uma oferta para mais detalhes
              </Text>
            )}
            <Box
              mt={2}
              style={
                promos.length === 0 && {
                  flex: 1,
                  height: 120,
                  justifyContent: "center",
                }
              }
            >
              {promos.length > 0 ? (
                promos.map((item) => (
                  <PromoCard
                    imageUrl={item.imageUrl}
                    title={item.title}
                    description={item.description}
                    key={item.promoId}
                    onPress={handleOpenPromoCardDetail}
                  />
                ))
              ) : (
                <Box justifyContent="center" alignItems="center">
                  <Text color="gray.300" textAlign="center">
                    Nenhuma oferta localizada. {`\n`}
                    Realize uma nova busca.
                  </Text>
                </Box>
              )}
            </Box>
          </VStack>
        </ScrollView>
      </VStack>
    </Container>
  );
}
