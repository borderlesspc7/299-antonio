import { db } from "../lib/firebaseconfig";
import {
  collection,
  getDocs,
  doc,
  getDoc,
  updateDoc,
  query,
  where,
  serverTimestamp,
  addDoc,
} from "firebase/firestore";
import type { Charger, ChargerStats } from "../types/charger";

export const chargerService = {
  /**
   * Busca todos os carregadores de um totem
   */
  async getChargersByTotemId(totemId: string): Promise<Charger[]> {
    try {
      const q = query(
        collection(db, "carregadores"),
        where("totemId", "==", totemId)
      );
      const chargersSnapshot = await getDocs(q);

      const chargers = chargersSnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      })) as Charger[];

      // Ordenar por slot number
      return chargers.sort((a, b) => a.slotNumber - b.slotNumber);
    } catch (error) {
      console.warn("Firebase não disponível, retornando array vazio:", error);
      // Retorna array vazio ao invés de lançar erro
      return [];
    }
  },

  /**
   * Busca um carregador específico por ID
   */
  async getChargerById(chargerId: string): Promise<Charger | null> {
    try {
      const chargerDoc = await getDoc(doc(db, "carregadores", chargerId));

      if (!chargerDoc.exists()) {
        return null;
      }

      return {
        id: chargerDoc.id,
        ...chargerDoc.data(),
      } as Charger;
    } catch (error) {
      console.error("Erro ao buscar carregador:", error);
      throw new Error("Não foi possível carregar o carregador.");
    }
  },

  /**
   * Reserva um carregador para o usuário
   */
  async reserveCharger(
    chargerId: string,
    userId: string
  ): Promise<void> {
    try {
      const chargerRef = doc(db, "carregadores", chargerId);

      await updateDoc(chargerRef, {
        status: "reservado",
        ocupadoPor: userId,
        updatedAt: new Date().toISOString(),
      });
    } catch (error) {
      console.error("Erro ao reservar carregador:", error);
      throw new Error("Não foi possível reservar o carregador.");
    }
  },

  /**
   * Marca um carregador como ocupado
   */
  async occupyCharger(
    chargerId: string,
    userId: string
  ): Promise<void> {
    try {
      const chargerRef = doc(db, "carregadores", chargerId);

      await updateDoc(chargerRef, {
        status: "ocupado",
        ocupadoPor: userId,
        updatedAt: new Date().toISOString(),
      });
    } catch (error) {
      console.error("Erro ao ocupar carregador:", error);
      throw new Error("Não foi possível ocupar o carregador.");
    }
  },

  /**
   * Libera um carregador (marca como disponível)
   */
  async releaseCharger(chargerId: string): Promise<void> {
    try {
      const chargerRef = doc(db, "carregadores", chargerId);

      await updateDoc(chargerRef, {
        status: "disponivel",
        ocupadoPor: null,
        updatedAt: new Date().toISOString(),
      });
    } catch (error) {
      console.error("Erro ao liberar carregador:", error);
      throw new Error("Não foi possível liberar o carregador.");
    }
  },

  /**
   * Calcula estatísticas dos carregadores
   */
  calculateStats(chargers: Charger[]): ChargerStats {
    return {
      totalCarregadores: chargers.length,
      disponiveis: chargers.filter((c) => c.status === "disponivel").length,
      ocupados: chargers.filter((c) => c.status === "ocupado").length,
      manutencao: chargers.filter((c) => c.status === "manutencao").length,
      reservados: chargers.filter((c) => c.status === "reservado").length,
    };
  },

  /**
   * Verifica se um carregador está disponível
   */
  isChargerAvailable(charger: Charger): boolean {
    return charger.status === "disponivel";
  },

  /**
   * Cria registro de retirada de carregador
   */
  async createWithdrawal(
    chargerId: string,
    userId: string,
    totemId: string
  ): Promise<string> {
    try {
      const withdrawalRef = await addDoc(collection(db, "retiradas"), {
        chargerId,
        userId,
        totemId,
        timestamp: new Date().toISOString(),
        status: "pendente",
        createdAt: serverTimestamp(),
      });

      return withdrawalRef.id;
    } catch (error) {
      console.error("Erro ao criar retirada:", error);
      throw new Error("Não foi possível criar o registro de retirada.");
    }
  },
};

