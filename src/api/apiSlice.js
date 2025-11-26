//createApi genera slices completos para consumir AAPIs y fetchBaseQuery un wrapper de fetch (envuelve fetch para simplificar su uso o añadir funcionalidades personalizadas)

import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query";

const { VITE_API_URL, VITE_ORIGIN_URL } = import.meta.env;

const baseQuery = fetchBaseQuery({
  baseUrl: VITE_API_URL,
  credentials: "include",
  prepareHeaders: async (headers, { getState }) => {
    try {
      //Todo nos ayuda a que las peticiones incluyan la info correcta sin repetir nada
      const res =
        (await getState()?.auth) || JSON.parse(localStorage.getItem("token"));

      if (res?.token || JSON.parse(localStorage.getItem("token"))) {
        headers.set(
          "authorization",
          `${res.token}` || JSON.parse(localStorage.getItem("token"))
        );
      }
      headers.set("Content-Type", "application/json");
      headers.set("Accept", "application/json");
      headers.set("User-Agent", "Rick&Morty");
      headers.set("Origin", VITE_ORIGIN_URL);

      return headers;
    } catch (error) {
      console.log("Error: ", error);
      return headers;
    }
  },
});

export const apiSlice = createApi({
  baseQuery,
  //Elimina el cache en 1 seg
  keepUnusedDataFor: 1,
  tagTypes: ["characters", "favorites"],
  //Aquí van los endpoints de cada apiSlice por eso se deja vacío
  endpoints: (builder) => ({}),
});
