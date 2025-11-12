import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import type { User } from "../types/User";
import { saveClients } from "../services/storageService";

interface ClientState {
  clients: User[];
}

const initialState: ClientState = {
  clients: [],
};

const clientSlice = createSlice({
  name: "clients",
  initialState,
  reducers: {
    setClients: (state, action: PayloadAction<User[]>) => {
      state.clients = action.payload;
      saveClients(state.clients);
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

export const { setClients, updateClient, deleteClient } = clientSlice.actions;
export default clientSlice.reducer;
