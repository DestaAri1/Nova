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

export interface UserData {
  id: string;
  name: string;
  email: string;
  role: string;
  status: "Active" | "Inactive" | "Pending";
  lastLogin: string;
  phone?: string;
  avatar?: string;
  department?: string;
  joinedDate: string;
}
