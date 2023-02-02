import { Image } from "native-base";

import imgNotFound from "@assets/image-notfound.png";

export function NotFoundedLogo() {
  return (
    <Image
      source={imgNotFound}
      alt="Imagem de logo não localizada"
      w="96px"
      h="64px"
      rounded="md"
      borderColor="gray.100"
      borderWidth={1}
      resizeMode="cover"
      mr={4}
      mb={2}
    />
  );
}
