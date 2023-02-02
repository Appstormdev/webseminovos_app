import { Center, Image, VStack, Text, Box, useTheme } from "native-base";
import { Container } from "@components/Container";

import Logo from "@assets/wsn_logo.png";
import { Input } from "@components/Input";
import { Button } from "@components/Button";
import { useState } from "react";
import { useNavigation } from "@react-navigation/native";
import { AuthNavigatorRoutesProps } from "@routes/auth.routes";
import { useOffers } from "@hooks/useOffers";

export function Welcome() {
  const navigation = useNavigation<AuthNavigatorRoutesProps>();
  const { fetchSearchOffers } = useOffers();
  const { colors } = useTheme();
  const [newSearch, setNewSearch] = useState<string>("");

  const handleSearchOffers = () => {
    fetchSearchOffers(newSearch);
    navigation.navigate("offers");
  };

  return (
    <Container>
      <VStack flex={1} justifyContent="center">
        <Center>
          <Image source={Logo} alt="Logo da web semi novos" />
        </Center>

        <Box mx={12}>
          <Input
            placeholder="digite o modelo ou marca do veículo...."
            autoCapitalize="none"
            type="text"
            variant="underlined"
            mt={24}
            onChangeText={(value) => setNewSearch(value)}
          />
          <Center>
            <Text
              color="gray.100"
              fontSize="lg"
              fontWeight="bold"
              textAlign="center"
              my={12}
            >
              A Internet das Coisas vai te mostrar a melhor oferta
            </Text>
          </Center>
          <Button
            title="BORA ?"
            bg="red.600"
            _pressed={{
              style: {
                backgroundColor: colors.red[400],
              },
            }}
            onPress={handleSearchOffers}
          />
        </Box>
      </VStack>
    </Container>
  );
}
