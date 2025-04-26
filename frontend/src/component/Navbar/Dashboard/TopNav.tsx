import { Bell, ChevronDown, LogOut, Menu, Search, User, X } from "lucide-react";
import React from "react";
import { Link } from "react-router-dom";
import { NavItem, UserInterface } from "../../../types/Index.tsx";

export interface TopNavProps {
  mobileMenuOpen: boolean;
  closeMobileMenu: () => void;
  setMobileMenuOpen: React.Dispatch<React.SetStateAction<boolean>>;
  setSearchQuery: (value: string) => void;
  searchQuery: string;
  setUserMenuOpen: React.Dispatch<React.SetStateAction<boolean>>;
  userMenuOpen: boolean;
  navItems: NavItem[];
  user: UserInterface | null;
}

export default function TopNav({
  setMobileMenuOpen,
  searchQuery,
  setSearchQuery,
  setUserMenuOpen,
  userMenuOpen,
  mobileMenuOpen,
  closeMobileMenu,
  navItems,
  user,
}: TopNavProps) {
  return (
    <>
      <header className="bg-gray-800 border-b border-gray-700 h-16 flex items-center justify-between px-4 lg:px-6">
        <div className="flex items-center">
          <button
            className="text-gray-400 hover:text-white lg:hidden"
            onClick={() => setMobileMenuOpen(true)}
          >
            <Menu className="h-6 w-6" />
          </button>

          <div className="ml-4 lg:ml-0 relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Search className="h-5 w-5 text-gray-400" />
            </div>
            <input
              type="text"
              placeholder="Search..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="block w-full pl-10 pr-3 py-2 bg-gray-700 border border-gray-600 rounded-lg text-sm focus:ring-blue-500 focus:border-blue-500 text-white placeholder-gray-400"
            />
          </div>
        </div>

        <div className="flex items-center space-x-4">
          <button className="text-gray-400 hover:text-white relative">
            <Bell className="h-6 w-6" />
            <span className="absolute top-0 right-0 block h-2 w-2 rounded-full bg-blue-500 transform translate-x-1/2 -translate-y-1/2"></span>
          </button>

          <div className="relative">
            <button
              onClick={() => setUserMenuOpen(!userMenuOpen)}
              className="flex items-center text-gray-400 hover:text-white focus:outline-none"
            >
              <div className="h-8 w-8 rounded-full bg-gray-700 flex items-center justify-center border border-gray-600">
                <User className="h-5 w-5" />
              </div>
              <span className="ml-2 hidden lg:block">{user?.name}</span>
              <ChevronDown className="ml-1 h-4 w-4 hidden lg:block" />
            </button>

            {userMenuOpen && (
              <div className="absolute right-0 mt-2 w-48 bg-gray-800 border border-gray-700 rounded-lg shadow-lg py-1 z-10">
                <Link
                  to="/profile"
                  className="block px-4 py-2 text-sm text-gray-300 hover:bg-gray-700"
                >
                  Your Profile
                </Link>
                <Link
                  to="/settings"
                  className="block px-4 py-2 text-sm text-gray-300 hover:bg-gray-700"
                >
                  Settings
                </Link>
                <Link
                  to="/logout"
                  className="block px-4 py-2 text-sm text-gray-300 hover:bg-gray-700"
                >
                  Sign out
                </Link>
              </div>
            )}
          </div>
        </div>
      </header>

      {/* Mobile sidebar */}
      {mobileMenuOpen && (
        <div className="fixed inset-y-0 left-0 z-50 w-64 bg-gray-800 p-4 border-r border-gray-700 overflow-y-auto">
          <div className="flex items-center justify-between mb-4">
            <span className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-500">
              Nova
            </span>
            <button
              onClick={closeMobileMenu}
              className="text-gray-400 hover:text-white"
            >
              <X className="h-6 w-6" />
            </button>
          </div>

          <nav className="space-y-1 mt-4">
            {navItems.map((item) => (
              <Link
                key={item.name}
                to={item.href}
                className={`flex items-center py-3 px-3 rounded-lg transition-colors ${
                  item.active
                    ? "bg-gradient-to-r from-blue-500/20 to-purple-600/20 text-white"
                    : "text-gray-400 hover:text-white hover:bg-gray-700"
                }`}
                onClick={closeMobileMenu}
              >
                {item.icon}
                <span className="ml-3">{item.name}</span>
                {item.active && (
                  <span className="ml-auto h-2 w-2 rounded-full bg-blue-400"></span>
                )}
              </Link>
            ))}
          </nav>

          <div className="pt-4 mt-6 border-t border-gray-700">
            <Link
              to="/logout"
              className="flex items-center py-3 px-3 text-gray-400 rounded-lg hover:text-white hover:bg-gray-700 transition-colors"
              onClick={closeMobileMenu}
            >
              <LogOut className="w-5 h-5" />
              <span className="ml-3">Log out</span>
            </Link>
          </div>
        </div>
      )}
    </>
  );
}
