import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import type { Product } from "../types/Product";
import { saveProducts } from "../services/storageService";

interface ProductState {
  products: Product[];
  searchTerm: string;
}

const initialState: ProductState = {
  products: [],
  searchTerm: "",
};

const productSlice = createSlice({
  name: "products",
  initialState,
  reducers: {
    setProducts: (state, action: PayloadAction<Product[]>) => {
      state.products = action.payload;
      saveProducts(state.products);
    },
    addProduct: (state, action: PayloadAction<Product>) => {
      state.products.push(action.payload);
      saveProducts(state.products);
    },
    updateProduct: (state, action: PayloadAction<Product>) => {
      const index = state.products.findIndex((p) => p.id === action.payload.id);
      if (index !== -1) {
        state.products[index] = action.payload;
        saveProducts(state.products);
      }
    },
    deleteProduct: (state, action: PayloadAction<number>) => {
      state.products = state.products.filter((p) => p.id !== action.payload);
      saveProducts(state.products);
    },
    setSearchTerm: (state, action: PayloadAction<string>) => {
      state.searchTerm = action.payload;
    },
  },
});

export const {
  setProducts,
  addProduct,
  updateProduct,
  deleteProduct,
  setSearchTerm,
} = productSlice.actions;

export default productSlice.reducer;
