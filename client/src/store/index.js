import { configureStore } from '@reduxjs/toolkit';
import authReducer from '../features/auth/authSlice';
import ideasReducer from '../features/ideas/ideasSlice';

export const store = configureStore({
  reducer: {
    auth: authReducer,
    ideas: ideasReducer,
  },
});
