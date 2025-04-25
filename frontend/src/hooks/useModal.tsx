import { useState } from "react";

type ModalType = "add" | "edit" | "delete" | "view";

interface UseModalReturn<T> {
  isOpen: boolean;
  modalType: ModalType;
  selectedItem: T | null;
  openModal: (type: ModalType, item?: T) => void;
  closeModal: () => void;
}

export function useModal<T>(): UseModalReturn<T> {
  const [isOpen, setIsOpen] = useState(false);
  const [modalType, setModalType] = useState<ModalType>("add");
  const [selectedItem, setSelectedItem] = useState<T | null>(null);

  const openModal = (type: ModalType, item?: T) => {
    setModalType(type);
    setSelectedItem(item || null);
    setIsOpen(true);
  };

  const closeModal = () => {
    setIsOpen(false);
  };

  return {
    isOpen,
    modalType,
    selectedItem,
    openModal,
    closeModal,
  };
}
