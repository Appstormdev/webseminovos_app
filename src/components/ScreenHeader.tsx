import { Center, Heading, HStack, Image } from "native-base";
import { useState } from "react";
import Logo from "@assets/wsn_logo.png";

interface ScreenHeaderProps {
  title: string;
}
export function ScreenHeader({ title }: ScreenHeaderProps) {
  return (
    <HStack bg="blue.500" pb={4} pt={12}>
      <HStack flex={1} justifyContent="space-around" alignItems="center">
        <Heading color="gray.100" fontSize="xl" fontFamily="heading">
          {title}
        </Heading>

        <Image
          source={Logo}
          alt="Logo da web semi novos"
          w={20}
          h={10}
          resizeMode="contain"
        />
      </HStack>
    </HStack>
  );
}
