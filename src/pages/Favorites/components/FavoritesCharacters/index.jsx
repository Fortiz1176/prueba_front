import { useState } from "react";
// Importa el hook directamente para acceder a la lista de favoritos
import { useFavorites } from "../../hooks/useFavorites"; 
import ModalGlobal from "../../../../components/Modals/ModalGlobal";
import { useNavigate } from "react-router-dom";
// Asumiendo que CharacterCard fue modificado para recibir charData
import { CharacterCard } from "../../../../components/CharacterCard/index"; 

const FavoritesCharacters = () => {
  // 1. Llama al hook directamente para obtener la lista de favoritos
  const { favorites, toggleFavorite, isFavorite } = useFavorites();

  // El console.log que solicitaste:
  console.log("Datos de Personajes Favoritos:", favorites, toggleFavorite, isFavorite);
  console.log(localStorage)

  const navigate = useNavigate();
  const [currentCharacter, setCurrentCharacter] = useState(null);
  const [modalCharacter, setModalCharacter] = useState(false);
  
  // Puedes agregar un estado de búsqueda si quieres filtrar los favoritos
  const [search, setSearch] = useState(""); 
  
  const handleCloseModal = () => {
    setModalCharacter(false);
  };
  
  // Filtrado simple por nombre si hay búsqueda activa
  const filteredFavorites = favorites.filter((char) =>
    char.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-gray-100 px-6 py-10">
      <header className="flex flex-col items-center text-center mb-10">
        <h1 className="text-4xl font-bold text-[#4339F2]">❤️ Mis Personajes Favoritos</h1>
        <p className="text-gray-600 mt-1 text-lg">
          ¡Aquí tienes a tus personajes guardados de Rick and Morty!
        </p>

        {/* Botón de Regreso */}
        <div className="mt-6 flex justify-start w-full max-w-6xl">
            <button
                onClick={() => navigate("/")}
                className="bg-gray-200 shadow-sm px-4 py-2 rounded-lg hover:shadow-md transition text-gray-700 font-medium"
            >
                ← Volver a la Lista Principal
            </button>
        </div>
      </header>

      {/* VISUALIZACIÓN DE FAVORITOS */}
      <div className="max-w-6xl mx-auto bg-white p-6 rounded-xl shadow-lg">
        {favorites.length === 0 ? (
          <p className="text-gray-500 text-center py-10 text-xl">
            Aún no has agregado ningún personaje a favoritos.
          </p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {filteredFavorites.map((character) => (
              <CharacterCard 
                key={character.id} 
                id={character.id}
                name={character.name}
                image={character.image}
                charData={character} // Le pasamos el objeto completo
                onClick={() => {
                    // Abrir modal de detalles
                    setCurrentCharacter(character);
                    setModalCharacter(true);
                }}
              /> 
            ))}
          </div>
        )}
      </div>

      {/* MODAL */}
      {currentCharacter && (
        <ModalGlobal
          isOpen={modalCharacter}
          onClose={handleCloseModal}
          name={currentCharacter.name}
          status={currentCharacter.status}
          gender={currentCharacter.gender}
          species={currentCharacter.species}
          origin={currentCharacter.origin?.name || "Desconocido"}
          location={currentCharacter.location?.name || "Desconocida"}
          image={currentCharacter.image}
        ></ModalGlobal>
      )}
    </div>
  );
};

export default FavoritesCharacters;