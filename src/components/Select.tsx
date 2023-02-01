import {
  Box,
  Center,
  CheckIcon,
  Select as NativeBaseSelect,
  Text,
} from "native-base";
import { ComponentProps, ReactNode, useState } from "react";

interface SelectProps extends ComponentProps<typeof NativeBaseSelect> {
  label: string;
  txtColor?: string;
  children: ReactNode;
}

export function SelectRoot({
  label,
  txtColor,
  children,
  ...props
}: SelectProps) {
  return (
    <Center>
      <Box minW="full" h={10} mb={10}>
        <Text color={txtColor} fontSize="xs">
          {label}
        </Text>
        <NativeBaseSelect
          w="full"
          accessibilityLabel="Escolha o seu gênero"
          placeholder="Clique para selecionar"
          placeholderTextColor="gray.300"
          _selectedItem={{
            bg: "blue.300",
            endIcon: <CheckIcon size="5" color="gray.100" />,
          }}
          py={0}
          h={10}
          color="gray.100"
          fontFamily="body"
          fontSize="sm"
          {...props}
        >
          {children}
        </NativeBaseSelect>
      </Box>
    </Center>
  );
}

export function Item({
  ...props
}: ComponentProps<typeof NativeBaseSelect.Item>) {
  return <NativeBaseSelect.Item {...props} />;
}

export const Select = {
  Root: SelectRoot,
  Item: Item,
};
