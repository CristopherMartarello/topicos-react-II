import { createSlice, type PayloadAction } from "@reduxjs/toolkit";

interface AuthState {
  username: string | null;
  password: string | null;
  token: string | null;
  isAuthenticated: boolean;
}

const initialState: AuthState = {
  username: localStorage.getItem("username"),
  password: localStorage.getItem("password"),
  token: localStorage.getItem("token"),
  isAuthenticated: !!localStorage.getItem("token"),
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    login: (
      state,
      action: PayloadAction<{
        username: string;
        password: string;
        token: string;
      }>
    ) => {
      const { username, password, token } = action.payload;

      state.username = username;
      state.password = password;
      state.token = token;
      state.isAuthenticated = true;

      localStorage.setItem("username", username);
      localStorage.setItem("password", password);
      localStorage.setItem("token", token);
    },
    logout: (state) => {
      state.username = null;
      state.password = null;
      state.token = null;
      state.isAuthenticated = false;

      localStorage.removeItem("username");
      localStorage.removeItem("password");
      localStorage.removeItem("token");
    },
  },
});

export const { login, logout } = authSlice.actions;
export default authSlice.reducer;
