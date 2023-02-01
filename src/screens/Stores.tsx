import { Center, Image, VStack, Text } from "native-base";
import Container from "../components/Container";

import Logo from "../assets/wsn_logo.png";

export function Stores() {
  return (
    <Container>
      <VStack flex={1}>
        <Center>
          <Image
            source={Logo}
            alt="Logo da Web Semi Novos"
            resizeMode="contain"
            w={120}
          />
          <Text>Stores</Text>
        </Center>
      </VStack>
    </Container>
  );
}
