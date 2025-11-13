import React from "react";
import { FaChargingStation, FaCheckCircle } from "react-icons/fa";
import type { TotemStats } from "../../../../types/totem";
import "./DashboardStats.css";

interface DashboardStatsProps {
  stats: TotemStats;
}

const DashboardStats: React.FC<DashboardStatsProps> = ({ stats }) => {
  return (
    <div className="dashboard-stats">
      <div className="dashboard-stats__card">
        <div className="dashboard-stats__icon dashboard-stats__icon--primary">
          <FaChargingStation />
        </div>
        <div className="dashboard-stats__info">
          <p className="dashboard-stats__label">Total de Totens</p>
          <p className="dashboard-stats__value">{stats.totalTotens}</p>
        </div>
      </div>

      <div className="dashboard-stats__card">
        <div className="dashboard-stats__icon dashboard-stats__icon--success">
          <FaCheckCircle />
        </div>
        <div className="dashboard-stats__info">
          <p className="dashboard-stats__label">Totens Disponíveis</p>
          <p className="dashboard-stats__value">{stats.totensDisponiveis}</p>
        </div>
      </div>

      <div className="dashboard-stats__card">
        <div className="dashboard-stats__icon dashboard-stats__icon--warning">
          <FaChargingStation />
        </div>
        <div className="dashboard-stats__info">
          <p className="dashboard-stats__label">Carregadores Disponíveis</p>
          <p className="dashboard-stats__value">
            {stats.carregadoresDisponiveis} / {stats.carregadoresTotal}
          </p>
        </div>
      </div>
    </div>
  );
};

export default DashboardStats;
