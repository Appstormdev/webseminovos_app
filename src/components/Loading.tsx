import { Center, Spinner } from "native-base";
import { BackgroundGradientImage } from "./BackgroundGradientImage";

export function Loading() {
  return (
    <Center flex={1}>
      <BackgroundGradientImage />
      <Spinner size="lg" />
    </Center>
  );
}
