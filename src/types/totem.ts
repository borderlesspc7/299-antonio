export interface Totem {
  id: string;
  nome: string;
  localizacao: string;
  endereco?: string;
  cidade?: string;
  estado?: string;
  carregadoresDisponiveis: number;
  carregadoresTotal: number;
  status: "disponivel" | "manutencao" | "indisponivel";
  createdAt: string;
  updatedAt: string;
}

export interface TotemFilters {
  searchTerm: string;
  status: "todos" | "disponiveis" | "manutencao";
}

export interface TotemStats {
  totalTotens: number;
  totensDisponiveis: number;
  carregadoresTotal: number;
  carregadoresDisponiveis: number;
}
