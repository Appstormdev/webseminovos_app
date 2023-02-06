import { AlertDialog, Center } from "native-base";
import { ReactNode, useEffect, useRef, useState } from "react";

export interface ICustomAlert {
  header?: string;
  message: string;
  footer?: ReactNode;
  isOpen: boolean;
  onClose: () => void;
}

export function CustomAlert({
  header,
  message,
  footer,
  isOpen,
  onClose,
}: ICustomAlert) {
  const cancelRef = useRef(null);

  return (
    <Center>
      <AlertDialog
        leastDestructiveRef={cancelRef}
        isOpen={isOpen}
        onClose={onClose}
      >
        <AlertDialog.Content>
          <AlertDialog.CloseButton />
          {header ? <AlertDialog.Header>{header}</AlertDialog.Header> : null}
          <AlertDialog.Body>{message}</AlertDialog.Body>
          {footer ? <AlertDialog.Footer>{footer}</AlertDialog.Footer> : null}
        </AlertDialog.Content>
      </AlertDialog>
    </Center>
  );
}
