import React, { ReactNode, useEffect, useState } from "react";
import SideNav from "../component/Navbar/Dashboard/SideNav.tsx";
import TopNav from "../component/Navbar/Dashboard/TopNav.tsx";
import { Home, User, UserCheck } from "lucide-react";
import { NavItem } from "../types/Index.tsx";
import {
  DashLayout,
  DashMain,
  DashMainContent,
  DashTitle,
} from "../component/DashPage.tsx";
import { getToken } from "../services/TokenSevices.tsx";
import { useUserContext } from "../context/UserContext.tsx";

interface DashboarLayoutProps {
  children: ReactNode;
  text: string;
  title: string;
  isActive: boolean;
  buttonTitle?: string;
  icon?: React.ElementType;
  onClick?: () => void;
}

export default function DashboarLayout({
  children,
  text,
  title,
  isActive,
  buttonTitle,
  icon,
  onClick,
}: DashboarLayoutProps) {
  const [sidebarOpen, setSidebarOpen] = useState<boolean>(true);
  const [mobileMenuOpen, setMobileMenuOpen] = useState<boolean>(false);
  const [userMenuOpen, setUserMenuOpen] = useState<boolean>(false);
  const [searchQuery, setSearchQuery] = useState<string>("");

  const userRole = getToken("role");
  const { user } = useUserContext(); // Menggunakan context untuk user data

  // Handle responsive sidebar
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 1024) {
        setSidebarOpen(false);
      } else {
        setSidebarOpen(true);
      }
    };
    window.addEventListener("resize", handleResize);
    handleResize(); // Initialize on mount
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  const closeMobileMenu = () => {
    setMobileMenuOpen(false);
  };

  const navItems: NavItem[] = [
    {
      name: "Dashboard",
      icon: <Home className="w-5 h-5" />,
      href: "/dashboard",
    },
    {
      name: "Role Management",
      icon: <UserCheck className="w-5 h-5" />,
      href: "/dashboard/role-management",
    },
    ...(userRole === "Administrator"
      ? [
          {
            name: "User Management",
            icon: <User className="w-5 h-5" />,
            href: "/dashboard/users",
          },
        ]
      : []),
  ];

  return (
    <DashLayout>
      <SideNav
        closeMobileMenu={closeMobileMenu}
        mobileMenuOpen={mobileMenuOpen}
        sidebarOpen={sidebarOpen}
        toggleSidebar={toggleSidebar}
        navItems={navItems}
      />
      <DashMain>
        <TopNav
          closeMobileMenu={closeMobileMenu}
          mobileMenuOpen={mobileMenuOpen}
          searchQuery={searchQuery}
          setMobileMenuOpen={setMobileMenuOpen}
          setSearchQuery={setSearchQuery}
          setUserMenuOpen={setUserMenuOpen}
          userMenuOpen={userMenuOpen}
          navItems={navItems}
          user={user}
        />
        <DashMainContent>
          <DashTitle
            title={title}
            text={text}
            isActive={isActive}
            buttonTitle={isActive && buttonTitle ? buttonTitle : undefined}
            icon={isActive && icon ? icon : undefined}
            onClick={onClick}
          />
          {children}
        </DashMainContent>
      </DashMain>
    </DashLayout>
  );
}
