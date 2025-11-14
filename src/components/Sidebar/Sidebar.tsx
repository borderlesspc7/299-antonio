import React from "react";
import {
  FaHome,
  FaChargingStation,
  FaHistory,
  FaCreditCard,
  FaSignOutAlt,
  FaBolt,
  FaChevronRight,
} from "react-icons/fa";
import { useAuth } from "../../hooks/useAuth";
import "./Sidebar.css";
import { useNavigate, useLocation } from "react-router-dom";
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
  { label: "Carregadores", icon: <FaHome />, path: paths.dashboard },
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
  const location = useLocation();
  const { logOut, user } = useAuth();

  const handleLogout = async () => {
    try {
      await logOut();
      navigate("/login");
    } catch (error) {
      console.error("Erro ao fazer logout:", error);
    }
  };

  const isActive = (path: string) => location.pathname === path;

  return (
    <aside className="app-sidebar">
      <div className="app-sidebar__head">
        <div className="app-sidebar__logo">
          <FaBolt />
          <div className="app-sidebar__logo-glow"></div>
        </div>
        <h2 className="app-sidebar__title">PowerDock</h2>
        <p className="app-sidebar__subtitle">Sistema de Carregadores</p>
        <span className="app-sidebar__badge">v1.0</span>
      </div>

      <nav className="app-sidebar__nav">
        {items.map((item) => {
          const active = isActive(item.path);

          return (
            <button
              key={item.label}
              type="button"
              className={`app-sidebar__item ${
                active ? "app-sidebar__item--active" : ""
              }`}
              onClick={() => navigate(item.path)}
              aria-label={`Navegar para ${item.label}`}
            >
              {active && <div className="app-sidebar__item-indicator"></div>}
              <span className="app-sidebar__icon">{item.icon}</span>
              <span className="app-sidebar__label">{item.label}</span>
              <FaChevronRight className="app-sidebar__arrow" />
            </button>
          );
        })}
      </nav>

      <div className="app-sidebar__footer">
        <div className="app-sidebar__user">
          <div className="app-sidebar__user-avatar">
            {user?.name?.charAt(0) || "U"}
          </div>
          <div className="app-sidebar__user-info">
            <p className="app-sidebar__user-name">{user?.name || "Usuário"}</p>
            <p className="app-sidebar__user-email">
              {user?.email || "usuario@email.com"}
            </p>
          </div>
        </div>

        <button
          type="button"
          className="app-sidebar__logout"
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
