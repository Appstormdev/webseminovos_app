import { Box } from "native-base";
import React, { ReactNode } from "react";
import { BackgroundGradientImage } from "./BackgroundGradientImage";
interface IContainer {
  children: ReactNode;
}
export function Container({ children }: IContainer) {
  return (
    <Box flex={1} bg="transparent">
      <BackgroundGradientImage />

      {children}
    </Box>
  );
}
