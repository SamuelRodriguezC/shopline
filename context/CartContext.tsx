"use client"

import { generateRandomString } from "@/lib/utils";
import React, { createContext, useContext, useEffect, useState } from "react";


// Define la interfaz que describe el contenido del contexto del carrito
interface CartContextProps {
    cartCode: string | null;    // Código único del carrito (se almacena en localStorage)
    cartItemCount: number; // Cantidad de ítems en el carrito
    setCartItemsCount: React.Dispatch<React.SetStateAction<number>>; // Función para actualizar la cantidad de ítems
    clearCartCode: () => void;  // Función para limpiar el código del carrito
}

// Crea el contexto con el tipo CartContextProps
// Se inicializa en null porque el valor real se establece en el provider
const CartContext = createContext<CartContextProps | null>(null)


// Componente Provider que envuelve a los componentes que necesiten acceder al contexto del carrito
export function CartProvider({children} : {children: React.ReactNode}) {

    // Estado para guardar el código del carrito
    const [cartCode, setCartCode] =  useState<string | null>(null)

    // Estado para contar la cantidad de ítems en el carrito
    const [cartItemCount, setCartItemsCount] = useState(0)

    // Hook que se ejecuta una vez cuando el componente se monta (comportamiento similar a componentDidMount)
    useEffect(() => {
        // Intenta obtener el código del carrito desde localStorage
        let code = localStorage.getItem('cartCode')

        // Si no existe, genera uno nuevo y lo guarda en localStorage
        if(!code){
            code = generateRandomString()
            localStorage.setItem('cartCode', code)
        }
        // Actualiza el estado local con el código (nuevo o existente)
        setCartCode(code)

    }, []);

    // Función para limpiar el código del carrito (eliminarlo del localStorage y resetear el estado)
    function clearCartCode(){
        localStorage.removeItem('cartCode')
        setCartCode(null);
    }

    // Devuelve el proveedor del contexto con los valores y funciones necesarias
    return (
        <CartContext.Provider value={{cartCode, cartItemCount, setCartItemsCount, clearCartCode}}>
            {children}
        </CartContext.Provider>
    )
}

export function useCart(){
    const context = useContext(CartContext)
    if(!context){
        throw new Error("Use Cart Debe ser usado dentro de un CartProvider")
    }
    return context
}