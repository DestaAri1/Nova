import React, { useState } from "react";
import {
  User,
  Edit,
  Trash2,
  Search,
  Filter,
  MoreHorizontal,
  UserPlus,
  Mail,
  Phone,
  X,
  ChevronDown,
} from "lucide-react";
import DashboarLayout from "../../layout/DashboarLayout.tsx";
import { UserData } from "../../types/Index.tsx";

export const UserManagement: React.FC = () => {
  // Mock data for users
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

  // State for modal
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalType, setModalType] = useState<
    "add" | "edit" | "delete" | "view"
  >("add");
  const [selectedUser, setSelectedUser] = useState<UserData | null>(null);

  // State for search and filter
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState<
    "All" | "Active" | "Inactive" | "Pending"
  >("All");
  const [roleFilter, setRoleFilter] = useState("All");

  // Available roles (should match roles from RoleManagement component)
  const availableRoles = [
    "Administrator",
    "Manager",
    "Sales Representative",
    "Inventory Manager",
    "Customer Support",
  ];

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

  // Open modal functions
  const openAddModal = () => {
    setFormData({
      name: "",
      email: "",
      role: "Customer Support",
      status: "Pending",
      phone: "",
      department: "",
      joinedDate: "",
    });
    setModalType("add");
    setIsModalOpen(true);
  };

  const openEditModal = (user: UserData) => {
    setSelectedUser(user);
    setFormData({
      name: user.name,
      email: user.email,
      role: user.role,
      status: user.status,
      phone: user.phone || "",
      department: user.department || "",
      joinedDate: user.joinedDate,
    });
    setModalType("edit");
    setIsModalOpen(true);
  };

  const openDeleteModal = (user: UserData) => {
    setSelectedUser(user);
    setModalType("delete");
    setIsModalOpen(true);
  };

  const openViewModal = (user: UserData) => {
    setSelectedUser(user);
    setModalType("view");
    setIsModalOpen(true);
  };

  // Close modal
  const closeModal = () => {
    setIsModalOpen(false);
  };

  // Handle form changes
  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
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
    } else if (modalType === "edit" && selectedUser) {
      const updatedUsers = users.map((user) =>
        user.id === selectedUser.id
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
    } else if (modalType === "delete" && selectedUser) {
      const filteredUsers = users.filter((user) => user.id !== selectedUser.id);
      setUsers(filteredUsers);
    }
    closeModal();
  };

  // Filter users
  const filteredUsers = users.filter((user) => {
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
    <DashboarLayout>
      <main className="flex-1 overflow-y-auto bg-gray-900 p-4 lg:p-6">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-6">
            <div>
              <h1 className="text-2xl font-semibold">User Management</h1>
              <p className="text-gray-400">
                Manage system users and their access
              </p>
            </div>
            <div className="mt-4 md:mt-0">
              <button
                onClick={openAddModal}
                className="bg-gradient-to-r from-blue-500 to-purple-600 px-4 py-2 rounded-lg font-medium hover:opacity-90 transition-opacity flex items-center"
              >
                <UserPlus className="h-4 w-4 mr-2" />
                Add New User
              </button>
            </div>
          </div>

          {/* Search and Filters */}
          <div className="bg-gray-800 rounded-xl border border-gray-700 p-4 mb-6">
            <div className="flex flex-col lg:flex-row lg:items-center gap-4">
              <div className="flex-1">
                <div className="relative">
                  <input
                    type="text"
                    placeholder="Search users..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full bg-gray-700 border border-gray-600 rounded-lg pl-10 pr-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                  <Search className="absolute left-3 top-2.5 h-4 w-4 text-gray-400" />
                </div>
              </div>
              <div className="flex flex-col sm:flex-row gap-4">
                <div className="relative">
                  <select
                    value={statusFilter}
                    onChange={(e) => setStatusFilter(e.target.value as any)}
                    className="appearance-none bg-gray-700 border border-gray-600 rounded-lg pl-10 pr-8 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    <option value="All">All Status</option>
                    <option value="Active">Active</option>
                    <option value="Inactive">Inactive</option>
                    <option value="Pending">Pending</option>
                  </select>
                  <Filter className="absolute left-3 top-2.5 h-4 w-4 text-gray-400" />
                  <ChevronDown className="absolute right-3 top-2.5 h-4 w-4 text-gray-400" />
                </div>
                <div className="relative">
                  <select
                    value={roleFilter}
                    onChange={(e) => setRoleFilter(e.target.value)}
                    className="appearance-none bg-gray-700 border border-gray-600 rounded-lg pl-10 pr-8 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    <option value="All">All Roles</option>
                    {availableRoles.map((role) => (
                      <option key={role} value={role}>
                        {role}
                      </option>
                    ))}
                  </select>
                  <User className="absolute left-3 top-2.5 h-4 w-4 text-gray-400" />
                  <ChevronDown className="absolute right-3 top-2.5 h-4 w-4 text-gray-400" />
                </div>
              </div>
            </div>
          </div>

          {/* Users Table */}
          <div className="bg-gray-800 rounded-xl border border-gray-700 overflow-hidden mb-6">
            <div className="p-6 border-b border-gray-700">
              <h2 className="text-lg font-medium">System Users</h2>
            </div>
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-700">
                <thead className="bg-gray-800">
                  <tr>
                    <th
                      scope="col"
                      className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider"
                    >
                      User
                    </th>
                    <th
                      scope="col"
                      className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider"
                    >
                      Role
                    </th>
                    <th
                      scope="col"
                      className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider"
                    >
                      Status
                    </th>
                    <th
                      scope="col"
                      className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider"
                    >
                      Last Login
                    </th>
                    <th
                      scope="col"
                      className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider"
                    >
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-gray-800 divide-y divide-gray-700">
                  {filteredUsers.map((user) => (
                    <tr key={user.id} className="hover:bg-gray-750">
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center">
                          <div className="h-10 w-10 rounded-full bg-gradient-to-r from-blue-500 to-purple-600 flex items-center justify-center text-white font-medium">
                            {getInitials(user.name)}
                          </div>
                          <div className="ml-3">
                            <p className="text-sm font-medium">{user.name}</p>
                            <p className="text-xs text-gray-400">
                              {user.email}
                            </p>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className="px-2 py-1 text-xs bg-gray-700 rounded-full">
                          {user.role}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span
                          className={`px-2 py-1 text-xs font-medium rounded-full ${getStatusColor(
                            user.status
                          )}`}
                        >
                          {user.status}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-300">
                        {user.lastLogin}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm">
                        <div className="flex space-x-2">
                          <button
                            onClick={() => openViewModal(user)}
                            className="p-1 bg-gray-700 text-gray-300 rounded hover:bg-gray-600 transition-colors"
                          >
                            <User className="h-4 w-4" />
                          </button>
                          <button
                            onClick={() => openEditModal(user)}
                            className="p-1 bg-blue-900/20 text-blue-400 rounded hover:bg-blue-900/40 transition-colors"
                          >
                            <Edit className="h-4 w-4" />
                          </button>
                          <button
                            onClick={() => openDeleteModal(user)}
                            className="p-1 bg-red-900/20 text-red-400 rounded hover:bg-red-900/40 transition-colors"
                          >
                            <Trash2 className="h-4 w-4" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <div className="p-4 border-t border-gray-700 flex justify-between items-center">
              <p className="text-sm text-gray-400">
                Showing {filteredUsers.length} of {users.length} users
              </p>
              <div className="flex space-x-2">
                <button className="px-3 py-1 bg-gray-700 rounded text-sm hover:bg-gray-600 transition-colors">
                  Previous
                </button>
                <button className="px-3 py-1 bg-gray-700 rounded text-sm hover:bg-gray-600 transition-colors">
                  Next
                </button>
              </div>
            </div>
          </div>
        </div>
      </main>

      {/* Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50">
          <div className="bg-gray-800 rounded-xl border border-gray-700 w-full max-w-md p-6">
            {modalType === "delete" ? (
              <>
                <h3 className="text-lg font-medium mb-4">Delete User</h3>
                <p className="text-gray-300 mb-6">
                  Are you sure you want to delete the account for{" "}
                  <span className="font-medium">{selectedUser?.name}</span>?
                  This action cannot be undone.
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
            ) : modalType === "view" ? (
              <>
                <div className="flex justify-between items-center mb-6">
                  <h3 className="text-lg font-medium">User Details</h3>
                  <button
                    onClick={closeModal}
                    className="text-gray-400 hover:text-gray-300"
                  >
                    <X className="h-5 w-5" />
                  </button>
                </div>
                <div className="flex flex-col items-center mb-6">
                  <div className="h-20 w-20 rounded-full bg-gradient-to-r from-blue-500 to-purple-600 flex items-center justify-center text-white text-xl font-medium">
                    {selectedUser && getInitials(selectedUser.name)}
                  </div>
                  <h4 className="text-lg font-medium mt-4">
                    {selectedUser?.name}
                  </h4>
                  <p className="text-gray-400">{selectedUser?.role}</p>
                  <span
                    className={`mt-2 px-2 py-1 text-xs font-medium rounded-full ${
                      selectedUser && getStatusColor(selectedUser.status)
                    }`}
                  >
                    {selectedUser?.status}
                  </span>
                </div>
                <div className="space-y-4">
                  <div className="flex items-center">
                    <Mail className="h-4 w-4 text-gray-400 mr-3" />
                    <div>
                      <p className="text-sm text-gray-400">Email</p>
                      <p className="text-sm">{selectedUser?.email}</p>
                    </div>
                  </div>
                  {selectedUser?.phone && (
                    <div className="flex items-center">
                      <Phone className="h-4 w-4 text-gray-400 mr-3" />
                      <div>
                        <p className="text-sm text-gray-400">Phone</p>
                        <p className="text-sm">{selectedUser?.phone}</p>
                      </div>
                    </div>
                  )}
                  <div className="flex items-center">
                    <User className="h-4 w-4 text-gray-400 mr-3" />
                    <div>
                      <p className="text-sm text-gray-400">Department</p>
                      <p className="text-sm">
                        {selectedUser?.department || "Not specified"}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center">
                    <MoreHorizontal className="h-4 w-4 text-gray-400 mr-3" />
                    <div>
                      <p className="text-sm text-gray-400">Joined Date</p>
                      <p className="text-sm">{selectedUser?.joinedDate}</p>
                    </div>
                  </div>
                  <div className="flex items-center">
                    <MoreHorizontal className="h-4 w-4 text-gray-400 mr-3" />
                    <div>
                      <p className="text-sm text-gray-400">Last Login</p>
                      <p className="text-sm">{selectedUser?.lastLogin}</p>
                    </div>
                  </div>
                </div>
                <div className="mt-6 flex justify-end space-x-4">
                  <button
                    onClick={() => {
                      if (selectedUser) {
                        openEditModal(selectedUser);
                      }
                    }}
                    className="px-4 py-2 bg-blue-600 rounded-lg hover:bg-blue-700 transition-colors flex items-center"
                  >
                    <Edit className="h-4 w-4 mr-1" />
                    Edit User
                  </button>
                </div>
              </>
            ) : (
              <>
                <h3 className="text-lg font-medium mb-4">
                  {modalType === "add" ? "Add New User" : "Edit User"}
                </h3>
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-400 mb-1">
                      Full Name
                    </label>
                    <input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleInputChange}
                      className="w-full bg-gray-700 border border-gray-600 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                      placeholder="Enter user's full name"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-400 mb-1">
                      Email Address
                    </label>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      className="w-full bg-gray-700 border border-gray-600 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                      placeholder="Enter email address"
                    />
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-400 mb-1">
                        Role
                      </label>
                      <select
                        name="role"
                        value={formData.role}
                        onChange={handleInputChange}
                        className="w-full bg-gray-700 border border-gray-600 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                      >
                        {availableRoles.map((role) => (
                          <option key={role} value={role}>
                            {role}
                          </option>
                        ))}
                        {availableRoles.map((role) => (
                          <option key={role} value={role}>
                            {role}
                          </option>
                        ))}
                      </select>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-400 mb-1">
                        Status
                      </label>
                      <select
                        name="status"
                        value={formData.status}
                        onChange={handleInputChange}
                        className="w-full bg-gray-700 border border-gray-600 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                      >
                        <option value="Active">Active</option>
                        <option value="Inactive">Inactive</option>
                        <option value="Pending">Pending</option>
                      </select>
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-400 mb-1">
                      Phone Number
                    </label>
                    <input
                      type="text"
                      name="phone"
                      value={formData.phone}
                      onChange={handleInputChange}
                      className="w-full bg-gray-700 border border-gray-600 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                      placeholder="Enter phone number (optional)"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-400 mb-1">
                      Department
                    </label>
                    <input
                      type="text"
                      name="department"
                      value={formData.department}
                      onChange={handleInputChange}
                      className="w-full bg-gray-700 border border-gray-600 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                      placeholder="Enter department (optional)"
                    />
                  </div>
                </div>
                <div className="flex justify-end space-x-4 mt-6">
                  <button
                    onClick={closeModal}
                    className="px-4 py-2 bg-gray-700 rounded-lg hover:bg-gray-600 transition-colors"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={handleSubmit}
                    className="px-4 py-2 bg-gradient-to-r from-blue-500 to-purple-600 rounded-lg hover:opacity-90 transition-opacity"
                  >
                    {modalType === "add" ? "Add User" : "Save Changes"}
                  </button>
                </div>
              </>
            )}
          </div>
        </div>
      )}
    </DashboarLayout>
  );
};
