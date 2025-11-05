import { api } from "../lib/axios";
import type { User } from "../types/User";

export const fetchAllClients = async (): Promise<User[]> => {
  try {
    const response = await api.get<User[]>("/users");
    return response.data;
  } catch (error) {
    console.error("Erro ao buscar produtos:", error);
    throw error;
  }
};
