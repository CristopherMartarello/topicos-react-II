import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import type { User } from "../types/User";
import { saveClients, getClients } from "../services/storageService";

interface ClientState {
  clients: User[];
}

const initialState: ClientState = {
  clients: getClients(), // pega localStorage ao iniciar
};

const clientSlice = createSlice({
  name: "clients",
  initialState,
  reducers: {
    setClients: (state, action: PayloadAction<User[]>) => {
      state.clients = action.payload;
      saveClients(state.clients);
    },

    addClient: (state, action: PayloadAction<User>) => {
      state.clients.push(action.payload); // redux
      saveClients(state.clients); // localstorage
    },

    updateClient: (state, action: PayloadAction<User>) => {
      const index = state.clients.findIndex((c) => c.id === action.payload.id);
      if (index !== -1) {
        state.clients[index] = action.payload;
        saveClients(state.clients);
      }
    },

    deleteClient: (state, action: PayloadAction<number>) => {
      state.clients = state.clients.filter((c) => c.id !== action.payload);
      saveClients(state.clients);
    },
  },
});

export const { setClients, addClient, updateClient, deleteClient } =
  clientSlice.actions;

export default clientSlice.reducer;
