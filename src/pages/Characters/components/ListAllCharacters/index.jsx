import { useContext, useState } from "react";
import { CharactersContext } from "../../context/CharactersProvider";
import { MdNavigateBefore, MdNavigateNext } from "react-icons/md";
import { CiSearch } from "react-icons/ci";
import { CiStar } from "react-icons/ci";
import ModalGlobal from "../../../../components/Modals/ModalGlobal";
import { useNavigate } from "react-router-dom";
import { useFavorites } from "../../../Favorites/hooks/useFavorites"; // <--- Importa tu hook
import { CharacterCard } from "../../../../components/CharacterCard/index";

const ListAllCharacters = () => {
  const {
    useCharacters: {
      state: {
        data,
        error,
        isLoading,
        page,
        setPage,
        totalPages,
        nextPage,
        prevPage,
      },
    },
  } = useContext(CharactersContext);

  console.log(data);
  const navigate = useNavigate();
  const [search, setSearch] = useState("");
  const [currentCharacter, setCurrentCharacter] = useState(null);
  const [modalCharacter, setModalCharacter] = useState(false);
  const [favorites, setFavorites] = useState([]);

  const handleCloseModal = () => {
    setModalCharacter(false);
    
  };

  // Función para obtener los números de página con elipsis
  const getPageNumbers = () => {
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
  };
  if (isLoading)
    return <p className="text-center text-gray-500 mt-20">⏳ Cargando...</p>;
  if (error)
    return <p className="text-center text-red-500 mt-20">❌ Error: {error}</p>;

  const filtered = data.filter((char) =>
    char.name.toLowerCase().includes(search.toLowerCase())
  );

  const pageNumbers = getPageNumbers();

  return (
    <div className="min-h-screen bg-gray-100 px-6 py-10">
      <header className="flex flex-col items-center text-center mb-10">
        <h1 className="text-4xl font-bold">Ejercicio frontend</h1>
        <p className="text-gray-600 mt-1 text-lg">
          Base de datos de personajes
        </p>

        <div className="flex justify-between flex-col md:flex-row gap-4 w-full max-w-6xl">
          {/* SEARCH INPUT */}
          <div className="flex mt-6">
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
          </div>
          {/* FAVORITES BUTTON */}
          <div className="mt-6 flex justify-end">
            <button
              onClick={() => navigate("/favorites")}
              className="flex items-center gap-2 bg-gray-200 shadow-sm px-4 py-2 rounded-lg hover:shadow-md transition"
            >
              <span className="font-medium">Mis favoritos</span>
              <span className="bg-[#4339F2] rounded-md p-1 text-white">
                <CiStar size={25} />
              </span>
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
      <div className="flex justify-center">
        <div className="flex items-center gap-2">
          {/* Botón Anterior */}
          <button
            onClick={prevPage}
            disabled={page === 1}
            className={`flex items-center justify-center w-10 h-10 rounded-lg border transition-all ${
              page === 1
                ? "bg-gray-300 text-gray-400 border-gray-300 cursor-not-allowed"
                : "bg-white text-gray-700 border-gray-300 hover:bg-gray-50"
            }`}
          >
            <MdNavigateBefore size={24} />
          </button>

          {/* Números de página */}
          {pageNumbers.map((pageNum, index) => {
            if (pageNum === "...") {
              return (
                <span
                  key={`ellipsis-${index}`}
                  className="flex items-center justify-center w-10 h-10 text-gray-600 font-medium"
                >
                  ...
                </span>
              );
            }

            const isActive = pageNum === page;

            return (
              <button
                key={pageNum}
                onClick={() => setPage(pageNum)}
                className={`flex items-center justify-center w-10 h-10 rounded-lg border font-medium transition-all ${
                  isActive
                    ? "bg-white text-purple-600 border-purple-600"
                    : "bg-white text-gray-700 border-gray-300 hover:bg-gray-50"
                }`}
              >
                {pageNum}
              </button>
            );
          })}

          {/* Botón Siguiente */}
          <button
            onClick={nextPage}
            disabled={page === totalPages}
            className={`flex items-center justify-center w-10 h-10 rounded-lg border transition-all ${
              page === totalPages
                ? "bg-gray-300 text-gray-400 border-gray-300 cursor-not-allowed"
                : "bg-white text-gray-700 border-gray-300 hover:bg-gray-50"
            }`}
          >
            <MdNavigateNext size={24} />
          </button>
        </div>
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

export default ListAllCharacters;
