import { Center, VStack, Skeleton } from "native-base";
import Container from "../components/Container";

import Logo from "../assets/wsn_logo.png";
import { ScreenHeader } from "@components/ScreenHeader";
import { UserPhoto } from "@components/UserPhoto";
import { useState } from "react";

export function Profile() {
  const [photoIsLoading, setPhotoIsLoading] = useState<boolean>(false);

  return (
    <Container hasHeader>
      <VStack flex={1}>
        <ScreenHeader title="Perfil" />

        <Center mt={6} px={10}>
          <UserPhoto
            source={{ uri: "https://github.com/rgranvilla.png" }}
            alt="Foto do usuário"
            size={128}
            isLoading={photoIsLoading}
          />
        </Center>
      </VStack>
    </Container>
  );
}
