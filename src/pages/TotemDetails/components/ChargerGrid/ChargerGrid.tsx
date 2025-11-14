import React from "react";
import type { Charger } from "../../../../types/charger";
import ChargerSlot from "../ChargerSlot/ChargerSlot";
import "./ChargerGrid.css";

interface ChargerGridProps {
  chargers: Charger[];
  onSelectCharger: (chargerId: string) => void;
}

const ChargerGrid: React.FC<ChargerGridProps> = ({
  chargers,
  onSelectCharger,
}) => {
  if (chargers.length === 0) {
    return (
      <div className="charger-grid__empty">
        <p>Nenhum carregador encontrado neste totem.</p>
      </div>
    );
  }

  return (
    <div className="charger-grid">
      {chargers.map((charger) => (
        <ChargerSlot
          key={charger.id}
          charger={charger}
          onSelect={onSelectCharger}
        />
      ))}
    </div>
  );
};

export default ChargerGrid;

