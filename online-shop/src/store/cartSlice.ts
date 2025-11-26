import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import type { Product } from "../types/Product";

export interface CartItem extends Product {
  quantity: number;
}

interface CartState {
  items: CartItem[];
  currentUser: string | null;
}

const getStorageKey = (user: string) => `cart_${user}`;

const loadCart = (user: string | null): CartItem[] => {
  if (!user) return [];
  const stored = localStorage.getItem(getStorageKey(user));
  return stored ? JSON.parse(stored) : [];
};

const saveCart = (user: string | null, items: CartItem[]) => {
  if (!user) return;
  localStorage.setItem(getStorageKey(user), JSON.stringify(items));
};

const initialState: CartState = {
  items: [],
  currentUser: null,
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    setCartUser: (state, action: PayloadAction<string>) => {
      state.currentUser = action.payload;
      state.items = loadCart(action.payload);
    },

    addToCart: (state, action: PayloadAction<Product>) => {
      if (!state.currentUser) return;

      const existing = state.items.find((i) => i.id === action.payload.id);

      if (existing) {
        existing.quantity += 1;
      } else {
        state.items.push({ ...action.payload, quantity: 1 });
      }

      saveCart(state.currentUser, state.items);
    },

    increaseQuantity: (state, action: PayloadAction<number>) => {
      const item = state.items.find((i) => i.id === action.payload);
      if (item) item.quantity++;
      saveCart(state.currentUser, state.items);
    },

    decreaseQuantity: (state, action: PayloadAction<number>) => {
      const item = state.items.find((i) => i.id === action.payload);
      if (item) {
        item.quantity--;
        if (item.quantity <= 0) {
          state.items = state.items.filter((i) => i.id !== action.payload);
        }
      }
      saveCart(state.currentUser, state.items);
    },

    clearCart: (state) => {
      state.items = [];
      saveCart(state.currentUser, state.items);
    },
  },
});

export const {
  setCartUser,
  addToCart,
  increaseQuantity,
  decreaseQuantity,
  clearCart,
} = cartSlice.actions;

export default cartSlice.reducer;
