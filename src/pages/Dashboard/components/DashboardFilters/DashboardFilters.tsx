import React from "react";
import { FaSearch } from "react-icons/fa";
import type { TotemFilters } from "../../../../types/totem";
import "./DashboardFilters.css";

interface DashboardFiltersProps {
  searchTerm: string;
  filterStatus: TotemFilters["status"];
  onSearchChange: (value: string) => void;
  onFilterChange: (value: TotemFilters["status"]) => void;
}

const DashboardFilters: React.FC<DashboardFiltersProps> = ({
  searchTerm,
  filterStatus,
  onSearchChange,
  onFilterChange,
}) => {
  return (
    <div className="dashboard-filters">
      <div className="dashboard-filters__search">
        <FaSearch className="dashboard-filters__search-icon" />
        <input
          type="text"
          placeholder="Buscar por nome ou localização..."
          value={searchTerm}
          className="dashboard-filters__search-input"
          onChange={(e) => onSearchChange(e.target.value)}
        />
      </div>

      <div className="dashboard-filters__buttons">
        <button
          className={`dashboard-filters__btn ${
            filterStatus === "todos" ? "dashboard-filters__btn--active" : ""
          }`}
          onClick={() => onFilterChange("todos")}
        >
          Todos
        </button>
        <button
          className={`dashboard-filters__btn ${
            filterStatus === "disponiveis"
              ? "dashboard-filters__btn--active"
              : ""
          }`}
          onClick={() => onFilterChange("disponiveis")}
        >
          Disponíveis
        </button>
        <button
          className={`dashboard-filters__btn ${
            filterStatus === "manutencao"
              ? "dashboard-filters__btn--active"
              : ""
          }`}
          onClick={() => onFilterChange("manutencao")}
        >
          Manutenção
        </button>
      </div>
    </div>
  );
};

export default DashboardFilters;
