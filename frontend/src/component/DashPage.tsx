import React, { ReactNode } from "react";

// Layout Props
interface LayoutProps {
  children: ReactNode;
}

// DashTitle Props dengan kondisi
type DashTitleProps = {
  isActive: boolean;
  title: string;
  text: string;
  buttonTitle?: string;
  icon?: React.ElementType;
  onClick?: () => void
};

const DashLayout: React.FC<LayoutProps> = ({ children }) => {
  return (
    <div className="min-h-screen bg-gray-900 text-white flex">{children}</div>
  );
};

const DashMain: React.FC<LayoutProps> = ({ children }) => {
  return <div className="flex-1 flex flex-col">{children}</div>;
};

const DashMainContent: React.FC<LayoutProps> = ({ children }) => {
  return (
    <div className="flex-1 overflow-y-auto bg-gray-900 p-4 lg:p-6">
      <div className="max-w-7xl mx-auto">{children}</div>
    </div>
  );
};

const DashTitle: React.FC<DashTitleProps> = (props) => {
  const { title, text, isActive } = props;

  return (
    <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-6">
      <div>
        <h1 className="text-2xl font-semibold">{title}</h1>
        <p className="text-gray-400">{text}</p>
      </div>

      {isActive && props.buttonTitle && (
        <div className="mt-4 md:mt-0">
          <button onClick={props.onClick} className="flex items-center bg-gradient-to-r from-blue-500 to-purple-600 px-4 py-2 rounded-lg font-medium hover:opacity-90 transition-opacity">
            {props.icon && <props.icon className="h-4 w-4 mr-2" />}
            {props.buttonTitle}
          </button>
        </div>
      )}
    </div>
  );
};

export { DashLayout, DashMain, DashMainContent, DashTitle };
