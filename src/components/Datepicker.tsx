import { Text } from "native-base";
import { useState } from "react";
import DatePicker, {
  DatePickerProps as IDatePickerProps,
} from "react-native-date-picker";
import { Button } from "./Button";

interface DatePickerProps extends IDatePickerProps {
  label: string;
  buttonTitle: string;
  onConfirm: (date: Date) => void;
}

export function Datepicker({
  label,
  buttonTitle,
  onConfirm,
  ...props
}: DatePickerProps) {
  const [open, setOpen] = useState(false);

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
      <Button
        title={buttonTitle}
        txtFontFamily="body"
        txtColor="gray.300"
        onPress={() => setOpen(true)}
        variant="outline"
        bg="transparent"
        h={10}
        mb={4}
      />
      <DatePicker
        {...props}
        modal
        open={open}
        onConfirm={(date) => {
          setOpen(false);
          onConfirm(date);
        }}
        onCancel={() => {
          setOpen(false);
        }}
      />
    </>
  );
}
