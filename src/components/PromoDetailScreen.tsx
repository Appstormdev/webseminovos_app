import { callChatWhatsapp } from "@utils/callChatWhatsapp";
import { formatPrice } from "@utils/pricesTools";
import {
  AspectRatio,
  Box,
  Heading,
  HStack,
  Icon,
  Image,
  ScrollView,
  Text,
  useTheme,
  VStack,
} from "native-base";
import { TouchableOpacity } from "react-native";
import { Button } from "./Button";
import { Container } from "./Container";
import { NotFoundedCarImageCover } from "./NotFoundedCarImageCover";
import { NotFoundedLogo } from "./NotFoundedLogo";
import { PromoCardDetailDescription } from "./PromoCardDetailDescription";
import { PromoCardDetailHeader } from "./PromoCardDetailHeader";
import { PromoCardDetailTechnicalFeaturesField } from "./PromoCardDetailTechnicalFeaturesField";
import { Feather, FontAwesome } from "@expo/vector-icons";
import { useOffers } from "@hooks/useOffers";
import { useAuth } from "@hooks/useAuth";
import { useEffect, useState } from "react";

interface PromoDetailProps {
  onHandleGoBack: () => void;
  onHandleFavoring: () => void;
}

export function PromoDetailScreen({
  onHandleGoBack,
  onHandleFavoring,
}: PromoDetailProps) {
  const { thisOfferIsFavorited } = useAuth();
  const { offer } = useOffers();
  const { colors } = useTheme();

  return (
    <Container>
      <VStack px={8} bg="blue.500" pt={12}>
        <HStack justifyContent="space-between" mb={2}>
          <TouchableOpacity onPress={onHandleGoBack}>
            <Icon as={Feather} name="arrow-left" color="gray.100" size={6} />
          </TouchableOpacity>

          <Heading color="gray.100" fontSize="md" fontFamily="heading">
            {offer.businessName}
          </Heading>
        </HStack>

        <HStack justifyContent="space-between" alignItems="center" mb={2}>
          <Image
            source={{ uri: offer.businessLogo }}
            fallbackElement={<NotFoundedLogo />}
            alt="Imagem da logo da empresa"
            w="96px"
            h="64px"
            rounded="md"
            borderColor="gray.100"
            borderWidth={2}
            resizeMode="cover"
            mr={4}
            mb={2}
          />
          <VStack flex={1} mb={2}>
            <Text color="gray.100" fontSize="2xs">
              {offer.businessFullAddress}
            </Text>
          </VStack>
        </HStack>
      </VStack>

      <ScrollView>
        <VStack p={8}>
          <Box rounded="md" overflow="hidden" shadow={2}>
            <AspectRatio w="100%" ratio={16 / 9}>
              <Image
                source={{ uri: offer.carImage }}
                fallbackElement={<NotFoundedCarImageCover />}
                alt="Imagem do carro em oferta"
                rounded="lg"
                resizeMode="cover"
              />
            </AspectRatio>
          </Box>
          <Box bg="gray.100" mt={6} rounded="md" p={4}>
            <PromoCardDetailHeader
              brand={offer.carBrand || ""}
              model={offer.carModel || ""}
              favorited={thisOfferIsFavorited(offer.carId)}
              setFavorited={onHandleFavoring}
            />
            <PromoCardDetailDescription description={offer.carDescription} />

            <Box mt={4}>
              <Heading
                color="blue.400"
                fontWeight="black"
                fontFamily="heading"
                fontSize={offer.carPrice ? "3xl" : "lg"}
              >
                {offer.carPrice !== ""
                  ? formatPrice(offer.carPrice)
                  : "Consulte nosso atendentes"}
              </Heading>
            </Box>

            <Box>
              <Heading size="sm" color="blue.400" mt={4} fontFamily="heading">
                Características principais
              </Heading>
              <VStack mt={2}>
                <PromoCardDetailTechnicalFeaturesField
                  label="Modelo:"
                  value={offer.carModel || "-"}
                />
                <PromoCardDetailTechnicalFeaturesField
                  label="Marca:"
                  value={offer.carBrand || "-"}
                />
                <PromoCardDetailTechnicalFeaturesField
                  label="Ano:"
                  value={offer.carYear || "-"}
                />
                <PromoCardDetailTechnicalFeaturesField
                  label="Motorização:"
                  value={offer.carEngine || "-"}
                />
                <PromoCardDetailTechnicalFeaturesField
                  label="Tipo de combústivel:"
                  value={offer.carFuelType || "-"}
                />
                <PromoCardDetailTechnicalFeaturesField
                  label="Quilômetros:"
                  value={offer.carMileage || "-"}
                />
              </VStack>
            </Box>
          </Box>
          <Button
            title="CHAMAR NO WHATSAPP"
            bg="green.700"
            endIcon={<Icon as={FontAwesome} name="whatsapp" size={6} />}
            _icon={{
              marginLeft: 8,
            }}
            _pressed={{
              backgroundColor: colors.green[600],
            }}
            onPress={() =>
              callChatWhatsapp({
                carId: offer.carId || "",
                carTitle: offer.carTitle || "",
                businessWhatsappNumber: offer.businessWhatsappNumber || "",
              })
            }
            mt={4}
          />
        </VStack>
      </ScrollView>
    </Container>
  );
}
