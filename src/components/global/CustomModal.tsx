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
  cancelLabel?: string;
  message: string;
  alertMessage?: string;
  color?: "primary" | "secondary" | "success" | "warning" | "danger";
  isLoading?: boolean;
};

const CustomModal = ({
  isOpen,
  onClose,
  onConfirm,
  message,
  label,
  confirmLabel,
  alertMessage,
  color = "primary",
  cancelLabel = "Cancel",
  isLoading = false,
}: CustomModalProps) => {
  return (
    <Modal
      backdrop="opaque"
      isOpen={isOpen}
      radius="sm"
      onOpenChange={onClose}
      placement="center"
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
            {cancelLabel}
          </Button>
          <Button
            radius="sm"
            isLoading={isLoading}
            onClick={onConfirm}
            color={color}
          >
            {confirmLabel}
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default CustomModal;
