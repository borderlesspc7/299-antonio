import React from "react";
import { FaBolt, FaUserCircle, FaBell } from "react-icons/fa";
import "./Header.css";

interface HeaderProps {
  onProfileClick?: () => void;
  onNotificationsClick?: () => void;
}

const Header: React.FC<HeaderProps> = ({
  onProfileClick,
  onNotificationsClick,
}) => {
  return (
    <header className="app-header">
      <div className="app-header__brand">
        <div className="app-header__logo">
          <FaBolt />
        </div>
        <div>
          <h1 className="app-header__title">Totem de Carregamento</h1>
          <p className="app-header__subtitle">
            Gerencie seus totens e carregadores
          </p>
        </div>
      </div>

      <div className="app-header__actions">
        <button
          type="button"
          className="app-header__icon-button"
          onClick={onNotificationsClick}
          aria-label="Notificações"
        >
          <FaBell />
        </button>

        <button
          type="button"
          className="app-header__profile"
          onClick={onProfileClick}
          aria-label="Perfil"
        >
          <FaUserCircle />
        </button>
      </div>
    </header>
  );
};

export default Header;
