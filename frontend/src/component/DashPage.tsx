import React, { ReactNode } from "react";

interface LayoutProps {
  children: ReactNode;
}

const DashLayout: React.FC<LayoutProps> = ({ children }) => {
  return (
    <div className="min-h-screen bg-gray-900 text-white flex">{children}</div>
  );
};

const DashMain: React.FC<LayoutProps> = ({ children }) => {
  return <div className="flex-1 flex flex-col">{children}</div>;
};

export { DashLayout, DashMain };
