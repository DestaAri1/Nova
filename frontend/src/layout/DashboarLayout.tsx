import React, { ReactNode, useEffect, useState } from "react";
import SideNav from "../component/Navbar/Dashboard/SideNav.tsx";
import TopNav from "../component/Navbar/Dashboard/TopNav.tsx";
import { Home, User, UserCheck } from "lucide-react";
import { NavItem } from "../types/Index.tsx";
import { DashLayout, DashMain } from "../component/DashPage.tsx";
import useUser from "../hooks/useUser.tsx";

interface DashboarLayoutProps {
  children: ReactNode;
}

export default function DashboarLayout({ children }: DashboarLayoutProps) {
  const [sidebarOpen, setSidebarOpen] = useState<boolean>(true);
  const [mobileMenuOpen, setMobileMenuOpen] = useState<boolean>(false);
  const [userMenuOpen, setUserMenuOpen] = useState<boolean>(false);
  const [searchQuery, setSearchQuery] = useState<string>("");
  const { user } = useUser()

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
     ...(user?.role?.name === "Administrator"
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
        />
        {children}
      </DashMain>
    </DashLayout>
  );
}
