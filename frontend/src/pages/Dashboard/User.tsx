import React, { lazy, Suspense, useState } from "react";
import { UserPlus } from "lucide-react";
import DashboarLayout from "../../layout/DashboarLayout.tsx";
import AddUserModal from "../../component/User/AddUserModal.tsx";
import DeleteUserModal from "../../component/User/DeleteUserModal.tsx";
import SearchFilter from "../../component/User/SearchFilter.tsx";
import useUserHook from "../../hooks/useUserHook.tsx";
import { useModal } from "../../hooks/useModal.tsx";
import { UserInterface } from "../../types/Index";
import ViewUserModal from "../../component/User/ViewUserModal.tsx";
import { UserBox, UserBoxTitle } from "../../component/User/UserPage.tsx";
import LoadingSpinner2 from "../../component/LoadingSpinner2.tsx";

const LazyUserTable = lazy(() => import("../../component/User/UserTable.tsx"));

// Define additional user form data structure
interface UserFormData {
  name: string;
  email: string;
  role_id: string;
  is_active: number;
  phone?: string;
  department?: string;
}

export const UserManagement: React.FC = () => {
  const { users } = useUserHook();
  const { isOpen, modalType, selectedItem, openModal, closeModal } =
    useModal<UserInterface>();

  // State for search and filters
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState<
    "All" | "Active" | "Inactive"
  >("All");
  const [roleFilter, setRoleFilter] = useState("All");

  // State for the form data
  const [formData, setFormData] = useState<UserFormData>({
    name: "",
    email: "",
    role_id: "",
    is_active: 1,
    phone: "",
    department: "",
  });

  // Extract available roles from users
  const availableRoles = users
    ? Array.from(new Set(users.map((user) => user.role.name)))
    : [];

  // Handle form input changes
  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;

    // Special handling for status dropdown that needs to be converted to a number
    if (name === "status") {
      setFormData({
        ...formData,
        is_active: value === "Active" ? 1 : 0,
      });
    } else if (name === "role") {
      // Find the role_id that corresponds to the selected role name
      const selectedRole = users?.find((user) => user.role.name === value);
      if (selectedRole) {
        setFormData({
          ...formData,
          role_id: selectedRole.role_id,
        });
      }
    } else {
      setFormData({
        ...formData,
        [name]: value,
      });
    }
  };

  // Open edit modal with pre-filled data
  const handleEdit = (user: UserInterface) => {
    setFormData({
      name: user.name,
      email: user.email,
      role_id: user.role_id,
      is_active: user.is_active,
      phone: "",
      department: "",
    });
    openModal("edit", user);
  };

  // Open view modal
  const handleView = (user: UserInterface) => {
    openModal("view", user);
  };

  // Open delete modal
  const handleDelete = (user: UserInterface) => {
    openModal("delete", user);
  };

  // Add new user
  const handleAdd = () => {
    setFormData({
      name: "",
      email: "",
      role_id:
        availableRoles.length > 0
          ? users?.find((user) => user.role.name === availableRoles[0])
              ?.role_id || ""
          : "",
      is_active: 1,
      phone: "",
      department: "",
    });
    openModal("add");
  };

  // Submit form
  const handleSubmit = () => {
    if (modalType === "add") {
      console.log("Adding new user:", formData);
      // Implement API call to add user
    } else if (modalType === "edit" && selectedItem) {
      console.log("Updating user:", selectedItem.id, formData);
      // Implement API call to update user
    } else if (modalType === "delete" && selectedItem) {
      console.log("Deleting user:", selectedItem.id);
      // Implement API call to delete user
    }
    closeModal();
  };

  // Filter users based on search and filters
  const filteredUsers = users?.filter((user) => {
    const matchesSearch =
      searchTerm === "" ||
      user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.email.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesStatus =
      statusFilter === "All" ||
      (statusFilter === "Active" && user.is_active === 1) ||
      (statusFilter === "Inactive" && user.is_active === 0);

    const matchesRole = roleFilter === "All" || user.role.name === roleFilter;

    return matchesSearch && matchesStatus && matchesRole;
  });

  // Helper functions for user display
  const getInitials = (name: string) => {
    return name
      .split(" ")
      .map((part) => part[0])
      .join("")
      .toUpperCase()
      .slice(0, 2);
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Active":
        return "bg-green-900/20 text-green-400";
      case "Inactive":
        return "bg-red-900/20 text-red-400";
      case "Pending":
        return "bg-yellow-900/20 text-yellow-400";
      default:
        return "bg-gray-900/20 text-gray-400";
    }
  };

  return (
    <DashboarLayout
      isActive={true}
      title="User Management"
      text="Manage system users and their access"
      icon={UserPlus}
      buttonTitle="Add User"
      onClick={handleAdd}
    >
      <SearchFilter
        searchTerm={searchTerm}
        setSearchTerm={setSearchTerm}
        statusFilter={statusFilter}
        setStatusFilter={setStatusFilter}
        roleFilter={roleFilter}
        setRoleFilter={setRoleFilter}
        availableRoles={availableRoles}
      />

      {/* Users Table */}
      <UserBox>
        <UserBoxTitle />
        {/* lazy load user table */}
        <Suspense fallback={<LoadingSpinner2 />}>
          <LazyUserTable
            users={filteredUsers || []}
            onEdit={handleEdit}
            onView={handleView}
            onDelete={handleDelete}
          />
        </Suspense>
      </UserBox>

      {/* Add/Edit User Modal */}
      <AddUserModal
        isOpen={isOpen}
        modalType={modalType}
        closeModal={closeModal}
        formData={{
          name: formData.name,
          email: formData.email,
          role: selectedItem?.role.name || availableRoles[0] || "",
          status: formData.is_active === 1 ? "Active" : "Inactive",
          phone: formData.phone || "",
          department: formData.department || "",
        }}
        handleInputChange={handleInputChange}
        handleSubmit={handleSubmit}
        availableRoles={availableRoles}
      />

      {/* Delete User Modal */}
      <DeleteUserModal
        isOpen={isOpen}
        modalType={modalType}
        closeModal={closeModal}
        selectedItem={
          selectedItem
            ? {
                id: selectedItem.id,
                name: selectedItem.name,
              }
            : null
        }
        handleSubmit={handleSubmit}
      />

      {/* View User Modal */}
      <ViewUserModal
        isOpen={isOpen}
        modalType={modalType}
        closeModal={closeModal}
        selectedItem={
          selectedItem
            ? {
                id: selectedItem.id,
                name: selectedItem.name,
                email: selectedItem.email,
                role: selectedItem.role.name,
                status: selectedItem.is_active === 1 ? "Active" : "Inactive",
                phone: "",
                department: "",
                joinedDate: selectedItem.created_at,
                lastLogin: selectedItem.updated_at,
              }
            : null
        }
        getInitials={getInitials}
        getStatusColor={getStatusColor}
        openModal={(type, item) => handleEdit(selectedItem as UserInterface)}
      />
    </DashboarLayout>
  );
};
