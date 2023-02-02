import { VStack, Box, ScrollView, Image, Heading, Text } from "native-base";
import { Container } from "@components/Container";

import { HomeHeader } from "@components/HomeHeader";
import { PromoCard } from "@components/PromoCard";
import { useEffect, useState } from "react";
import { useNavigation } from "@react-navigation/native";
import { AppNavigatorRoutesProps } from "@routes/app.routes";

import CoverCar from "../assets/cover_car.png";
import { Input } from "@components/Input";
import { Button } from "@components/Button";
import { useOffers } from "@hooks/useOffers";
import { useAuth } from "@hooks/useAuth";
import { ScreenHeaderAuth } from "./ScreenHeaderAuth";

type IPromoProps = {
  promoId: string;
  title: string;
  description: string;
  imageUrl: string;
};

interface OffersScreenProps {
  handleOpenPromo: (promoId: string) => void;
}

export function OffersScreen({ handleOpenPromo }: OffersScreenProps) {
  const { offers, fetchSearchOffers } = useOffers();
  const { userToken } = useAuth();

  const [newSearch, setNewSearch] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [promos, setPromos] = useState<IPromoProps[]>([]);

  function loadOffers() {
    if (offers) {
      const auxPromos = offers.map((offer) => {
        const promo: IPromoProps = {
          title: offer.titulo_oferta,
          description: offer.descricao_oferta,
          promoId: offer.id,
          imageUrl: offer.imagem_oferta,
        };

        return promo;
      });

      setPromos(auxPromos);
    }
  }

  useEffect(() => {
    loadOffers();
  }, [offers]);

  const handleSearchOffers = () => {
    try {
      setIsLoading(true);
      fetchSearchOffers(newSearch);
    } catch (error) {
      //todo
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Container>
      <VStack flex={1}>
        {userToken ? <HomeHeader /> : <ScreenHeaderAuth />}
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

            <Button
              title="Buscar ofertas"
              onPress={() => handleSearchOffers()}
              disabled={isLoading}
              isLoading={isLoading}
            />
          </Box>

          <VStack flex={1} mx={4} mb={8} mt={8}>
            <Heading color="gray.100" size="sm" fontFamily="heading">
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
                    onPress={() => handleOpenPromo(item.promoId)}
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
