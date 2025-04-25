import React, { useState } from "react";
import { UserPlus } from "lucide-react";
import DashboarLayout from "../../layout/DashboarLayout.tsx";
import { UserData } from "../../types/Index.tsx";
import { useModal } from "../../hooks/useModal.tsx";
import UserTable from "../../component/User/UserTable.tsx";
import AddUserModal from "../../component/User/AddUserModal.tsx";
import DeleteUserModal from "../../component/User/DeleteUserModal.tsx";
import EditUserModal from "../../component/User/EditUserModal.tsx";
import { useSearchFilter } from "../../hooks/useSearchFilter.tsx";
import SearchFilter from "../../component/User/SearchFilter.tsx";

export const UserManagement: React.FC = () => {
  const [users, setUsers] = useState<UserData[]>([
    {
      id: "usr-001",
      name: "John Doe",
      email: "john.doe@example.com",
      role: "Administrator",
      status: "Active",
      lastLogin: "Today, 10:30 AM",
      phone: "+1 (555) 123-4567",
      department: "IT Department",
      joinedDate: "Jan 15, 2024",
    },
    {
      id: "usr-002",
      name: "Sarah Johnson",
      email: "sarah.j@example.com",
      role: "Manager",
      status: "Active",
      lastLogin: "Yesterday, 3:45 PM",
      phone: "+1 (555) 234-5678",
      department: "Sales",
      joinedDate: "Mar 22, 2024",
    },
    {
      id: "usr-003",
      name: "Michael Brown",
      email: "michael.b@example.com",
      role: "Sales Representative",
      status: "Active",
      lastLogin: "Apr 20, 2025, 8:15 AM",
      phone: "+1 (555) 345-6789",
      department: "Sales",
      joinedDate: "Feb 10, 2024",
    },
    {
      id: "usr-004",
      name: "Emily Wilson",
      email: "emily.w@example.com",
      role: "Inventory Manager",
      status: "Inactive",
      lastLogin: "Apr 10, 2025, 11:20 AM",
      phone: "+1 (555) 456-7890",
      department: "Inventory",
      joinedDate: "Nov 5, 2024",
    },
    {
      id: "usr-005",
      name: "David Chen",
      email: "david.c@example.com",
      role: "Customer Support",
      status: "Active",
      lastLogin: "Today, 9:05 AM",
      phone: "+1 (555) 567-8901",
      department: "Customer Service",
      joinedDate: "Jan 30, 2025",
    },
    {
      id: "usr-006",
      name: "Lisa Garcia",
      email: "lisa.g@example.com",
      role: "Manager",
      status: "Active",
      lastLogin: "Apr 21, 2025, 2:40 PM",
      phone: "+1 (555) 678-9012",
      department: "Marketing",
      joinedDate: "Dec 12, 2024",
    },
    {
      id: "usr-007",
      name: "Robert Taylor",
      email: "robert.t@example.com",
      role: "Sales Representative",
      status: "Pending",
      lastLogin: "Never",
      phone: "+1 (555) 789-0123",
      department: "Sales",
      joinedDate: "Apr 18, 2025",
    },
  ]);

  // Use our custom hook for modal management
  const { isOpen, modalType, selectedItem, openModal, closeModal } =
    useModal<UserData>();

  // Available roles
  const availableRoles = [
    "Administrator",
    "Manager",
    "Sales Representative",
    "Inventory Manager",
    "Customer Support",
  ];

  // Custom filter function for users
  const filterUsers = (
    users: UserData[],
    searchTerm: string,
    statusFilter: "All" | "Active" | "Inactive" | "Pending",
    roleFilter: string
  ) => {
    return users.filter((user) => {
      // Apply search filter
      const matchesSearch =
        user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        user.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
        user.id.toLowerCase().includes(searchTerm.toLowerCase());

      // Apply status filter
      const matchesStatus =
        statusFilter === "All" || user.status === statusFilter;

      // Apply role filter
      const matchesRole = roleFilter === "All" || user.role === roleFilter;

      return matchesSearch && matchesStatus && matchesRole;
    });
  };

  // Use our custom search filter hook
  const {
    searchTerm,
    setSearchTerm,
    statusFilter,
    setStatusFilter,
    roleFilter,
    setRoleFilter,
    filterItems,
  } = useSearchFilter<UserData>({
    initialSearchTerm: "",
    initialStatusFilter: "All",
    initialRoleFilter: "All",
    availableRoles,
    filterFunction: filterUsers,
  });

  // State for form data
  const [formData, setFormData] = useState<Omit<UserData, "id" | "lastLogin">>({
    name: "",
    email: "",
    role: "Customer Support", // Default role
    status: "Pending",
    phone: "",
    department: "",
    joinedDate: "",
  });

  // Reset form when modal type changes
  React.useEffect(() => {
    if (modalType === "add") {
      setFormData({
        name: "",
        email: "",
        role: "Customer Support",
        status: "Pending",
        phone: "",
        department: "",
        joinedDate: "",
      });
    } else if (modalType === "edit" && selectedItem) {
      setFormData({
        name: selectedItem.name,
        email: selectedItem.email,
        role: selectedItem.role,
        status: selectedItem.status,
        phone: selectedItem.phone || "",
        department: selectedItem.department || "",
        joinedDate: selectedItem.joinedDate,
      });
    }
  }, [modalType, selectedItem]);

  // Handle form changes
  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const openAddUserModal = () => {
    openModal("add", undefined);
  };

  const openEditUserModal = (data) => {
    openModal("edit", data);
  };

  // Handle form submission
  const handleSubmit = () => {
    if (modalType === "add") {
      const newUser: UserData = {
        id: `usr-${String(users.length + 1).padStart(3, "0")}`,
        name: formData.name,
        email: formData.email,
        role: formData.role,
        status: formData.status as "Active" | "Inactive" | "Pending",
        lastLogin: "Never",
        phone: formData.phone,
        department: formData.department,
        joinedDate: formData.joinedDate,
      };
      setUsers([...users, newUser]);
    } else if (modalType === "edit" && selectedItem) {
      const updatedUsers = users.map((user) =>
        user.id === selectedItem.id
          ? {
              ...user,
              name: formData.name,
              email: formData.email,
              role: formData.role,
              status: formData.status as "Active" | "Inactive" | "Pending",
              phone: formData.phone,
              department: formData.department,
            }
          : user
      );
      setUsers(updatedUsers);
    } else if (modalType === "delete" && selectedItem) {
      const filteredUsers = users.filter((user) => user.id !== selectedItem.id);
      setUsers(filteredUsers);
    }
    closeModal();
  };

  // Get filtered users
  const filteredUsers = filterItems(users);

  // Generate avatar placeholder based on name
  const getInitials = (name: string) => {
    return name
      .split(" ")
      .map((part) => part[0])
      .join("")
      .toUpperCase()
      .slice(0, 2);
  };

  // Get status color
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
      onClick={openAddUserModal}
    >
      {/* Search and Filters */}
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
      <UserTable
        users={filteredUsers}
        getInitials={getInitials}
        getStatusColor={getStatusColor}
        onEdit={(user) => openModal("edit", user)}
        onDelete={(user) => openModal("delete", user)}
      />

      {/* Modals */}
      <AddUserModal
        isOpen={isOpen}
        modalType={modalType}
        closeModal={closeModal}
        formData={formData}
        handleInputChange={handleInputChange}
        handleSubmit={handleSubmit}
        availableRoles={availableRoles}
      />

      <EditUserModal
        isOpen={isOpen}
        modalType={modalType}
        closeModal={closeModal}
        selectedItem={selectedItem}
        getInitials={getInitials}
        getStatusColor={getStatusColor}
        openModal={openEditUserModal}
      />

      <DeleteUserModal
        isOpen={isOpen}
        modalType={modalType}
        closeModal={closeModal}
        selectedItem={selectedItem}
        handleSubmit={handleSubmit}
      />
    </DashboarLayout>
  );
};
