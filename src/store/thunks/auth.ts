import { createAsyncThunk } from '@reduxjs/toolkit';

interface LoginRequest {
  username: string;
  password: string;
}

export interface LoginResponse {
  token: string;
}

export const login = createAsyncThunk<LoginResponse, LoginRequest>(
  'auth/login',
  async ({ username, password }, { rejectWithValue }) => {
    try {
      const token = await new Promise<string>((resolve, reject) =>
        setTimeout(() => {
          if(username !== 'admin' && password !== 'password') {
            reject('User not found');
          }
          resolve('d6565f8f8r2hy6j55y654je64cf65w4fh6545y64jy65n6')
        }, 1500)
      );
      return { token };
    } catch (error) {
      return rejectWithValue('Login failed');
    }
  }
);
