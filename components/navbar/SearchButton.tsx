import { Search, X } from "lucide-react";
// Importa los íconos de la librería Lucide
// Search: ícono de lupa (buscar)
// X: ícono de "cerrar" (equis)
import React from "react";

// Define los tipos de props que recibe el componente (con TypeScript)
interface Props {
  handleSearch: () => void; // Función que se ejecuta al hacer clic en el botón
  showSearchForm: boolean; // Estado que indica si el formulario está visible
}

// Componente funcional SearchButton que recibe las props desestructuradas
const SearchButton = ({ handleSearch, showSearchForm }: Props) => {
  return (
    <button
      onClick={handleSearch}
      className="size-[30px] rounded-full bg-black flex justify-center items-center cursor-pointer text-white"
    >
      {showSearchForm ? (
        // Si showSearchForm es true, muestra el ícono de cerrar (X)
        <X className="size-4" />
      ) : (
         // Si showSearchForm es false, muestra el ícono de lupa (Search)
        <Search className="size-4" />
      )}
    </button>
  );
};

export default SearchButton;