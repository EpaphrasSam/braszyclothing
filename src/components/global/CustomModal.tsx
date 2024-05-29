import {
  Modal,
  ModalHeader,
  ModalContent,
  ModalFooter,
  Button,
  ModalBody,
  Spinner,
} from "@nextui-org/react";
import React from "react";

type CustomModalProps = {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  label: string;
  confirmLabel: string;
  message: string;
  alertMessage?: string;
};

const CustomModal = ({
  isOpen,
  onClose,
  onConfirm,
  message,
  label,
  confirmLabel,
  alertMessage,
}: CustomModalProps) => {
  return (
    <Modal
      backdrop="opaque"
      isOpen={isOpen}
      radius="sm"
      onOpenChange={onClose}
      motionProps={{
        variants: {
          enter: {
            y: 0,
            opacity: 1,
            transition: {
              duration: 0.3,
              ease: "easeOut",
            },
          },
          exit: {
            y: -20,
            opacity: 0,
            transition: {
              duration: 0.2,
              ease: "easeIn",
            },
          },
        },
      }}
    >
      <ModalContent>
        <ModalHeader className="flex flex-col gap-1 items-center justify-center">
          {label}
        </ModalHeader>
        <ModalBody>
          <p>{message}</p>
          {alertMessage && (
            <p className="text-red-500 text-xs">{alertMessage}</p>
          )}
        </ModalBody>
        <ModalFooter>
          <Button radius="sm" onClick={onClose} color="default">
            Cancel
          </Button>
          <Button radius="sm" onClick={onConfirm} color="primary">
            {confirmLabel}
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default CustomModal;
