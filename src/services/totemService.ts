import { db } from "../lib/firebaseconfig";
import {
  collection,
  getDocs,
  doc,
  getDoc,
  query,
  where,
} from "firebase/firestore";
import type { Totem, TotemStats } from "../types/totem";

const mapFirebaseTotem = (id: string, data: Record<string, unknown>): Totem => {
  const nome =
    (data["nome"] as string | undefined) ??
    (data["name"] as string | undefined) ??
    "Totem";
  const localizacao =
    (data["localizacao"] as string | undefined) ??
    (data["location"] as string | undefined) ??
    "Localização não informada";
  const endereco =
    (data["endereco"] as string | undefined) ??
    (data["address"] as string | undefined);
  const cidade =
    (data["cidade"] as string | undefined) ??
    (data["city"] as string | undefined);
  const estado =
    (data["estado"] as string | undefined) ??
    (data["state"] as string | undefined);
  const carregadoresDisponiveis =
    (data["carregadoresDisponiveis"] as number | undefined) ??
    (data["availableChargers"] as number | undefined) ??
    0;
  const carregadoresTotal =
    (data["carregadoresTotal"] as number | undefined) ??
    (data["totalChargers"] as number | undefined) ??
    carregadoresDisponiveis;
  const status =
    (data["status"] as Totem["status"] | undefined) ?? "disponivel";
  const createdAt =
    (data["createdAt"] as string | undefined) ?? new Date().toISOString();
  const updatedAt =
    (data["updatedAt"] as string | undefined) ?? new Date().toISOString();

  return {
    id,
    nome,
    localizacao,
    endereco,
    cidade,
    estado,
    carregadoresDisponiveis,
    carregadoresTotal,
    status,
    createdAt,
    updatedAt,
  };
};

export const totemService = {
  /**
   * Busca todos os totens do Firebase
   */
  async getAllTotens(): Promise<Totem[]> {
    try {
      const totensSnapshot = await getDocs(collection(db, "totens"));
      const totens = totensSnapshot.docs.map((docSnapshot) =>
        mapFirebaseTotem(docSnapshot.id, docSnapshot.data())
      );

      return totens;
    } catch (error) {
      console.error("Erro ao buscar totens:", error);
      throw new Error("Não foi possível carregar os totens. Tente novamente.");
    }
  },

  /**
   * Busca um totem específico por ID
   */
  async getTotemById(totemId: string): Promise<Totem | null> {
    try {
      const totemDoc = await getDoc(doc(db, "totens", totemId));

      if (!totemDoc.exists()) {
        return null;
      }

      return mapFirebaseTotem(totemDoc.id, totemDoc.data());
    } catch (error) {
      console.error("Erro ao buscar totem:", error);
      throw new Error("Não foi possível carregar o totem.");
    }
  },

  /**
   * Busca totens disponíveis (com carregadores disponíveis)
   */
  async getTotemsDisponiveis(): Promise<Totem[]> {
    try {
      const q = query(
        collection(db, "totens"),
        where("carregadoresDisponiveis", ">", 0)
      );
      const totensSnapshot = await getDocs(q);

      return totensSnapshot.docs.map((docSnapshot) =>
        mapFirebaseTotem(docSnapshot.id, docSnapshot.data())
      );
    } catch (error) {
      console.error("Erro ao buscar totens disponíveis:", error);
      throw new Error("Não foi possível carregar os totens disponíveis.");
    }
  },

  /**
   * Calcula estatísticas dos totens
   */
  calculateStats(totens: Totem[]): TotemStats {
    return {
      totalTotens: totens.length,
      totensDisponiveis: totens.filter(
        (t) => t.carregadoresDisponiveis > 0
      ).length,
      carregadoresTotal: totens.reduce(
        (acc, t) => acc + t.carregadoresTotal,
        0
      ),
      carregadoresDisponiveis: totens.reduce(
        (acc, t) => acc + t.carregadoresDisponiveis,
        0
      ),
    };
  },

  /**
   * Filtra totens com base em critérios
   */
  filterTotens(
    totens: Totem[],
    searchTerm: string,
    statusFilter: string
  ): Totem[] {
    return totens.filter((totem) => {
      const matchesSearch =
        totem.nome.toLowerCase().includes(searchTerm.toLowerCase()) ||
        totem.localizacao.toLowerCase().includes(searchTerm.toLowerCase());

      const matchesStatus =
        statusFilter === "todos" ||
        (statusFilter === "disponiveis" && totem.carregadoresDisponiveis > 0) ||
        (statusFilter === "manutencao" && totem.status === "manutencao");

      return matchesSearch && matchesStatus;
    });
  },
};
