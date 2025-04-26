import React, { ReactNode } from 'react'

interface LayoutProps {
  children: ReactNode;
}

const UserBox: React.FC<LayoutProps> = ({ children }) => {
    return (
      <div className="bg-gray-800 rounded-xl border border-gray-700 overflow-hidden mb-6">{children}</div>
    );
}

const UserBoxTitle: React.FC = () => {
    return (
      <div className="p-6 border-b border-gray-700">
        <h2 className="text-lg font-medium">System Users</h2>
      </div>
    );
}

export {UserBox, UserBoxTitle};
