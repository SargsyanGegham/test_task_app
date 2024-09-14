import { configureStore } from '@reduxjs/toolkit';
import { useDispatch } from 'react-redux';

import authReducer from '@/store/slices/auth';
import DashboardSlice from './slices/dashboard';

export const store = configureStore({
  reducer: {
    auth: authReducer,
    dashboard: DashboardSlice
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export const useAppDispatch: () => AppDispatch = useDispatch;
