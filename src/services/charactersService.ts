import { createAsyncThunk } from "@reduxjs/toolkit";
import type { ApiResponse } from "../types/characters";

export const fetchCharacters = createAsyncThunk(
  "characters/fetchCharacters",
  async (page: number, { rejectWithValue }) => {
    try {
      const response = await fetch(
        `https://rickandmortyapi.com/api/character?page=${page}`
      );

      if (!response.ok) {
        throw new Error(`Error ${response.status}: ${response.statusText}`);
      }

      const data: ApiResponse = await response.json();

      return {
        characters: data.results,
        totalPages: data.info.pages,
      };
    } catch (error: any) {
      return rejectWithValue(error.message);
    }
  }
);