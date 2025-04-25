import React from "react";
import { Modal } from "../Modal.tsx";
import { UserData } from "../../types/Index.tsx";

interface DeleteUserModalProps {
  isOpen: boolean;
  modalType: string;
  closeModal: () => void;
  selectedItem: UserData | null;
  handleSubmit: () => void;
}

export default function DeleteUserModal({
  isOpen,
  modalType,
  closeModal,
  selectedItem,
  handleSubmit,
}: DeleteUserModalProps) {
  return (
    <Modal
      isOpen={isOpen && modalType === "delete"}
      onClose={closeModal}
      title="Delete User"
    >
      {selectedItem && (
        <>
          <p className="text-gray-300 mb-6">
            Are you sure you want to delete the account for{" "}
            <span className="font-medium">{selectedItem.name}</span>? This
            action cannot be undone.
          </p>
          <div className="flex justify-end space-x-4">
            <button
              onClick={closeModal}
              className="px-4 py-2 bg-gray-700 rounded-lg hover:bg-gray-600 transition-colors"
            >
              Cancel
            </button>
            <button
              onClick={handleSubmit}
              className="px-4 py-2 bg-red-600 rounded-lg hover:bg-red-700 transition-colors"
            >
              Delete
            </button>
          </div>
        </>
      )}
    </Modal>
  );
}
