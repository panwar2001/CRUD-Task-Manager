import { configureStore } from '@reduxjs/toolkit'
import dataReducer from './dataSlice';
export const store = configureStore({
  reducer: {
    Data: dataReducer,
  },
})
export type RootState=ReturnType<typeof store.getState>;
