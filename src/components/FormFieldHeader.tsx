import { HStack, Text } from "native-base";
import { ReactNode } from "react";

interface FormFieldHeaderProps {
  label?: string;
  isRequired?: boolean;
  formControlError?: ReactNode;
}

export function FormFieldHeader({
  label,
  isRequired,
  formControlError,
}: FormFieldHeaderProps) {
  return (
    <HStack w="full" h={5} justifyContent="space-between">
      <Text color="gray.100" fontSize="xs">
        {label}
        {isRequired && !!label ? <Text fontSize="xs">*</Text> : null}
      </Text>
      {formControlError}
    </HStack>
  );
}
