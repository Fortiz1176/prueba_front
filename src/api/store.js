import { configureStore } from "@reduxjs/toolkit";
import { apiSlice } from './apiSlice';

import charactersReducer from "../pages/Characters/services/charactersSlice";

export const store = configureStore({
  reducer: {
    [apiSlice.reducerPath]: apiSlice.reducer,
    characters: charactersReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(apiSlice.middleware),
});


export const rootReducer = (state, action) => {
  if(action.type === 'RESET_ALL'){
    state = undefined;
  }
  return store(state, action);
}
