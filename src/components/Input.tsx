import {
  Input as NativeBaseInput,
  IInputProps,
  Text,
  Box,
  VStack,
  HStack,
  FormControl,
} from "native-base";
import { FormFieldHeader } from "./FormFieldHeader";

interface InputProps extends IInputProps {
  label?: string;
  errorMsg?: string;
}

export function Input({
  label,
  errorMsg,
  isRequired,
  isInvalid,
  ...props
}: InputProps) {
  const invalid = !!errorMsg || isInvalid;
  return (
    <VStack w="full">
      <VStack>
        <FormControl isInvalid={invalid}>
          <FormFieldHeader
            label={label}
            isRequired={isRequired}
            formControlError={
              <FormControl.ErrorMessage m={0}>
                {errorMsg ? errorMsg : null}
              </FormControl.ErrorMessage>
            }
          />

          <NativeBaseInput
            px={4}
            mb={4}
            h={10}
            size="md"
            color="gray.100"
            borderColor="gray.100"
            fontFamily="body"
            _invalid={{
              borderWidth: 1,
              borderColor: "red.400",
            }}
            {...props}
          />
        </FormControl>
      </VStack>
    </VStack>
  );
}
