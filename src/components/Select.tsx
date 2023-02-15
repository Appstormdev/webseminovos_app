import {
  Center,
  CheckIcon,
  FormControl,
  Select as NativeBaseSelect,
} from "native-base";
import { ComponentProps, ReactNode } from "react";
import { FormFieldHeader } from "./FormFieldHeader";

interface SelectProps extends ComponentProps<typeof NativeBaseSelect> {
  label: string;
  txtColor?: string;
  children: ReactNode;
  errorMsg?: string | null;
  isRequired?: boolean;
  isInvalid?: boolean;
}

export function SelectRoot({
  label,
  txtColor,
  children,
  errorMsg,
  isRequired,
  isInvalid,
  ...props
}: SelectProps) {
  const invalid = !!errorMsg || isInvalid;

  return (
    <Center>
      <FormControl isInvalid={invalid} minW="full" maxW="full" h={10} mb={10}>
        <FormFieldHeader
          label={label}
          isRequired={isRequired}
          formControlError={
            <FormControl.ErrorMessage m={0}>
              {errorMsg ? errorMsg : null}
            </FormControl.ErrorMessage>
          }
        />
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
          borderColor={invalid ? "red.400" : undefined}
          color="gray.100"
          fontFamily="body"
          fontSize="sm"
          {...props}
        >
          {children}
        </NativeBaseSelect>
      </FormControl>
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
