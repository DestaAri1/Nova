import { Edit, Trash2 } from "lucide-react";
import React from "react";
import { UserData } from "../../types/Index";

interface UserTableProps {
  users: UserData[];
  getInitials: (name: string) => string;
  getStatusColor: (status: string) => string;
  onEdit: (user: UserData) => void;
  onDelete: (user: UserData) => void;
}

export default function UserTable({
  users,
  getInitials,
  getStatusColor,
  onEdit,
  onDelete,
}: UserTableProps) {
  return (
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
            {users.map((user) => (
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
            ))}
          </tbody>
        </table>
      </div>
      <div className="p-4 border-t border-gray-700 flex justify-between items-center">
        <p className="text-sm text-gray-400">Showing {users.length} users</p>
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
  );
}
