import { useContext, useState } from "react";
import { FavoritesContext } from "../../context";
import ModalGlobal from "../../../../components/Modals/ModalGlobal";
import { useNavigate } from "react-router-dom";
// Asumiendo que CharacterCard fue modificado para recibir charData
import { CharacterCard } from "../../../../components/CharacterCard/index";
import { CiSearch } from "react-icons/ci";
import { GrHomeRounded } from "react-icons/gr";

const FavoritesCharacters = () => {
  const {
    useFavorites: { favorites },
  } = useContext(FavoritesContext);

  const navigate = useNavigate();
  const [search, setSearch] = useState("");
  const [currentCharacter, setCurrentCharacter] = useState(null);
  const [modalCharacter, setModalCharacter] = useState(false);

  const handleCloseModal = () => {
    setModalCharacter(false);
  };

  // Función para obtener los números de página con elipsis
  /* const getPageNumbers = () => {
    const pages = [];
    const showEllipsis = totalPages > 7;

    if (!showEllipsis) {
      for (let i = 1; i <= totalPages; i++) {
        pages.push(i);
      }
    } else {
      if (page <= 3) {
        pages.push(1, 2, "...", totalPages);
      } else if (page >= totalPages - 2) {
        pages.push(
          1,
          "...",
          totalPages - 3,
          totalPages - 2,
          totalPages - 1,
          totalPages
        );
      } else {
        pages.push(1, "...", page - 1, page, page + 1, "...", totalPages);
      }
    }

    return pages;
  }; */
  const filtered = favorites.filter((char) =>
    char.name.toLowerCase().includes(search.toLowerCase())
  );

  /* const pageNumbers = getPageNumbers(); */

  console.log(favorites);
  return (
    <div className="min-h-screen bg-gray-100 px-6 py-10">
      <header className="flex flex-col items-center text-center mb-10">
        <h1 className="text-4xl font-bold">Ejercicio frontend</h1>
        <p className="text-gray-600 mt-1 text-lg">
          Base de datos de personajes
        </p>

        <div className="flex justify-between flex-col md:flex-row gap-4 w-full max-w-6xl">
          {/* SEARCH INPUT */}
          {/* <div className="flex mt-6">
            <div className="flex bg-gray-200 gap-4 rounded-lg">
              <CiSearch className="place-self-center ml-4" size={25} />
              <input
                type="text"
                placeholder="Buscar..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="w-full rounded-lg outline-none"
              />
            </div>
          </div> */}
          {/* FAVORITES BUTTON */}
          <div className="mt-6 flex justify-end">
            <button
              onClick={() => navigate("/characters")}
              className="flex items-center gap-2 bg-gray-200 shadow-sm rounded-lg hover:shadow-md transition"
            >
              <span className="bg-[#4339F2] rounded-md p-1 text-white">
                <GrHomeRounded size={25} />
              </span>
              <span className="font-medium px-4 py-2">Home</span>
            </button>
          </div>
        </div>
      </header>

      {/* GRID DE PERSONAJES */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 max-w-6xl mx-auto mb-12 bg-gray-200 p-10 rounded-lg">
        {filtered.map((char) => (
          <div
            key={char.id}
            className="bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow cursor-pointer overflow-hidden"
          >
            <CharacterCard
              id={char.id}
              name={char.name}
              image={char.image}
              charData={char}
              onClick={() => {
                setCurrentCharacter(char);
                setModalCharacter(true);
              }}
            />
          </div>
        ))}
      </div>

      {/* PAGINACIÓN */}

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
