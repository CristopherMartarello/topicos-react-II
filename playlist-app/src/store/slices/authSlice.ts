import { createSlice, type PayloadAction } from '@reduxjs/toolkit';

type AuthState = {
  user: { id: string; email: string } | null;
  loggedIn: boolean;
};

const initialState: AuthState = {
  user: null,
  loggedIn: false,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    loginSuccess(state, action: PayloadAction<{ id: string; email: string }>) {
      state.user = action.payload;
      state.loggedIn = true;
    },
    logout(state) {
      state.user = null;
      state.loggedIn = false;
    },
  },
});

export const { loginSuccess, logout } = authSlice.actions;
export default authSlice.reducer;
