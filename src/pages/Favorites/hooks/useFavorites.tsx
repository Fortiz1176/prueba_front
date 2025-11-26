import { useState, useEffect } from "react";

export const useFavorites = () => {
  const [favorites, setFavorites] = useState([]);

  // Función para leer el localStorage
  const loadFavorites = () => {
    try {
      const stored = JSON.parse(localStorage.getItem("favorites")) || [];
      setFavorites(stored);
    } catch {
      setFavorites([]);
    }
  };

  useEffect(() => {
    // Leer al cargar el hook
    loadFavorites();

    // Detectar cambios de localStorage hechos en otras pestañas
    const handleStorageChange = (e) => {
      if (e.key === "favorites") {
        loadFavorites();
      }
    };

    window.addEventListener("storage", handleStorageChange);

    return () => {
      window.removeEventListener("storage", handleStorageChange);
    };
  }, []);

  


  return {
    favorites,
    reloadFavorites: loadFavorites, // opcional si quieres recargar manualmente
  };
};
