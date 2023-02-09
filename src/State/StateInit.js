import { configureStore } from '@reduxjs/toolkit';
import AutorisReducer from './AutorisSlice';

export default configureStore({
  reducer: {
    Autoris: AutorisReducer
  }
})