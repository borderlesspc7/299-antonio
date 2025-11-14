export interface Charger {
  id: string;
  totemId: string;
  slotNumber: number;
  status: "disponivel" | "ocupado" | "manutencao" | "reservado";
  batteryLevel?: number;
  modelo?: string;
  ultimaAtualizacao: string;
  ocupadoPor?: string; // ID do usuário
  createdAt: string;
  updatedAt: string;
}

export interface ChargerReservation {
  chargerId: string;
  userId: string;
  totemId: string;
  timestamp: string;
  expiresAt: string;
}

export interface ChargerStats {
  totalCarregadores: number;
  disponiveis: number;
  ocupados: number;
  manutencao: number;
  reservados: number;
}

