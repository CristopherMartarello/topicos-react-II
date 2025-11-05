import type { Product } from "../types/Product";

const STORAGE_KEY = "products";

export const saveProducts = (products: Product[]) => {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(products));
};

export const getProducts = (): Product[] => {
  const stored = localStorage.getItem(STORAGE_KEY);
  return stored ? JSON.parse(stored) : [];
};

export const addProduct = (product: Product) => {
  const current = getProducts();
  const updated = [...current, product];
  saveProducts(updated);
  return updated;
};

export const clearProducts = () => {
  localStorage.removeItem(STORAGE_KEY);
};
