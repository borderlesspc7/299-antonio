import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { FaMapMarkerAlt } from "react-icons/fa";
import { totemService } from "../../services/totemService";
import type { Totem, TotemFilters } from "../../types/totem";
import DashboardStats from "./components/DashboardStats/DashboardStats";
import DashboardFilters from "./components/DashboardFilters/DashboardFilters";
import TotemCard from "./components/TotemCard/TotemCard";
import "./Dashboard.css";

const Dashboard: React.FC = () => {
  const navigate = useNavigate();
  const [totems, setTotems] = useState<Totem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [filterStatus, setFilterStatus] =
    useState<TotemFilters["status"]>("todos");

  const mockTotens: Totem[] = [
    {
      id: "1",
      nome: "Totem 1",
      localizacao: "Localização 1",
      endereco: "Endereço 1",
      cidade: "Cidade 1",
      estado: "Estado 1",
      carregadoresDisponiveis: 10,
      carregadoresTotal: 20,
      status: "disponivel",
      createdAt: "2025-01-01",
      updatedAt: "2025-01-01",
    },
  ];

  useEffect(() => {
    loadTotens();
  }, []);

  const loadTotens = async () => {
    try {
      setLoading(true);
      setError(null);
      const data = await totemService.getAllTotens();
      setTotems(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Erro ao carregar totens");
    } finally {
      setLoading(false);
    }
  };

  const handleSelectTotem = (totemId: string) => {
    navigate(`/totem/${totemId}`);
  };

  const stats = totemService.calculateStats(totems);
  const filteredTotens = totemService.filterTotens(
    totems,
    searchTerm,
    filterStatus
  );

  const useMock = totems.length === 0;
  const displayedTotens =
    filteredTotens.length > 0 ? filteredTotens : useMock ? mockTotens : [];
  const showEmptyState = displayedTotens.length === 0;

  if (loading) {
    return (
      <div className="dashboard">
        <div className="dashboard__loading">
          <div className="dashboard__spinner"></div>
          <p>Carregando totens...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="dashboard">
        <div className="dashboard__error">
          <p>{error}</p>
          <button onClick={loadTotens} className="dashboard__retry-btn">
            Tentar novamente
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="dashboard">
      <div className="dashboard__header">
        <div className="dashboard__header-content">
          <h1 className="dashboard__title">Dashboard</h1>
          <p className="dashboard__subtitle">
            Escolha o totem mais próximo para retirar seu carregador.
          </p>
        </div>

        <DashboardStats stats={stats} />
      </div>

      <DashboardFilters
        searchTerm={searchTerm}
        filterStatus={filterStatus}
        onSearchChange={setSearchTerm}
        onFilterChange={setFilterStatus}
      />

      {showEmptyState ? (
        <div className="dashboard__empty">
          <FaMapMarkerAlt className="dashboard__empty-icon" />
          <h3>Nenhum totem encontrado</h3>
          <p>Tente ajustar os filtros ou a busca.</p>
        </div>
      ) : (
        <div className="dashboard__grid">
          {displayedTotens.map((totem) => (
            <TotemCard
              key={totem.id}
              totem={totem}
              onSelect={handleSelectTotem}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default Dashboard;
