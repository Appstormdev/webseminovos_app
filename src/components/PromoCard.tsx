import {
  Heading,
  HStack,
  Icon,
  Image,
  Text,
  useTheme,
  VStack,
} from "native-base";
import { TouchableOpacity, TouchableOpacityProps } from "react-native";
import { Entypo } from "@expo/vector-icons";

interface PromoCardProps extends TouchableOpacityProps {
  title: string;
  description: string;
  imageUrl: string;
}

export function PromoCard({
  title,
  description,
  imageUrl,
  ...props
}: PromoCardProps) {
  const { colors } = useTheme();
  return (
    <TouchableOpacity {...props}>
      <HStack bg="blue.50" alignItems="center" p={1} pr={4} rounded="md" mb={3}>
        <Image
          source={{
            uri: `${imageUrl}`,
          }}
          alt="Imagem de capa da promoção"
          w={16}
          h={16}
          rounded="md"
          mr={4}
          resizeMode="cover"
        />
        <VStack flex={1}>
          <Heading fontSize="lg">{title}</Heading>
          <Text mt={1} numberOfLines={2}>
            {description}
          </Text>
        </VStack>

        <Icon as={Entypo} name="chevron-thin-right" />
      </HStack>
    </TouchableOpacity>
  );
}
