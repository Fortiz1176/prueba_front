import { useState, useEffect, useCallback } from "react";
// Importa el tipo Characters (ajusta la ruta si es necesario)
import type { Characters } from "../../../types/characters";

// Clave para guardar en localStorage
const FAVORITES_KEY = "rickandmorty_favorites_local"; // <<<--- CLAVE USADA POR EL HOOK

export const useFavorites = () => {
  // Estado para almacenar los personajes favoritos
  const [favorites, setFavorites] = useState<Characters[]>([]); // Función para cargar los favoritos de localStorage

  const loadFavorites = useCallback((): Characters[] => {
    try {
      const storedFavorites = localStorage.getItem(FAVORITES_KEY); // Si no hay datos, devuelve un array vacío
      if (!storedFavorites) {
        return [];
      } // Intenta parsear los datos. Si falla (datos corruptos), captura el error.

      const parsedFavorites: Characters[] = JSON.parse(storedFavorites);
      return parsedFavorites;
    } catch (error) {
      console.error(
        "Error al cargar o parsear favoritos de localStorage:",
        error
      ); // Devuelve un array vacío en caso de error
      return [];
    }
  }, []); // **Efecto 1: Cargar favoritos al montar el componente**

  useEffect(() => {
    setFavorites(loadFavorites());
  }, [loadFavorites]); // **Efecto 2: Guardar favoritos cada vez que el estado cambia**

  useEffect(() => {
    try {
      // Guarda el estado actual en localStorage
      localStorage.setItem(FAVORITES_KEY, JSON.stringify(favorites));
    } catch (error) {
      console.error("Error al guardar favoritos en localStorage:", error);
    }
  }, [favorites]); // Función para verificar si un personaje ya es favorito (por ID)

  const isFavorite = useCallback(
    (characterId: number): boolean => {
      return favorites.some((char) => char.id === characterId);
    },
    [favorites]
  ); // Función para agregar/quitar un personaje de favoritos (recibe el objeto completo)

  const toggleFavorite = useCallback((character: Characters) => {
    setFavorites((prevFavorites) => {
      const isCurrentlyFavorite = prevFavorites.some(
        (char) => char.id === character.id
      );

      if (isCurrentlyFavorite) {
        // Quitar de favoritos
        return prevFavorites.filter((char) => char.id !== character.id);
      } else {
        // Agregar a favoritos
        return [...prevFavorites, character];
      }
    });
  }, []);

  return {
    favorites, // Exporta la lista de favoritos
    isFavorite,
    toggleFavorite,
  };
};
