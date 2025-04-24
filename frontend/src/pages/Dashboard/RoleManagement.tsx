import React, { useState } from "react";
import {
  Shield,
  Edit,
  Trash2,
  Plus,
} from "lucide-react";
import DashboarLayout from "../../layout/DashboarLayout.tsx";

interface Role {
  id: string;
  name: string;
  description: string;
  users: number;
  permissions: string[];
  createdAt: string;
}

export const RoleManagement: React.FC = () => {
  // Mock data for roles
  const [roles, setRoles] = useState<Role[]>([
    {
      id: "role-1",
      name: "Administrator",
      description: "Full access to all system features and settings",
      users: 3,
      permissions: ["All permissions"],
      createdAt: "Apr 10, 2025",
    },
    {
      id: "role-2",
      name: "Manager",
      description: "Access to most features except system settings",
      users: 8,
      permissions: ["Orders", "Products", "Customers", "Reports"],
      createdAt: "Apr 12, 2025",
    },
    {
      id: "role-3",
      name: "Sales Representative",
      description: "Access to orders and customer information",
      users: 15,
      permissions: ["Orders", "Customers"],
      createdAt: "Apr 14, 2025",
    },
    {
      id: "role-4",
      name: "Inventory Manager",
      description: "Access to product and inventory management",
      users: 5,
      permissions: ["Products", "Inventory"],
      createdAt: "Apr 16, 2025",
    },
    {
      id: "role-5",
      name: "Customer Support",
      description: "Access to customer information and orders",
      users: 12,
      permissions: ["Customers", "Orders (view only)"],
      createdAt: "Apr 18, 2025",
    },
  ]);

  // State for modal
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalType, setModalType] = useState<"add" | "edit" | "delete">("add");
  const [selectedRole, setSelectedRole] = useState<Role | null>(null);

  // State for new/edited role form
  const [formData, setFormData] = useState<Omit<Role, "id" | "createdAt">>({
    name: "",
    description: "",
    users: 0,
    permissions: [],
  });

  // Available permissions
  const availablePermissions = [
    "Orders",
    "Products",
    "Customers",
    "Reports",
    "Inventory",
    "Settings",
    "Users",
    "Billing",
  ];

  // Open modal functions
  const openAddModal = () => {
    setFormData({
      name: "",
      description: "",
      users: 0,
      permissions: [],
    });
    setModalType("add");
    setIsModalOpen(true);
  };

  const openEditModal = (role: Role) => {
    setSelectedRole(role);
    setFormData({
      name: role.name,
      description: role.description,
      users: role.users,
      permissions: [...role.permissions],
    });
    setModalType("edit");
    setIsModalOpen(true);
  };

  const openDeleteModal = (role: Role) => {
    setSelectedRole(role);
    setModalType("delete");
    setIsModalOpen(true);
  };

  // Close modal
  const closeModal = () => {
    setIsModalOpen(false);
  };

  // Handle form changes
  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  // Toggle permission selection
  const togglePermission = (permission: string) => {
    if (formData.permissions.includes(permission)) {
      setFormData({
        ...formData,
        permissions: formData.permissions.filter((p) => p !== permission),
      });
    } else {
      setFormData({
        ...formData,
        permissions: [...formData.permissions, permission],
      });
    }
  };

  // Handle form submission
  const handleSubmit = () => {
    if (modalType === "add") {
      const newRole: Role = {
        id: `role-${roles.length + 1}`,
        name: formData.name,
        description: formData.description,
        users: 0, // New roles start with 0 users
        permissions: formData.permissions,
        createdAt: new Date().toLocaleDateString("en-US", {
          month: "short",
          day: "numeric",
          year: "numeric",
        }),
      };
      setRoles([...roles, newRole]);
    } else if (modalType === "edit" && selectedRole) {
      const updatedRoles = roles.map((role) =>
        role.id === selectedRole.id
          ? {
              ...role,
              name: formData.name,
              description: formData.description,
              permissions: formData.permissions,
            }
          : role
      );
      setRoles(updatedRoles);
    } else if (modalType === "delete" && selectedRole) {
      const filteredRoles = roles.filter((role) => role.id !== selectedRole.id);
      setRoles(filteredRoles);
    }
    closeModal();
  };

  return (
    <DashboarLayout
      isActive={true}
      text="Manage user roles and permissions"
      title="Role Management"
      icon={Plus}
      buttonTitle="Add New Role"
    >
      {/* Roles Table */}
      <div className="bg-gray-800 rounded-xl border border-gray-700 overflow-hidden mb-6">
        <div className="p-6 border-b border-gray-700">
          <h2 className="text-lg font-medium">System Roles</h2>
        </div>
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-700">
            <thead className="bg-gray-800">
              <tr>
                <th
                  scope="col"
                  className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider"
                >
                  Role Name
                </th>
                <th
                  scope="col"
                  className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider"
                >
                  Description
                </th>
                <th
                  scope="col"
                  className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider"
                >
                  Users
                </th>
                <th
                  scope="col"
                  className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider"
                >
                  Created Date
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
              {roles.map((role) => (
                <tr key={role.id} className="hover:bg-gray-750">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <div className="h-8 w-8 rounded-full bg-purple-500/20 flex items-center justify-center">
                        <Shield className="h-4 w-4 text-purple-400" />
                      </div>
                      <div className="ml-3">
                        <p className="text-sm font-medium">{role.name}</p>
                        <p className="text-xs text-gray-400">
                          {role.permissions.length === 1 &&
                          role.permissions[0] === "All permissions"
                            ? "Full Access"
                            : `${role.permissions.length} permissions`}
                        </p>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <p className="text-sm text-gray-300">{role.description}</p>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm">
                    {role.users}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-300">
                    {role.createdAt}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm">
                    <div className="flex space-x-2">
                      <button
                        onClick={() => openEditModal(role)}
                        className="p-1 bg-blue-900/20 text-blue-400 rounded hover:bg-blue-900/40 transition-colors"
                      >
                        <Edit className="h-4 w-4" />
                      </button>
                      <button
                        onClick={() => openDeleteModal(role)}
                        className="p-1 bg-red-900/20 text-red-400 rounded hover:bg-red-900/40 transition-colors"
                        disabled={role.name === "Administrator"}
                      >
                        <Trash2 className="h-4 w-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          {/* Role Details */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Permissions Overview */}
            <div className="bg-gray-800 rounded-xl border border-gray-700 overflow-hidden">
              <div className="p-6 border-b border-gray-700">
                <h2 className="text-lg font-medium">Permissions Overview</h2>
              </div>
              <div className="p-6">
                <div className="space-y-4">
                  {availablePermissions.map((permission) => (
                    <div
                      key={permission}
                      className="flex items-center justify-between"
                    >
                      <span className="text-sm">{permission}</span>
                      <div className="flex space-x-2">
                        {roles
                          .filter(
                            (role) =>
                              role.permissions.includes(permission) ||
                              role.permissions.includes("All permissions")
                          )
                          .map((role) => (
                            <span
                              key={role.id}
                              className="px-2 py-1 text-xs bg-gray-700 rounded-full"
                            >
                              {role.name}
                            </span>
                          ))}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Quick Stats */}
            <div className="bg-gray-800 rounded-xl border border-gray-700 overflow-hidden">
              <div className="p-6 border-b border-gray-700">
                <h2 className="text-lg font-medium">Role Statistics</h2>
              </div>
              <div className="p-6">
                <div className="grid grid-cols-2 gap-4">
                  <div className="bg-gray-750 p-4 rounded-lg">
                    <h3 className="text-gray-400 text-sm">Total Roles</h3>
                    <p className="text-2xl font-semibold mt-1">
                      {roles.length}
                    </p>
                  </div>
                  <div className="bg-gray-750 p-4 rounded-lg">
                    <h3 className="text-gray-400 text-sm">
                      Total Users Assigned
                    </h3>
                    <p className="text-2xl font-semibold mt-1">
                      {roles.reduce((sum, role) => sum + role.users, 0)}
                    </p>
                  </div>
                  <div className="bg-gray-750 p-4 rounded-lg">
                    <h3 className="text-gray-400 text-sm">Most Common Role</h3>
                    <p className="text-xl font-semibold mt-1">
                      {
                        roles.reduce((prev, current) =>
                          prev.users > current.users ? prev : current
                        ).name
                      }
                    </p>
                  </div>
                  <div className="bg-gray-750 p-4 rounded-lg">
                    <h3 className="text-gray-400 text-sm">
                      Avg Permissions/Role
                    </h3>
                    <p className="text-2xl font-semibold mt-1">
                      {Math.round(
                        roles.reduce(
                          (sum, role) =>
                            sum +
                            (role.permissions[0] === "All permissions"
                              ? availablePermissions.length
                              : role.permissions.length),
                          0
                        ) / roles.length
                      )}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50">
          <div className="bg-gray-800 rounded-xl border border-gray-700 w-full max-w-md p-6">
            {modalType === "delete" ? (
              <>
                <h3 className="text-lg font-medium mb-4">Delete Role</h3>
                <p className="text-gray-300 mb-6">
                  Are you sure you want to delete the "{selectedRole?.name}"
                  role? This action cannot be undone.
                  {selectedRole?.users && selectedRole.users > 0 ? (
                    <span className="block mt-2 text-red-400">
                      Warning: This role has {selectedRole.users} users assigned
                      to it.
                    </span>
                  ) : null}
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
            ) : (
              <>
                <h3 className="text-lg font-medium mb-4">
                  {modalType === "add" ? "Add New Role" : "Edit Role"}
                </h3>
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-400 mb-1">
                      Role Name
                    </label>
                    <input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleInputChange}
                      className="w-full bg-gray-700 border border-gray-600 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                      placeholder="Enter role name"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-400 mb-1">
                      Description
                    </label>
                    <textarea
                      name="description"
                      value={formData.description}
                      onChange={handleInputChange}
                      className="w-full bg-gray-700 border border-gray-600 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                      rows={3}
                      placeholder="Enter role description"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-400 mb-2">
                      Permissions
                    </label>
                    <div className="space-y-2 max-h-48 overflow-y-auto p-2 bg-gray-750 rounded-lg">
                      <div className="flex items-center mb-2">
                        <input
                          type="checkbox"
                          id="all-permissions"
                          checked={formData.permissions.includes(
                            "All permissions"
                          )}
                          onChange={() => {
                            if (
                              formData.permissions.includes("All permissions")
                            ) {
                              setFormData({ ...formData, permissions: [] });
                            } else {
                              setFormData({
                                ...formData,
                                permissions: ["All permissions"],
                              });
                            }
                          }}
                          className="h-4 w-4 text-blue-500 focus:ring-blue-500 border-gray-600 rounded"
                        />
                        <label
                          htmlFor="all-permissions"
                          className="ml-2 text-sm font-medium"
                        >
                          All permissions (Administrator)
                        </label>
                      </div>
                      <div className="border-t border-gray-700 my-2"></div>
                      {availablePermissions.map((permission) => (
                        <div key={permission} className="flex items-center">
                          <input
                            type="checkbox"
                            id={`permission-${permission}`}
                            checked={
                              formData.permissions.includes(permission) ||
                              formData.permissions.includes("All permissions")
                            }
                            onChange={() => togglePermission(permission)}
                            disabled={formData.permissions.includes(
                              "All permissions"
                            )}
                            className="h-4 w-4 text-blue-500 focus:ring-blue-500 border-gray-600 rounded"
                          />
                          <label
                            htmlFor={`permission-${permission}`}
                            className="ml-2 text-sm"
                          >
                            {permission}
                          </label>
                        </div>
                      ))}
                    </div>
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
                    {modalType === "add" ? "Add Role" : "Save Changes"}
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
