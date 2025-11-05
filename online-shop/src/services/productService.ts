import { api } from "../lib/axios";
import type { Product } from "../types/Product";

export const fetchTop5Products = async (): Promise<Product[]> => {
  try {
    const response = await api.get<Product[]>("/products");
    return response.data.slice(0, 5);
  } catch (error) {
    console.error("Erro ao buscar produtos:", error);
    throw error;
  }
};

export const fetchAllProducts = async (): Promise<Product[]> => {
  try {
    const response = await api.get<Product[]>("/products");
    return response.data;
  } catch (error) {
    console.error("Erro ao buscar produtos:", error);
    throw error;
  }
};
