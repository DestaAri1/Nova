import React from "react";
import { Link } from "react-router-dom";
import { Package, ShoppingCart, Users, Tag } from "lucide-react";
import { ActivityItem, Order, StatItem } from "../../types/Index";
import DashboarLayout from "../../layout/DashboarLayout.tsx";
import useAuth from "../../hooks/useAuth.tsx";

export const Dashboard: React.FC = () => {
  const {user} = useAuth()
  console.log(user);
  
  // Mock data for dashboard stats
  const stats: StatItem[] = [
    { title: "Total Sales", value: "$12,426", change: "+12%", trend: "up" },
    { title: "Total Orders", value: "1,543", change: "+16%", trend: "up" },
    { title: "Customers", value: "9,721", change: "+8%", trend: "up" },
    {
      title: "Avg. Order Value",
      value: "$124.32",
      change: "-2%",
      trend: "down",
    },
  ];

  // Mock data for recent orders
  const recentOrders: Order[] = [
    {
      id: "#29384",
      customer: "Sarah Johnson",
      date: "Apr 20, 2025",
      status: "Delivered",
      amount: "$125.00",
    },
    {
      id: "#29383",
      customer: "David Chen",
      date: "Apr 19, 2025",
      status: "Processing",
      amount: "$249.99",
    },
    {
      id: "#29382",
      customer: "Emma Wilson",
      date: "Apr 19, 2025",
      status: "Shipped",
      amount: "$89.95",
    },
    {
      id: "#29381",
      customer: "James Miller",
      date: "Apr 18, 2025",
      status: "Delivered",
      amount: "$178.50",
    },
    {
      id: "#29380",
      customer: "Olivia Brown",
      date: "Apr 18, 2025",
      status: "Processing",
      amount: "$349.99",
    },
  ];

  // Mock data for activity feed
  const activityItems: ActivityItem[] = [
    {
      id: 1,
      icon: <Package className="h-4 w-4 text-blue-400" />,
      iconBgColor: "bg-blue-500/20",
      iconColor: "text-blue-400",
      title: "New product added:",
      description: "Premium Watch Series X",
      time: "2 hours ago",
    },
    {
      id: 2,
      icon: <ShoppingCart className="h-4 w-4 text-green-400" />,
      iconBgColor: "bg-green-500/20",
      iconColor: "text-green-400",
      title: "Order #29384 completed",
      description: "by Sarah Johnson",
      time: "4 hours ago",
    },
    {
      id: 3,
      icon: <Users className="h-4 w-4 text-purple-400" />,
      iconBgColor: "bg-purple-500/20",
      iconColor: "text-purple-400",
      title: "New customer registered:",
      description: "James Miller",
      time: "6 hours ago",
    },
    {
      id: 4,
      icon: <Tag className="h-4 w-4 text-yellow-400" />,
      iconBgColor: "bg-yellow-500/20",
      iconColor: "text-yellow-400",
      title: "Discount promotion launched:",
      description: "Spring Sale - 25% OFF",
      time: "8 hours ago",
    },
  ];

  return (
    <DashboarLayout>
      <main className="flex-1 overflow-y-auto bg-gray-900 p-4 lg:p-6">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-6">
            <div>
              <h1 className="text-2xl font-semibold">Dashboard</h1>
              <p className="text-gray-400">Welcome back, Admin User</p>
            </div>
            <div className="mt-4 md:mt-0">
              <button className="bg-gradient-to-r from-blue-500 to-purple-600 px-4 py-2 rounded-lg font-medium hover:opacity-90 transition-opacity">
                Generate Report
              </button>
            </div>
          </div>

          {/* Stats Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
            {stats.map((stat, index) => (
              <div
                key={index}
                className="bg-gray-800 rounded-xl p-6 border border-gray-700 hover:border-gray-600 transition-colors"
              >
                <div className="flex items-center justify-between">
                  <h3 className="text-gray-400 text-sm font-medium">
                    {stat.title}
                  </h3>
                  <span
                    className={`text-xs font-medium px-2 py-1 rounded-full ${
                      stat.trend === "up"
                        ? "bg-green-900/20 text-green-400"
                        : "bg-red-900/20 text-red-400"
                    }`}
                  >
                    {stat.change}
                  </span>
                </div>
                <p className="text-2xl font-semibold mt-2">{stat.value}</p>
              </div>
            ))}
          </div>

          {/* Recent Orders */}
          <div className="bg-gray-800 rounded-xl border border-gray-700 overflow-hidden mb-6">
            <div className="p-6 border-b border-gray-700">
              <h2 className="text-lg font-medium">Recent Orders</h2>
            </div>
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-700">
                <thead className="bg-gray-800">
                  <tr>
                    <th
                      scope="col"
                      className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider"
                    >
                      Order ID
                    </th>
                    <th
                      scope="col"
                      className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider"
                    >
                      Customer
                    </th>
                    <th
                      scope="col"
                      className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider"
                    >
                      Date
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
                      Amount
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-gray-800 divide-y divide-gray-700">
                  {recentOrders.map((order) => (
                    <tr key={order.id} className="hover:bg-gray-750">
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                        {order.id}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm">
                        {order.customer}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-300">
                        {order.date}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span
                          className={`px-2 py-1 text-xs font-medium rounded-full ${
                            order.status === "Delivered"
                              ? "bg-green-900/20 text-green-400"
                              : order.status === "Shipped"
                              ? "bg-blue-900/20 text-blue-400"
                              : "bg-yellow-900/20 text-yellow-400"
                          }`}
                        >
                          {order.status}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm">
                        {order.amount}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <div className="p-4 border-t border-gray-700 text-center">
              <Link
                to="/orders"
                className="text-blue-400 hover:text-blue-300 text-sm font-medium"
              >
                View all orders
              </Link>
            </div>
          </div>

          {/* Activity Feed */}
          <div className="bg-gray-800 rounded-xl border border-gray-700 overflow-hidden">
            <div className="p-6 border-b border-gray-700">
              <h2 className="text-lg font-medium">Recent Activity</h2>
            </div>
            <div className="px-6 py-4">
              <div className="space-y-4">
                {activityItems.map((activity) => (
                  <div key={activity.id} className="flex">
                    <div className="flex-shrink-0">
                      <div
                        className={`h-8 w-8 rounded-full ${activity.iconBgColor} flex items-center justify-center`}
                      >
                        {activity.icon}
                      </div>
                    </div>
                    <div className="ml-4">
                      <p className="text-sm">
                        <span className="font-medium">{activity.title}</span>{" "}
                        <span className="text-gray-300">
                          {activity.description}
                        </span>
                      </p>
                      <p className="text-xs text-gray-400 mt-1">
                        {activity.time}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <div className="p-4 border-t border-gray-700 text-center">
              <Link
                to="/activity"
                className="text-blue-400 hover:text-blue-300 text-sm font-medium"
              >
                View all activity
              </Link>
            </div>
          </div>
        </div>
      </main>
    </DashboarLayout>
  );
};
