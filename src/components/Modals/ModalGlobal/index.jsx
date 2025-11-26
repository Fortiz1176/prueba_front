import { useEffect, useRef, useState } from "react";
import PropTypes from "prop-types";
import { IoMdClose } from "react-icons/io";
import ReactDOM from "react-dom";

export const ModalGlobal = ({
  name = "",
  status = "",
  gender = "",
  species = "",
  origin = "",
  location = "",
  image = "",
  isOpen,
  onClose,
  autoClose = true,
  children,
}) => {
  const [show, setShow] = useState(isOpen);
  const modalRef = useRef(null);

  useEffect(() => {
    if (isOpen) {
      setShow(true);
    } else {
      setTimeout(() => setShow(false), 500);
    }
  }, [isOpen]);

  const handleClickOutside = (event) => {
    if (autoClose) {
      if (modalRef.current && !modalRef.current.contains(event.target)) {
        onClose();
      }
    }
  };

  if (!show) return null;

  return ReactDOM.createPortal(
    <div
      id="modal"
      className={`fixed inset-0 flex items-center justify-center overflow-auto bg-black/60 backdrop-blur-sm z-50 ${
        isOpen
          ? "animate__animated animate__fadeIn"
          : "animate__animated animate__fadeOut"
      }`}
      onClick={handleClickOutside}
    >
      <div
        ref={modalRef}
        className={`bg-white rounded-lg shadow-2xl w-full max-w-sm mx-auto animate__animated ${
          isOpen ? "animate__backInDown" : "animate__backOutUp"
        }`}
      >
        {/* Header con botón cerrar */}
        <div className="relative px-6 pt-4">
          <button
            onClick={onClose}
            className="absolute top-4 right-4 text-red-500 hover:text-red-600 bg-red-200 hover:bg-red-100 rounded-xl px-3 py-1 text-sm font-medium transition-colors flex items-center gap-1"
          >
            Cerrar <IoMdClose size={24} />
          </button>
        </div>

        {/* Imagen del personaje */}
        <div className="px-6 pt-8 pb-4 flex justify-center">
          {image ? (
            <img
              src={image}
              alt={name}
              className="w-48 h-48 rounded-full object-cover border-4 border-gray-200"
            />
          ) : (
            <div className="w-48 h-48 rounded-full bg-gray-300 flex items-center justify-center">
              <div className="w-32 h-32 bg-gray-400 rounded-full"></div>
            </div>
          )}
        </div>

        {/* Nombre */}
        <div className="px-6 pb-3">
          <h3 className="text-center text-xl font-bold text-gray-900">
            {name || "Morty Smith"}
          </h3>
        </div>

        <div className="px-6 pb-6 grid grid-cols-2 gap-3">
          {status && (
            <div className="col-span-1">
              <span className="inline-block w-full text-center rounded-full bg-[#CCEFFF] px-3 py-1.5 text-xs font-normal border border-blue-200">
                <span className="font-semibold">Estado:</span> {status}
              </span>
            </div>
          )}

          {gender && (
            <div className="col-span-1">
              <span className="inline-block w-full text-center rounded-full bg-[#CCD5FF] px-3 py-1.5 text-xs font-normal border border-purple-200">
                <span className="font-semibold">Género:</span> {gender}
              </span>
            </div>
          )}

          {species && (
            <div className="col-span-1">
              <span className="inline-block w-full text-center rounded-full bg-[#CCFFDA] px-3 py-1.5 text-xs font-normal border border-green-200">
                <span className="font-semibold">Especie:</span> {species}
              </span>
            </div>
          )}

          {origin && (
            <div className="col-span-1">
              <span className="inline-block w-full text-center rounded-full bg-[#F7F6CE] px-3 py-1.5 text-xs font-normal border border-amber-200">
                <span className="font-semibold">Origen:</span> {origin}
              </span>
            </div>
          )}

          {location && (
            <div className="col-span-2">
              <span className="inline-block w-full text-center rounded-full bg-[#FAE9D2] px-3 py-1.5 text-xs font-normal border border-teal-200">
                <span className="font-semibold">Ubicación:</span> {location}
              </span>
            </div>
          )}
        </div>

        {/* Children adicionales si los hay */}
        {children && <div className="px-6 pb-6">{children}</div>}
      </div>
    </div>,
    document.body
  );
};
ModalGlobal.propTypes = {
  name: PropTypes.string,
  status: PropTypes.string,
  gender: PropTypes.string,
  species: PropTypes.string,
  origin: PropTypes.string,
  location: PropTypes.string,
  image: PropTypes.string,
  isOpen: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  autoClose: PropTypes.bool,
  children: PropTypes.node,
};

export default ModalGlobal;
