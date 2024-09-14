import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { login, LoginResponse } from '../thunks/auth';

interface AuthState {
  loading: boolean;
  error: string | null;
  token: string;
}

const initialState: AuthState = {
  loading: false,
  error: null,
  token: '',
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    logout: (state) => {
      localStorage.removeItem('token');
      localStorage.removeItem('tokenExpiresAt');
      state.token = '';
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(login.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(login.fulfilled, (state, action: PayloadAction<LoginResponse>) => {
        state.loading = false;
        localStorage.setItem('token', action.payload.token);
        state.token = action.payload.token
      })
      .addCase(login.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

export const { logout } = authSlice.actions;
export default authSlice.reducer;
