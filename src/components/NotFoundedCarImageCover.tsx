import { Image } from "native-base";

import imgNotFound from "@assets/image-notfound.png";

export function NotFoundedCarImageCover() {
  return (
    <Image
      source={imgNotFound}
      alt="Imagem de logo não localizada"
      rounded="lg"
      h="full"
      w="full"
      resizeMode="contain"
    />
  );
}
