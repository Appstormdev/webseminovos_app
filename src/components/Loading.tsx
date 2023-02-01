import { Center, Spinner } from "native-base";
import { BackgroundGradientImage } from "./Background";

export function Loading() {
  return (
    <Center flex={1}>
      <BackgroundGradientImage />
      <Spinner size="lg" />
    </Center>
  );
}
