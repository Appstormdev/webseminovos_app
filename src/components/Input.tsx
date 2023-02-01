import { Input as NativeBaseInput, IInputProps, Text } from "native-base";

interface InputProps extends IInputProps {
  label?: string;
}

export function Input({ label, ...props }: InputProps) {
  return (
    <>
      <Text
        textAlign="left"
        flex={1}
        bg="yellow"
        w="full"
        color="gray.100"
        fontSize="xs"
      >
        {label}
      </Text>
      <NativeBaseInput
        px={4}
        mb={4}
        h={10}
        size="md"
        color="gray.100"
        borderColor="gray.100"
        fontFamily="body"
        {...props}
      />
    </>
  );
}
