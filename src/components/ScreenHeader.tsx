import { Center, Heading } from "native-base";
import { useState } from "react";

interface ScreenHeaderProps {
  title: string;
}
export function ScreenHeader({ title }: ScreenHeaderProps) {
  return (
    <Center bg="blue.500" pb={6} pt={16}>
      <Heading color="gray.100" fontSize="xl">
        {title}
      </Heading>
    </Center>
  );
}
