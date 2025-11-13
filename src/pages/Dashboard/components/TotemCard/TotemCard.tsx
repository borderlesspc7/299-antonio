import React from "react";
import {
  FaMapMarkerAlt,
  FaChargingStation,
  FaCheckCircle,
  FaExclamationCircle,
} from "react-icons/fa";
import type { Totem } from "../../../../types/totem";
import "./TotemCard.css";

interface TotemCardProps {
  totem: Totem;
  onSelect: (totemId: string) => void;
}

const TotemCard: React.FC<TotemCardProps> = ({ totem, onSelect }) => {
  const getStatusIcon = () => {
    switch (totem.status) {
      case "disponivel":
        return <FaCheckCircle className="totem-card__status-icon--success" />;
      case "manutencao":
        return (
          <FaExclamationCircle className="totem-card__status-icon--warning" />
        );
      default:
        return (
          <FaExclamationCircle className="totem-card__status-icon--danger" />
        );
    }
  };

  const getStatusText = () => {
    switch (totem.status) {
      case "disponivel":
        return "Disponível";
      case "manutencao":
        return "Em Manutenção";
      default:
        return "Indisponível";
    }
  };

  const totalCarregadores = Math.max(totem.carregadoresTotal, 1);
  const availabilityPercentage = Math.min(
    100,
    Math.max(
      0,
      Math.round(
        (totem.carregadoresDisponiveis / totalCarregadores) * 100
      )
    )
  );

  return (
    <div className="totem-card">
      <div className="totem-card__header">
        <div className="totem-card__status">
          {getStatusIcon()}
          <span className="totem-card__status-text">{getStatusText()}</span>
        </div>
      </div>

      <div className="totem-card__body">
        <h3 className="totem-card__title">{totem.nome}</h3>

        <div className="totem-card__info">
          <div className="totem-card__info-item">
            <FaMapMarkerAlt className="totem-card__icon" />
            <span>{totem.localizacao}</span>
          </div>

          <div className="totem-card__info-item">
            <FaChargingStation className="totem-card__icon" />
            <span>
              {totem.carregadoresDisponiveis} de {totem.carregadoresTotal} disponíveis
            </span>
          </div>
        </div>

        <div className="totem-card__availability">
          <div className="totem-card__availability-bar">
            <div
              className="totem-card__availability-fill"
              style={{ width: `${availabilityPercentage}%` }}
            ></div>
          </div>
          <span className="totem-card__availability-text">
            {availabilityPercentage}% disponível
          </span>
        </div>
      </div>

      <div className="totem-card__footer">
        <button
          className="totem-card__btn"
          onClick={() => onSelect(totem.id)}
          disabled={totem.carregadoresDisponiveis === 0}
        >
          Selecionar Totem
        </button>
      </div>
    </div>
  );
};

export default TotemCard;
