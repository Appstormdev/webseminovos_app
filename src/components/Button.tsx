import { Button as NativeBaseButton, IButtonProps, Text } from "native-base";

interface ButtonProps extends IButtonProps {
  title: string;
  txtColor?: string;
  txtFontFamily?: "body" | "heading";
}

export function Button({
  title,
  txtColor,
  txtFontFamily,
  ...props
}: ButtonProps) {
  return (
    <NativeBaseButton
      w="full"
      h={10}
      bg="blue.300"
      rounded="sm"
      py={0}
      justifyContent="center"
      {...props}
    >
      <Text
        color={txtColor ? txtColor : "gray.100"}
        fontFamily={txtFontFamily ? txtFontFamily : "heading"}
        fontSize="sm"
      >
        {title}
      </Text>
    </NativeBaseButton>
  );
}
