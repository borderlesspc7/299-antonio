import React from "react";
import {
  FaHome,
  FaChargingStation,
  FaHistory,
  FaCreditCard,
  FaSignOutAlt,
} from "react-icons/fa";
import { useAuth } from "../../hooks/useAuth";
import "./Sidebar.css";
import { useNavigate } from "react-router-dom";
import { paths } from "../../routes/paths";

export interface SidebarItem {
  label: string;
  icon: React.ReactNode;
  path: string;
  isActive?: boolean;
  onClick?: () => void;
}

interface SidebarProps {
  items?: SidebarItem[];
  footerAction?: SidebarItem;
}

const menuItems: SidebarItem[] = [
  { label: "Dashboard", icon: <FaHome />, path: paths.dashboard },
  {
    label: "Carregadores",
    icon: <FaChargingStation />,
    path: paths.carregadores,
  },
  { label: "Caução", icon: <FaCreditCard />, path: paths.caucao },
  {
    label: "Carregamento",
    icon: <FaChargingStation />,
    path: paths.carregamento,
  },
  { label: "Devolução", icon: <FaSignOutAlt />, path: paths.devolucao },
  { label: "Histórico", icon: <FaHistory />, path: paths.historico },
];

const Sidebar: React.FC<SidebarProps> = ({
  items = menuItems,
  footerAction = {
    label: "Sair",
    icon: <FaSignOutAlt />,
    path: "/logout",
  },
}) => {
  const navigate = useNavigate();
  const { logOut } = useAuth();

  const handleLogout = async () => {
    try {
      await logOut();
      navigate("/login");
    } catch (error) {
      console.error("Erro ao fazer logout:", error);
    }
  };
  return (
    <aside className="app-sidebar">
      <div className="app-sidebar__head">
        <span className="app-sidebar__title">PowerDock</span>
        <span className="app-sidebar__subtitle">
          Gerencie seus totens e carregadores
        </span>
      </div>

      <nav className="app-sidebar__nav">
        {items.map((item) => (
          <button
            key={item.label}
            type="button"
            className={`app-sidebar__item ${
              item.isActive ? "app-sidebar__item--active" : ""
            }`}
            onClick={() => navigate(item.path)}
          >
            <span className="app-sidebar__icon">{item.icon}</span>
            <span className="app-sidebar__label">{item.label}</span>
          </button>
        ))}
      </nav>

      <div className="app-sidebar__footer">
        <button
          type="button"
          className="app-sidebar__item app-sidebar__item--danger"
          onClick={handleLogout}
        >
          <span className="app-sidebar__icon">{footerAction.icon}</span>
          <span className="app-sidebar__label">{footerAction.label}</span>
        </button>
      </div>
    </aside>
  );
};

export default Sidebar;
