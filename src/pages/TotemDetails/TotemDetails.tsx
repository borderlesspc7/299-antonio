import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import {
  FaArrowLeft,
  FaMapMarkerAlt,
  FaChargingStation,
  FaCheckCircle,
  FaExclamationCircle,
  FaInfoCircle,
} from "react-icons/fa";
import { totemService } from "../../services/totemService";
import { chargerService } from "../../services/chargerService";
import { useAuth } from "../../hooks/useAuth";
import type { Totem } from "../../types/totem";
import type { Charger } from "../../types/charger";
import ChargerGrid from "./components/ChargerGrid/ChargerGrid";
import "./TotemDetails.css";

const TotemDetails: React.FC = () => {
  const { totemId } = useParams<{ totemId: string }>();
  const navigate = useNavigate();
  const { user } = useAuth();

  const [totem, setTotem] = useState<Totem | null>(null);
  const [chargers, setChargers] = useState<Charger[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedChargerId, setSelectedChargerId] = useState<string | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const [useMockData, setUseMockData] = useState(false);

  // Mock data para totem
  const getMockTotem = (): Totem => ({
    id: totemId || "1",
    nome: "Totem 1",
    localizacao: "Localização 1",
    endereco: "Endereço 1",
    cidade: "Cidade 1",
    estado: "Estado 1",
    carregadoresDisponiveis: 4,
    carregadoresTotal: 6,
    status: "disponivel",
    createdAt: "2025-01-01",
    updatedAt: new Date().toISOString(),
  });

  // Mock data para carregadores
  const getMockChargers = (): Charger[] => [
    {
      id: "charger-1",
      totemId: totemId || "1",
      slotNumber: 1,
      status: "disponivel",
      batteryLevel: 85,
      modelo: "PowerBank 10.000mAh",
      ultimaAtualizacao: new Date().toISOString(),
      createdAt: "2025-01-01",
      updatedAt: new Date().toISOString(),
    },
    {
      id: "charger-2",
      totemId: totemId || "1",
      slotNumber: 2,
      status: "disponivel",
      batteryLevel: 92,
      modelo: "PowerBank 10.000mAh",
      ultimaAtualizacao: new Date().toISOString(),
      createdAt: "2025-01-01",
      updatedAt: new Date().toISOString(),
    },
    {
      id: "charger-3",
      totemId: totemId || "1",
      slotNumber: 3,
      status: "ocupado",
      batteryLevel: 45,
      modelo: "PowerBank 10.000mAh",
      ultimaAtualizacao: new Date().toISOString(),
      ocupadoPor: "user123",
      createdAt: "2025-01-01",
      updatedAt: new Date().toISOString(),
    },
    {
      id: "charger-4",
      totemId: totemId || "1",
      slotNumber: 4,
      status: "disponivel",
      batteryLevel: 100,
      modelo: "PowerBank 10.000mAh",
      ultimaAtualizacao: new Date().toISOString(),
      createdAt: "2025-01-01",
      updatedAt: new Date().toISOString(),
    },
    {
      id: "charger-5",
      totemId: totemId || "1",
      slotNumber: 5,
      status: "manutencao",
      batteryLevel: 0,
      modelo: "PowerBank 10.000mAh",
      ultimaAtualizacao: new Date().toISOString(),
      createdAt: "2025-01-01",
      updatedAt: new Date().toISOString(),
    },
    {
      id: "charger-6",
      totemId: totemId || "1",
      slotNumber: 6,
      status: "disponivel",
      batteryLevel: 78,
      modelo: "PowerBank 10.000mAh",
      ultimaAtualizacao: new Date().toISOString(),
      createdAt: "2025-01-01",
      updatedAt: new Date().toISOString(),
    },
  ];

  useEffect(() => {
    let isMounted = true;

    if (totemId) {
      loadTotemData().catch((err) => {
        if (isMounted) {
          console.error("Erro ao carregar dados:", err);
          setTotem(getMockTotem());
          setChargers(getMockChargers());
          setUseMockData(true);
          setLoading(false);
        }
      });
    }

    return () => {
      isMounted = false;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [totemId]);

  const loadTotemData = async () => {
    if (!totemId) return;

    try {
      setLoading(true);
      setError(null);

      // Tenta buscar dados do Firebase
      try {
        const [totemData, chargersData] = await Promise.all([
          totemService.getTotemById(totemId),
          chargerService.getChargersByTotemId(totemId),
        ]);

        // Se encontrou dados reais, usa eles
        if (totemData && chargersData.length > 0) {
          setTotem(totemData);
          setChargers(chargersData);
          setUseMockData(false);
          return;
        }

        // Se encontrou totem mas não carregadores, usa mock para carregadores
        if (totemData) {
          setTotem(totemData);
          setChargers(getMockChargers());
          setUseMockData(true);
          return;
        }
      } catch (firebaseError) {
        // Se deu erro no Firebase (provavelmente não está conectado)
        console.warn("Firebase não disponível, usando dados mock:", firebaseError);
      }

      // Se chegou aqui, usa mock para tudo
      setTotem(getMockTotem());
      setChargers(getMockChargers());
      setUseMockData(true);
    } catch (err) {
      console.error("Erro ao carregar dados:", err);
      // Em último caso, usa mock
      setTotem(getMockTotem());
      setChargers(getMockChargers());
      setUseMockData(true);
      setError(null);
    } finally {
      setLoading(false);
    }
  };

  const handleSelectCharger = (chargerId: string) => {
    setSelectedChargerId(chargerId);
  };

  const handleConfirmSelection = async () => {
    if (!selectedChargerId || !totemId) return;

    try {
      setIsProcessing(true);
      setError(null);

      // Se está usando mock ou não tem Firebase, simula o processo
      if (useMockData || !user) {
        // Simula um delay
        await new Promise((resolve) => setTimeout(resolve, 1000));
        
        // Redireciona para pagamento
        navigate(`/pagamento/${selectedChargerId}`);
        return;
      }

      // Se tem Firebase conectado, faz as operações reais
      try {
        // Reserva o carregador
        await chargerService.reserveCharger(selectedChargerId, user.uid);

        // Cria registro de retirada
        await chargerService.createWithdrawal(
          selectedChargerId,
          user.uid,
          totemId
        );

        // Redireciona para pagamento
        navigate(`/pagamento/${selectedChargerId}`);
      } catch (firebaseError) {
        console.warn("Erro no Firebase, continuando com mock:", firebaseError);
        // Se deu erro no Firebase, continua mesmo assim (modo mock)
        navigate(`/pagamento/${selectedChargerId}`);
      }
    } catch (err) {
      console.error("Erro ao processar seleção:", err);
      setError(
        err instanceof Error
          ? err.message
          : "Erro ao processar a seleção do carregador"
      );
      setIsProcessing(false);
    }
  };

  const handleCancelSelection = () => {
    setSelectedChargerId(null);
  };

  const stats = chargerService.calculateStats(chargers);
  const selectedCharger = chargers.find((c) => c.id === selectedChargerId);

  if (loading) {
    return (
      <div className="totem-details">
        <div className="totem-details__loading">
          <div className="totem-details__spinner"></div>
          <p>Carregando informações do totem...</p>
        </div>
      </div>
    );
  }

  if (error && !totem) {
    return (
      <div className="totem-details">
        <div className="totem-details__error">
          <FaExclamationCircle className="totem-details__error-icon" />
          <p>{error}</p>
          <button
            onClick={() => navigate("/dashboard")}
            className="totem-details__back-btn"
          >
            Voltar ao Dashboard
          </button>
        </div>
      </div>
    );
  }

  if (!totem) return null;

  return (
    <div className="totem-details">
      <div className="totem-details__header">
        <button
          className="totem-details__back"
          onClick={() => navigate("/dashboard")}
          aria-label="Voltar"
        >
          <FaArrowLeft />
          <span>Voltar</span>
        </button>

        <div className="totem-details__totem-info">
          <h1 className="totem-details__title">{totem.nome}</h1>
          <div className="totem-details__location">
            <FaMapMarkerAlt />
            <span>{totem.localizacao}</span>
          </div>
        </div>

        <div className="totem-details__stats">
          <div className="totem-details__stat">
            <FaChargingStation className="totem-details__stat-icon--primary" />
            <div>
              <span className="totem-details__stat-value">
                {stats.disponiveis}
              </span>
              <span className="totem-details__stat-label">Disponíveis</span>
            </div>
          </div>
          <div className="totem-details__stat">
            <FaCheckCircle className="totem-details__stat-icon--success" />
            <div>
              <span className="totem-details__stat-value">
                {stats.totalCarregadores}
              </span>
              <span className="totem-details__stat-label">Total</span>
            </div>
          </div>
        </div>
      </div>

      <div className="totem-details__instructions">
        <FaInfoCircle className="totem-details__instructions-icon" />
        <p>Selecione um carregador disponível para iniciar o processo.</p>
      </div>

      {error && (
        <div className="totem-details__alert">
          <FaExclamationCircle />
          <span>{error}</span>
        </div>
      )}

      <div className="totem-details__content">
        <ChargerGrid
          chargers={chargers}
          onSelectCharger={handleSelectCharger}
        />
      </div>

      {selectedChargerId && selectedCharger && (
        <div className="totem-details__selection-bar">
          <div className="totem-details__selection-info">
            <FaChargingStation className="totem-details__selection-icon" />
            <div>
              <p className="totem-details__selection-title">
                Carregador Selecionado
              </p>
              <p className="totem-details__selection-subtitle">
                Slot {selectedCharger.slotNumber}
                {selectedCharger.modelo && ` • ${selectedCharger.modelo}`}
              </p>
            </div>
          </div>
          <div className="totem-details__selection-actions">
            <button
              className="totem-details__cancel-btn"
              onClick={handleCancelSelection}
              disabled={isProcessing}
            >
              Cancelar
            </button>
            <button
              className="totem-details__confirm-btn"
              onClick={handleConfirmSelection}
              disabled={isProcessing}
            >
              {isProcessing ? "Processando..." : "Retirar Carregador"}
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default TotemDetails;

