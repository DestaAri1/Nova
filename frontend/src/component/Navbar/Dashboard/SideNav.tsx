import { ChevronDown, LogOut } from "lucide-react";
import React from "react";
import { Link, useLocation } from "react-router-dom";
import { NavItem } from "../../../types/Index";

interface SideNavProps {
  sidebarOpen: boolean;
  toggleSidebar: () => void;
  mobileMenuOpen: boolean;
  closeMobileMenu: () => void;
  navItems: NavItem[];
}

export default function SideNav({
  sidebarOpen,
  toggleSidebar,
  mobileMenuOpen,
  closeMobileMenu,
  navItems,
}: SideNavProps) {
  const location = useLocation();

  return (
    <>
      <aside
        className={`bg-gray-800 fixed lg:static inset-y-0 left-0 z-40 w-64 transform transition-transform duration-300 ease-in-out border-r border-gray-700 ${
          sidebarOpen
            ? "translate-x-0"
            : "-translate-x-full lg:translate-x-0 lg:w-20"
        }`}
      >
        <div className="h-16 flex items-center justify-between px-4 border-b border-gray-700">
          <div className="flex items-center">
            {sidebarOpen ? (
              <span className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-500">
                Nova
              </span>
            ) : (
              <span className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-500">
                N
              </span>
            )}
          </div>
          <button
            onClick={toggleSidebar}
            className="text-gray-400 hover:text-white lg:block hidden"
          >
            {sidebarOpen ? (
              <ChevronDown className="w-5 h-5 transform -rotate-90" />
            ) : (
              <ChevronDown className="w-5 h-5 transform rotate-90" />
            )}
          </button>
        </div>

        <div className="p-4">
          <nav className="space-y-1">
            {navItems.map((item) => {
              const isActive = location.pathname === item.href;

              return (
                <Link
                  key={item.name}
                  to={item.href}
                  className={`flex items-center py-3 px-3 rounded-lg transition-colors ${
                    isActive
                      ? "bg-gradient-to-r from-blue-500/20 to-purple-600/20 text-white"
                      : "text-gray-400 hover:text-white hover:bg-gray-700"
                  }`}
                >
                  <div className="flex items-center">
                    {item.icon}
                    {sidebarOpen && <span className="ml-3">{item.name}</span>}
                  </div>
                  {item.active && sidebarOpen && (
                    <span className="ml-auto h-2 w-2 rounded-full bg-blue-400"></span>
                  )}
                </Link>
              );
            })}
          </nav>

          <div className="pt-4 mt-6 border-t border-gray-700">
            <Link
              to="/logout"
              className="flex items-center py-3 px-3 text-gray-400 rounded-lg hover:text-white hover:bg-gray-700 transition-colors"
            >
              <LogOut className="w-5 h-5" />
              {sidebarOpen && <span className="ml-3">Log out</span>}
            </Link>
          </div>
        </div>
      </aside>
      {mobileMenuOpen && (
        <div
          className="fixed inset-0 bg-gray-900 bg-opacity-75 z-30"
          onClick={closeMobileMenu}
        ></div>
      )}
    </>
  );
}
