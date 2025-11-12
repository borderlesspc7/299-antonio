import React from "react";
import Header from "../Header/Header";
import Sidebar, { type SidebarItem } from "../Sidebar/Sidebar";
import "./Layout.css";

interface LayoutProps {
  children: React.ReactNode;
  sidebarItems?: SidebarItem[];
  sidebarFooterAction?: SidebarItem;
  onToggleSidebar?: () => void;
}

const Layout: React.FC<LayoutProps> = ({
  children,
  sidebarItems,
  sidebarFooterAction,
}) => {
  return (
    <div className="app-layout">
      <Sidebar items={sidebarItems} footerAction={sidebarFooterAction} />
      <div className="app-layout__content">
        <Header />
        <main className="app-layout__main">{children}</main>
      </div>
    </div>
  );
};

export default Layout;
