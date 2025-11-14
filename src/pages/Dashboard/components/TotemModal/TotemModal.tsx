import React, { useEffect } from "react";
import { createPortal } from "react-dom";
import {
  FaMapMarkerAlt,
  FaChargingStation,
  FaCheckCircle,
  FaExclamationCircle,
  FaTimes,
  FaCalendarAlt,
} from "react-icons/fa";
import type { Totem } from "../../../../types/totem";
import "./TotemModal.css";

interface TotemModalProps {
  totem: Totem | null;
  isOpen: boolean;
  onClose: () => void;
  onConfirm: (totemId: string) => void;
}

const TotemModal: React.FC<TotemModalProps> = ({
  totem,
  isOpen,
  onClose,
  onConfirm,
}) => {
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }

    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isOpen]);

  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape" && isOpen) {
        onClose();
      }
    };

    document.addEventListener("keydown", handleEscape);
    return () => {
      document.removeEventListener("keydown", handleEscape);
    };
  }, [isOpen, onClose]);

  if (!isOpen || !totem) return null;

  const getStatusIcon = () => {
    switch (totem.status) {
      case "disponivel":
        return <FaCheckCircle className="totem-modal__status-icon--success" />;
      case "manutencao":
        return (
          <FaExclamationCircle className="totem-modal__status-icon--warning" />
        );
      default:
        return (
          <FaExclamationCircle className="totem-modal__status-icon--danger" />
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
      Math.round((totem.carregadoresDisponiveis / totalCarregadores) * 100)
    )
  );

  const formatDate = (dateString: string) => {
    try {
      const date = new Date(dateString);
      return date.toLocaleDateString("pt-BR", {
        day: "2-digit",
        month: "2-digit",
        year: "numeric",
      });
    } catch {
      return dateString;
    }
  };

  const handleBackdropClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  const handleConfirm = () => {
    onConfirm(totem.id);
    onClose();
  };

  const modalContent = (
    <div className="totem-modal__overlay" onClick={handleBackdropClick}>
      <div className="totem-modal">
        <div className="totem-modal__header">
          <div className="totem-modal__header-content">
            <h2 className="totem-modal__title">{totem.nome}</h2>
            <div className="totem-modal__status">
              {getStatusIcon()}
              <span className="totem-modal__status-text">{getStatusText()}</span>
            </div>
          </div>
          <button
            className="totem-modal__close-btn"
            onClick={onClose}
            aria-label="Fechar modal"
          >
            <FaTimes />
          </button>
        </div>

        <div className="totem-modal__body">
          <div className="totem-modal__section">
            <h3 className="totem-modal__section-title">
              <FaMapMarkerAlt className="totem-modal__section-icon" />
              Localização
            </h3>
            <div className="totem-modal__info-grid">
              <div className="totem-modal__info-item">
                <span className="totem-modal__info-label">Endereço</span>
                <span className="totem-modal__info-value">
                  {totem.localizacao}
                </span>
              </div>
              {totem.endereco && (
                <div className="totem-modal__info-item">
                  <span className="totem-modal__info-label">Endereço Completo</span>
                  <span className="totem-modal__info-value">{totem.endereco}</span>
                </div>
              )}
              {totem.cidade && (
                <div className="totem-modal__info-item">
                  <span className="totem-modal__info-label">Cidade</span>
                  <span className="totem-modal__info-value">{totem.cidade}</span>
                </div>
              )}
              {totem.estado && (
                <div className="totem-modal__info-item">
                  <span className="totem-modal__info-label">Estado</span>
                  <span className="totem-modal__info-value">{totem.estado}</span>
                </div>
              )}
            </div>
          </div>

          <div className="totem-modal__section">
            <h3 className="totem-modal__section-title">
              <FaChargingStation className="totem-modal__section-icon" />
              Carregadores
            </h3>
            <div className="totem-modal__chargers-info">
              <div className="totem-modal__chargers-stats">
                <div className="totem-modal__charger-stat">
                  <span className="totem-modal__charger-number">
                    {totem.carregadoresDisponiveis}
                  </span>
                  <span className="totem-modal__charger-label">Disponíveis</span>
                </div>
                <div className="totem-modal__charger-stat">
                  <span className="totem-modal__charger-number">
                    {totem.carregadoresTotal - totem.carregadoresDisponiveis}
                  </span>
                  <span className="totem-modal__charger-label">Em Uso</span>
                </div>
                <div className="totem-modal__charger-stat">
                  <span className="totem-modal__charger-number">
                    {totem.carregadoresTotal}
                  </span>
                  <span className="totem-modal__charger-label">Total</span>
                </div>
              </div>
              <div className="totem-modal__availability">
                <div className="totem-modal__availability-bar">
                  <div
                    className="totem-modal__availability-fill"
                    style={{ width: `${availabilityPercentage}%` }}
                  ></div>
                </div>
                <span className="totem-modal__availability-text">
                  {availabilityPercentage}% disponível
                </span>
              </div>
            </div>
          </div>

          <div className="totem-modal__section">
            <h3 className="totem-modal__section-title">
              <FaCalendarAlt className="totem-modal__section-icon" />
              Informações
            </h3>
            <div className="totem-modal__info-grid">
              <div className="totem-modal__info-item">
                <span className="totem-modal__info-label">Criado em</span>
                <span className="totem-modal__info-value">
                  {formatDate(totem.createdAt)}
                </span>
              </div>
              <div className="totem-modal__info-item">
                <span className="totem-modal__info-label">Atualizado em</span>
                <span className="totem-modal__info-value">
                  {formatDate(totem.updatedAt)}
                </span>
              </div>
            </div>
          </div>
        </div>

        <div className="totem-modal__footer">
          <button
            className="totem-modal__cancel-btn"
            onClick={onClose}
          >
            Cancelar
          </button>
          <button
            className="totem-modal__confirm-btn"
            onClick={handleConfirm}
            disabled={totem.carregadoresDisponiveis === 0}
          >
            Confirmar Seleção
          </button>
        </div>
      </div>
    </div>
  );

  return createPortal(modalContent, document.body);
};

export default TotemModal;
