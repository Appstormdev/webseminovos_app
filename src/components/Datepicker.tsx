import { FormControl, HStack, Text } from "native-base";
import { useState } from "react";
import DatePicker, {
  DatePickerProps as IDatePickerProps,
} from "react-native-date-picker";
import { Button } from "./Button";
import { FormFieldHeader } from "./FormFieldHeader";

interface DatePickerProps extends IDatePickerProps {
  label: string;
  buttonTitle: string;
  onConfirm: (date: Date) => void;
  errorMsg?: string;
  isRequired?: boolean;
  isInvalid?: boolean;
}

export function Datepicker({
  label,
  buttonTitle,
  onConfirm,
  errorMsg,
  isRequired,
  isInvalid,
  ...props
}: DatePickerProps) {
  const invalid = !!errorMsg || isInvalid;
  const [open, setOpen] = useState(false);

  return (
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
      <Button
        title={buttonTitle}
        txtFontFamily="body"
        txtColor="gray.300"
        onPress={() => setOpen(true)}
        variant="outline"
        bg="transparent"
        h={10}
        mb={4}
        borderColor={invalid ? "red.400" : undefined}
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
    </FormControl>
  );
}
