import React from "react";
import {
  FaChargingStation,
  FaCheckCircle,
  FaLock,
  FaTools,
  FaBatteryFull,
  FaBatteryHalf,
  FaBatteryQuarter,
} from "react-icons/fa";
import type { Charger } from "../../../../types/charger";
import "./ChargerSlot.css";

interface ChargerSlotProps {
  charger: Charger;
  onSelect: (chargerId: string) => void;
}

const ChargerSlot: React.FC<ChargerSlotProps> = ({ charger, onSelect }) => {
  const getStatusIcon = () => {
    switch (charger.status) {
      case "disponivel":
        return <FaCheckCircle className="charger-slot__status-icon--available" />;
      case "ocupado":
        return <FaLock className="charger-slot__status-icon--occupied" />;
      case "manutencao":
        return <FaTools className="charger-slot__status-icon--maintenance" />;
      case "reservado":
        return <FaLock className="charger-slot__status-icon--reserved" />;
      default:
        return <FaChargingStation className="charger-slot__status-icon--default" />;
    }
  };

  const getStatusText = () => {
    switch (charger.status) {
      case "disponivel":
        return "Disponível";
      case "ocupado":
        return "Ocupado";
      case "manutencao":
        return "Manutenção";
      case "reservado":
        return "Reservado";
      default:
        return "Indisponível";
    }
  };

  const getBatteryIcon = () => {
    if (!charger.batteryLevel) return null;

    if (charger.batteryLevel >= 75) {
      return <FaBatteryFull className="charger-slot__battery--full" />;
    } else if (charger.batteryLevel >= 40) {
      return <FaBatteryHalf className="charger-slot__battery--half" />;
    } else {
      return <FaBatteryQuarter className="charger-slot__battery--low" />;
    }
  };

  const isAvailable = charger.status === "disponivel";

  return (
    <div
      className={`charger-slot ${
        isAvailable ? "charger-slot--available" : "charger-slot--unavailable"
      }`}
      onClick={() => isAvailable && onSelect(charger.id)}
      role="button"
      tabIndex={isAvailable ? 0 : -1}
      aria-label={`Carregador ${charger.slotNumber} - ${getStatusText()}`}
      aria-disabled={!isAvailable}
    >
      <div className="charger-slot__header">
        <div className="charger-slot__number">
          <FaChargingStation className="charger-slot__icon" />
          <span>Slot {charger.slotNumber}</span>
        </div>
        {charger.batteryLevel !== undefined && (
          <div className="charger-slot__battery">
            {getBatteryIcon()}
            <span className="charger-slot__battery-text">
              {charger.batteryLevel}%
            </span>
          </div>
        )}
      </div>

      <div className="charger-slot__body">
        <div className="charger-slot__status">
          {getStatusIcon()}
          <span className="charger-slot__status-text">{getStatusText()}</span>
        </div>

        {charger.modelo && (
          <p className="charger-slot__model">{charger.modelo}</p>
        )}
      </div>

      {isAvailable && (
        <div className="charger-slot__footer">
          <button
            className="charger-slot__select-btn"
            onClick={(e) => {
              e.stopPropagation();
              onSelect(charger.id);
            }}
          >
            Selecionar
          </button>
        </div>
      )}
    </div>
  );
};

export default ChargerSlot;

