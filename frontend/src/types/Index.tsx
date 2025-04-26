export interface NavItem {
  name: string;
  icon: React.ReactNode;
  href: string;
  active?: boolean;
}

export interface StatItem {
  title: string;
  value: string;
  change: string;
  trend: "up" | "down";
}

export interface Order {
  id: string;
  customer: string;
  date: string;
  status: "Delivered" | "Processing" | "Shipped";
  amount: string;
}

export interface ActivityItem {
  id: number;
  icon: React.ReactNode;
  iconBgColor: string;
  iconColor: string;
  title: string;
  description: string;
  time: string;
}

// types/Index.tsx
export interface UserInterface {
  id: number;
  name: string;
  email: string;
  email_verified_at: string | null;
  is_active: number;
  role_id: string;
  created_at: string;
  updated_at: string;
  deleted_at: string | null;
  role: Role;
}

export interface UserData {
  id: number;
  name: string;
  email?: string;
  role?: string;
  status?: string | null;
  phone?: string;
  department?: string;
  joinedDate?: string;
  lastLogin?: string;
}

interface Permission {
  [key: string]: number;
}

interface Role {
  id: string;
  name: string;
  is_active: number;
  permission: Permission[];
}

