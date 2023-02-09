import { AlertDialog, Button as ButtonBase, Center } from "native-base";
import { Button } from "@components/Button";
import { ReactNode, useEffect, useRef, useState } from "react";

export interface ICustomAlert {
  header?: string;
  message: string;
  onConfirm: () => void;
  confirmBtnLabel: string;
  onCancel: () => void;
  cancelBtnLabel: string;
  onMaybeLater: () => void;
  maybeLaterBtnLabel: string;
  isOpen: boolean;
  onClose: () => void;
}

export function CustomAlert({
  header,
  message,
  onConfirm,
  confirmBtnLabel,
  onCancel,
  cancelBtnLabel,
  onMaybeLater,
  maybeLaterBtnLabel,
  isOpen,
  onClose,
}: ICustomAlert) {
  const cancelRef = useRef(null);

  const hasConfirmBtn = confirmBtnLabel.length > 0;
  const hasCancelBtn = cancelBtnLabel.length > 0;
  const hasMaybeLaterBtn = maybeLaterBtnLabel.length > 0;

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
          <AlertDialog.Footer>
            <ButtonBase.Group space={2}>
              <>
                {hasConfirmBtn ?? (
                  <Button title={confirmBtnLabel} onPress={onConfirm} />
                )}

                {hasCancelBtn ?? (
                  <Button title={cancelBtnLabel} onPress={onCancel} />
                )}

                {hasMaybeLaterBtn ?? (
                  <Button title={maybeLaterBtnLabel} onPress={onMaybeLater} />
                )}
              </>
            </ButtonBase.Group>
          </AlertDialog.Footer>
        </AlertDialog.Content>
      </AlertDialog>
    </Center>
  );
}
