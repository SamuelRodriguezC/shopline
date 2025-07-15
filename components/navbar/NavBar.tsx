"use client";
// Indica que este componente se ejecutará del lado del cliente (React + Next.js Client Component)

import React, { useState } from "react";
import Link from "next/link"; // Componente de Next.js para navegación sin recargar la página
import SearchForm from "./SearchForm"; // Componente del formulario de bisqueda
import NavItems from "./NavItems"; // Menú de navegación (Para escritorio)
import MobileNavbar from "./MobileNavbar"; // Menú de navegación para celulares 
import SearchButton from "./SearchButton"; //Botón de busqueda para celulares

const NavBar = () => {
    const [showSearchForm, setShowSearchForm] = useState(false);
    // Estado para mostrar u ocultar el formulario de búsqueda en celulares

    const handleSearch = () => {
        setShowSearchForm((curr) => !curr);
        // Alterna el estado se showsearchForm al hacer clic en el botón de búsqueda
    };

    return (
        <>
            {/* Contenedor principal de la barra de navegación  */}
            <div className="flex justify-between items-center main-max-width mx-auto padding-x">
                {/* Link para volver al home */}
                <Link href="/">
                    <h1 className="text-2xl font-extrabold text-gray-900">Shopline</h1>
                </Link>

                {/* Visible solo en pantallas grandes (oculto en <= LG) */}
                <div className="max-lg:hidden">
                    <SearchForm />
                </div>

                {/* Visible solo en pantallas <= LG */}
                <div className="max-lg:block hidden">

                    <SearchButton
                        //Funciona como un interruptor (mostrar/noMostrar) 
                        handleSearch={handleSearch}
                        showSearchForm={showSearchForm}
                    />
                </div>

{               /* Visible en pantallas > MD */}
                <div className="max-md:hidden">
                    <NavItems />
                </div>

                {/* Visible solo en pantallas <= MD */}
                <div className="max-md:block hidden">
                    <MobileNavbar />
                </div>
            </div>

             {/* Si showSearchForm es true, se muestra el buscador en mobile */}
            {showSearchForm && (
                <div className="w-[300px] mx-auto mt-4 max-lg:block hidden">
                    <SearchForm />
                </div>
            )}
        </>
    );
};

export default NavBar;