//create funciona para crear state, reducer, actions y PayloadAction es para tipar el action.payload
import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import type { Characters } from "../../../types/characters";

interface CharactersState {
  characters: Characters[];
  //por si se hace vista de detalle
  currentCharacter: Characters | null;
  page: number;
  totalPages: number;
  isLoading: boolean;
  error: string | null;
}

const initialState: CharactersState = {
  characters: [],
  currentCharacter: null,
  page: 1,
  //por el momento hasta que la api lo defina
  totalPages: 1,
  isLoading: false,
  error: null,
};

export const charactersSlice = createSlice({
  name: "characters",
  initialState,
  //funciones que modifican el estado
  reducers: {
    //cuando indicas que esta cargando o ya terminó
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.isLoading = action.payload;
    },
    //importante cuando llega la respuesta de la api
    setCharacters: (
      state,
      action: PayloadAction<{ characters: Characters[]; totalPages: number }>
    ) => {
      state.characters = action.payload.characters;
      state.totalPages = action.payload.totalPages;
    },
    //Actualiza el numero de pagina actual (mostrada)
    setPage: (state, action: PayloadAction<number>) => {
      state.page = action.payload;
    },
    setError: (state, action: PayloadAction<string | null>) => {
      state.error = action.payload;
    },
    //para guardar el personaje seleccionado el null por si des seleccionas
    setCurrentCharacter: (state, action: PayloadAction<Characters | null>) => {
      state.currentCharacter = action.payload;
    },
  },
});

export const {
  setCharacters,
  setPage,
  setError,
  setLoading,
  setCurrentCharacter,
} = charactersSlice.actions;

export default charactersSlice.reducer;