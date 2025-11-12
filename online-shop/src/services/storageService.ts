import type { Product } from "../types/Product";
import type { User } from "../types/User";

const PRODUCT_STORAGE_KEY = "products";

export const saveProducts = (products: Product[]) => {
  localStorage.setItem(PRODUCT_STORAGE_KEY, JSON.stringify(products));
};

export const getProducts = (): Product[] => {
  const stored = localStorage.getItem(PRODUCT_STORAGE_KEY);
  return stored ? JSON.parse(stored) : [];
};

export const addProduct = (product: Product) => {
  const current = getProducts();
  const updated = [...current, product];
  saveProducts(updated);
  return updated;
};

export const clearProducts = () => {
  localStorage.removeItem(PRODUCT_STORAGE_KEY);
};

const CLIENT_STORAGE_KEY = "clients";

export const saveClients = (clients: User[]) => {
  localStorage.setItem(CLIENT_STORAGE_KEY, JSON.stringify(clients));
};

export const getClients = (): User[] => {
  const stored = localStorage.getItem(CLIENT_STORAGE_KEY);
  return stored ? JSON.parse(stored) : [];
};

export const addClient = (client: User) => {
  const current = getClients();
  const updated = [...current, client];
  saveClients(updated);
  return updated;
};

export const clearClients = () => {
  localStorage.removeItem(CLIENT_STORAGE_KEY);
};
