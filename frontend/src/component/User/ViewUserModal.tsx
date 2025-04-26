// ViewUserModal.tsx
import React from "react";
import { Modal } from "../Modal.tsx";
import { Mail, Phone, User, MoreHorizontal, Edit } from "lucide-react";
import { UserData } from "../../types/Index.tsx";

interface ViewUserModalProps {
  isOpen: boolean;
  modalType: string;
  closeModal: () => void;
  selectedItem: UserData | null;
  getInitials: (name: string) => string;
  getStatusColor: (status: string) => string;
  openModal: (type: string, item: UserData) => void;
}

export default function ViewUserModal({
  isOpen,
  modalType,
  closeModal,
  selectedItem,
  getInitials,
  getStatusColor,
  openModal,
}: ViewUserModalProps) {
  return (
    <Modal
      isOpen={isOpen && modalType === "view"}
      onClose={closeModal}
      title="User Details"
    >
      {selectedItem && (
        <>
          <div className="flex flex-col items-center mb-6">
            <div className="h-20 w-20 rounded-full bg-gradient-to-r from-blue-500 to-purple-600 flex items-center justify-center text-white text-xl font-medium">
              {getInitials(selectedItem.name)}
            </div>
            <h4 className="text-lg font-medium mt-4">{selectedItem.name}</h4>
            <p className="text-gray-400">{selectedItem.role}</p>
            <span
              className={`mt-2 px-2 py-1 text-xs font-medium rounded-full ${getStatusColor(
                selectedItem.status
              )}`}
            >
              {selectedItem.status}
            </span>
          </div>
          <div className="space-y-4">
            <div className="flex items-center">
              <Mail className="h-4 w-4 text-gray-400 mr-3" />
              <div>
                <p className="text-sm text-gray-400">Email</p>
                <p className="text-sm">{selectedItem.email}</p>
              </div>
            </div>
            {selectedItem.phone && (
              <div className="flex items-center">
                <Phone className="h-4 w-4 text-gray-400 mr-3" />
                <div>
                  <p className="text-sm text-gray-400">Phone</p>
                  <p className="text-sm">{selectedItem.phone}</p>
                </div>
              </div>
            )}
            <div className="flex items-center">
              <User className="h-4 w-4 text-gray-400 mr-3" />
              <div>
                <p className="text-sm text-gray-400">Department</p>
                <p className="text-sm">
                  {selectedItem.department || "Not specified"}
                </p>
              </div>
            </div>
            <div className="flex items-center">
              <MoreHorizontal className="h-4 w-4 text-gray-400 mr-3" />
              <div>
                <p className="text-sm text-gray-400">Joined Date</p>
                <p className="text-sm">{selectedItem.joinedDate}</p>
              </div>
            </div>
            <div className="flex items-center">
              <MoreHorizontal className="h-4 w-4 text-gray-400 mr-3" />
              <div>
                <p className="text-sm text-gray-400">Last Login</p>
                <p className="text-sm">{selectedItem.lastLogin}</p>
              </div>
            </div>
          </div>
          <div className="mt-6 flex justify-end space-x-4">
            <button
              onClick={() => openModal("edit", selectedItem)}
              className="px-4 py-2 bg-blue-600 rounded-lg hover:bg-blue-700 transition-colors flex items-center"
            >
              <Edit className="h-4 w-4 mr-1" />
              Edit User
            </button>
          </div>
        </>
      )}
    </Modal>
  );
}
