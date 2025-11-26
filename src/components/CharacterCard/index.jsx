// src/components/CharacterCard/index.jsx
import { useNavigate } from "react-router-dom";
import { CiStar } from "react-icons/ci";
import { FaStar } from "react-icons/fa";
import { useState, useEffect } from "react";

export const CharacterCard = ({
  id,
  image = "",
  name = "",
  charData,
  onClick,
}) => {
  const navigate = useNavigate();
  const [isFavorite, setIsFavorite] = useState(false);

  // Obtener favoritos del localStorage
  const getFavorites = () => {
    return JSON.parse(localStorage.getItem("favorites")) || [];
  };

  // Checar si el personaje ya es favorito
  const checkFavorite = () => {
    const favorites = getFavorites();
    return favorites.some((item) => item.id === id);
  };

  // Al montar el componente, checamos si es favorito
  useEffect(() => {
    setIsFavorite(checkFavorite());
  }, []);

  // Add / Remove - toggle
  const handleToggleFavorite = (e) => {
    e.stopPropagation();

    const favorites = getFavorites();

    // Si ya es favorito → eliminarlo
    if (isFavorite) {
      const updated = favorites.filter((item) => item.id !== id);
      localStorage.setItem("favorites", JSON.stringify(updated));
      setIsFavorite(false);
      return;
    }

    // Si NO es favorito → agregarlo
    const updated = [...favorites, charData];
    localStorage.setItem("favorites", JSON.stringify(updated));
    setIsFavorite(true);
  };

  console.log(localStorage)
  return (
    <div
      onClick={onClick}
      className="cursor-pointer p-4 bg-white rounded-lg shadow hover:shadow-md transition relative animate-fade-in"
    >
      <img
        src={image}
        alt={name}
        className="w-full h-64 object-cover rounded"
      />

      <h3 className="text-lg font-semibold mt-2">{name}</h3>

      <button
        onClick={handleToggleFavorite}
        className="absolute top-70 right-3 p-2 rounded-full bg-gray-200 bg-opacity-70 hover:bg-opacity-90 transition z-10"
      >
        {isFavorite ? (
          <FaStar size={15} className="text-[#2D68A2]" />
        ) : (
          <CiStar size={15} className="text-gray-700" />
        )}
      </button>
    </div>
  );
};
