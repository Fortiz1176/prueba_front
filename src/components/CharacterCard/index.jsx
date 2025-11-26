// src/components/CharacterCard/index.jsx
import { useNavigate } from "react-router-dom";
// Ajusta la ruta si es necesario, pero según tu estructura debería ser:
import { useFavorites } from "../../pages/Favorites/hooks/useFavorites";
import { CiStar } from "react-icons/ci"; // Estrella sin rellenar
import { FaStar } from "react-icons/fa"; // Puedes usar 'fa' de 'react-icons/fa' para la estrella rellena o usar 'CiStar' y darle un color de fondo para simular el relleno.

export const CharacterCard = ({
  id,
  image = "",
  name = "",
  charData,
  onClick,
}) => {
  const { toggleFavorite, isFavorite } = useFavorites();
  const navigate = useNavigate();

  const isCharFavorite = isFavorite(id);

  const handleToggleFavorite = (e) => {
    //Evita que el evento se propague al div contenedor
    e.stopPropagation();
    toggleFavorite(charData); // Llama a la función del hook con los datos del personaje
    console.log(charData)
  };

  return (
    <div
      onClick={onClick}
      className="cursor-pointer p-4 bg-white rounded-lg shadow hover:shadow-md transition relative"
    >
      {/* Imagen del personaje */}
      <img
        src={image}
        alt={name}
        className="w-full h-64 object-cover rounded"
      />

      {/* Nombre del personaje */}
      <h3 className="text-lg font-semibold mt-2">{name}</h3>
      {/* Botón de Favoritos (Posicionado en la parte superior derecha) */}
      <button
        onClick={handleToggleFavorite}
        className="absolute top-70 right-3 p-2 rounded-full bg-gray-200 bg-opacity-70 hover:bg-opacity-90 transition z-10"
      >
        {isCharFavorite ? (
          <FaStar size={15} className="text-[#2D68A2]" />
        ) : (
          <CiStar size={15} className="text-gray-700" />
        )}{" "}
      </button>
    </div>
  );
};
