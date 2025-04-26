import { Edit, Eye, Trash2 } from "lucide-react";
import React from "react";
import { UserInterface } from "../../types/Index";

interface UserTableProps {
  users: UserInterface[];
  onEdit: (user: UserInterface) => void;
  onDelete: (user: UserInterface) => void;
  onView: (user: UserInterface) => void;
}

export default function UserTable({
  users,
  onEdit,
  onDelete,
  onView,
}: UserTableProps) {
  // Function to get initials from user name
  const getInitials = (name: string) => {
    return name
      .split(" ")
      .map((part) => part[0])
      .join("")
      .toUpperCase()
      .slice(0, 2);
  };

  // Function to get color based on active status
  const getStatusColor = (isActive: number) => {
    return isActive === 1
      ? "bg-green-900/20 text-green-400"
      : "bg-red-900/20 text-red-400";
  };

  // Function to convert active status number to text
  const getStatusText = (isActive: number) => {
    return isActive === 1 ? "Active" : "Inactive";
  };

  return (
    <>
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
            {users && users.length > 0 ? (
              users.map((user) => (
                <tr key={user.id} className="hover:bg-gray-750">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <div className="h-10 w-10 rounded-full bg-gradient-to-r from-blue-500 to-purple-600 flex items-center justify-center text-white font-medium">
                        {getInitials(user.name)}
                      </div>
                      <div className="ml-3">
                        <p className="text-sm font-medium">{user.name}</p>
                        <p className="text-xs text-gray-400">{user.email}</p>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className="px-2 py-1 text-xs bg-gray-700 rounded-full">
                      {user.role.name}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span
                      className={`px-2 py-1 text-xs font-medium rounded-full ${getStatusColor(
                        user.is_active
                      )}`}
                    >
                      {getStatusText(user.is_active)}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-300">
                    {user.created_at}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm">
                    <div className="flex space-x-2">
                      <button
                        onClick={() => onView(user)}
                        className="p-1 bg-green-900/20 text-green-400 rounded hover:bg-green-900/40 transition-colors"
                      >
                        <Eye className="h-4 w-4" />
                      </button>
                      <button
                        onClick={() => onEdit(user)}
                        className="p-1 bg-blue-900/20 text-blue-400 rounded hover:bg-blue-900/40 transition-colors"
                      >
                        <Edit className="h-4 w-4" />
                      </button>

                      <button
                        onClick={() => onDelete(user)}
                        className="p-1 bg-red-900/20 text-red-400 rounded hover:bg-red-900/40 transition-colors"
                      >
                        <Trash2 className="h-4 w-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={5} className="px-6 py-4 text-center text-gray-400">
                  No users found
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
      <div className="p-4 border-t border-gray-700 flex justify-between items-center">
        <p className="text-sm text-gray-400">
          Showing {users ? users.length : 0} users
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
    </>
  );
}
