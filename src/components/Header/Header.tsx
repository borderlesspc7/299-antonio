import React, { useState, useRef, useEffect } from "react";
import { FaBolt, FaUserCircle, FaBell, FaChevronDown } from "react-icons/fa";
import { useAuth } from "../../hooks/useAuth";
import { useNavigate } from "react-router-dom";
import "./Header.css";

interface HeaderProps {
  onProfileClick?: () => void;
  onNotificationsClick?: () => void;
}

const Header: React.FC<HeaderProps> = ({
  onProfileClick,
  onNotificationsClick,
}) => {
  const [showProfileMenu, setShowProfileMenu] = useState(false);
  const [notificationCount] = useState(3);
  const { user, logOut } = useAuth();
  const navigate = useNavigate();
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setShowProfileMenu(false);
      }
    };

    if (showProfileMenu) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [showProfileMenu]);

  const handleLogout = async () => {
    try {
      await logOut();
      navigate("/login");
    } catch (error) {
      console.error("Erro ao fazer logout:", error);
    }
  };

  return (
    <header className="app-header">
      <div className="app-header__brand">
        <div className="app-header__logo">
          <FaBolt />
          <div className="app-header__logo-pulse"></div>
        </div>
        <div>
          <h1 className="app-header__title">PowerDock</h1>
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
          {notificationCount > 0 && (
            <span className="app-header__badge">{notificationCount}</span>
          )}
        </button>

        <div className="app-header__profile-wrapper" ref={dropdownRef}>
          <button
            type="button"
            className="app-header__profile"
            onClick={() => setShowProfileMenu(!showProfileMenu)}
            aria-label="Perfil do usuário"
          >
            <FaUserCircle />
            <span className="app-header__profile-name">
              {user?.name || "Usuário"}
            </span>
            <FaChevronDown className="app-header__profile-arrow" />
          </button>

          {showProfileMenu && (
            <div className="app-header__dropdown">
              <div className="app-header__dropdown-header">
                <FaUserCircle className="app-header__dropdown-avatar" />
                <div>
                  <p className="app-header__dropdown-name">
                    {user?.name || "Usuário"}
                  </p>
                  <p className="app-header__dropdown-email">
                    {user?.email || "usuario@email.com"}
                  </p>
                </div>
              </div>
              <div className="app-header__dropdown-divider"></div>
              <button
                className="app-header__dropdown-item"
                onClick={onProfileClick}
              >
                Meu Perfil
              </button>
              <button
                className="app-header__dropdown-item"
                onClick={() => navigate("/configuracoes")}
              >
                Configurações
              </button>
              <div className="app-header__dropdown-divider"></div>
              <button
                className="app-header__dropdown-item app-header__dropdown-item--danger"
                onClick={handleLogout}
              >
                Sair
              </button>
            </div>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;
