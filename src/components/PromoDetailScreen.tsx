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

interface PromoDetailProps {
  onHandleGoBack: () => void;
  onHandleFavoring: () => void;
}

export function PromoDetailScreen({
  onHandleGoBack,
  onHandleFavoring,
}: PromoDetailProps) {
  const { thisOfferIsFavorited } = useAuth();
  const { offer: item } = useOffers();
  const { colors } = useTheme();

  return (
    <Container>
      <VStack px={8} bg="blue.500" pt={12}>
        <HStack justifyContent="space-between" mb={2}>
          <TouchableOpacity onPress={onHandleGoBack}>
            <Icon as={Feather} name="arrow-left" color="gray.100" size={6} />
          </TouchableOpacity>

          <Heading color="gray.100" fontSize="md" fontFamily="heading">
            {item.company.companyName}
          </Heading>
        </HStack>

        <HStack justifyContent="space-between" alignItems="center" mb={2}>
          <Image
            source={{
              uri: item.company.companyLogo.replace("localhost", "192.168.0.5"),
            }}
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
              {item.company.companyFullAddress}
            </Text>
          </VStack>
        </HStack>
      </VStack>

      <ScrollView>
        <VStack p={8}>
          <Box rounded="md" overflow="hidden" shadow={2}>
            <AspectRatio w="100%" ratio={16 / 9}>
              <Image
                source={{
                  uri: item.offer.offerImage.replace(
                    "localhost",
                    "192.168.0.5"
                  ),
                }}
                fallbackElement={<NotFoundedCarImageCover />}
                alt="Imagem do carro em oferta"
                rounded="lg"
                resizeMode="cover"
              />
            </AspectRatio>
          </Box>
          <Box bg="gray.100" mt={6} rounded="md" p={4}>
            <PromoCardDetailHeader
              brand={item.offer.offerBrand || ""}
              model={item.offer.offerModel || ""}
              favorited={thisOfferIsFavorited(item.offer.offerId)}
              setFavorited={onHandleFavoring}
            />
            <PromoCardDetailDescription
              description={item.offer.offerDescription}
            />

            <Box mt={4}>
              <Heading
                color="blue.400"
                fontWeight="black"
                fontFamily="heading"
                fontSize={item.offer.offerPrice ? "3xl" : "lg"}
              >
                {item.offer.offerPrice !== ""
                  ? formatPrice(item.offer.offerPrice)
                  : "Consulte nosso atendentes"}
              </Heading>
            </Box>

            <Box>
              <Heading size="sm" color="blue.400" mt={4} fontFamily="heading">
                Caracter??sticas principais
              </Heading>
              <VStack mt={2}>
                <PromoCardDetailTechnicalFeaturesField
                  label="Modelo:"
                  value={item.offer.offerModel || "-"}
                />
                <PromoCardDetailTechnicalFeaturesField
                  label="Marca:"
                  value={item.offer.offerBrand || "-"}
                />
                <PromoCardDetailTechnicalFeaturesField
                  label="Ano:"
                  value={item.offer.offerYear || "-"}
                />
                <PromoCardDetailTechnicalFeaturesField
                  label="Motoriza????o:"
                  value={item.offer.offerEngine || "-"}
                />
                <PromoCardDetailTechnicalFeaturesField
                  label="Tipo de comb??stivel:"
                  value={item.offer.offerFuelType || "-"}
                />
                <PromoCardDetailTechnicalFeaturesField
                  label="Quil??metros:"
                  value={item.offer.offerMileage || "-"}
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
                carId: item.offer.offerId || "",
                carTitle: item.offer.offerTitle || "",
                businessWhatsappNumber: item.company.companyWhatsappPhone || "",
              })
            }
            mt={4}
          />
        </VStack>
      </ScrollView>
    </Container>
  );
}
