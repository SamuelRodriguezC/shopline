"use client";
// Indica que este componente se debe ejecutar en el cliente (usa hooks, eventos, etc.)

import { Star } from "lucide-react";  // Icono de estrella
import React, { useState } from "react";  // React y el hook useState
import Button from "../uiComponents/Button";  // Botón personalizado
import { cn } from "@/lib/utils";  // Función para combinar clases CSS
import { Textarea } from "../ui/textarea";  // Textarea personalizado (probablemente shadcn o tuyo)


// Tipado para las props que usan las funciones de hover y click
interface Props {
    rating: number;
    review: string;
}

const ReviewForm = () => {
    // Estados para hover temporal de estrellas y texto
    const [hoverRating, setHoverRating] = useState(0);
    const [hoverReview, setHoverReview] = useState("");

    // Estados para calificación seleccionada definitivamente
    const [clickedRating, setClickedRating] = useState(0);
    const [clickedReview, setClickedReview] = useState("");

    // Cuando el usuario hace clic en una estrella
    const handleStarClick = ({ rating, review }: Props) => {
        setClickedRating(rating);
        setClickedReview(review);
    };

    // Cuando el usuario pasa el mouse sobre una estrella
    const handleHoverIn = ({ rating, review }: Props) => {
        setHoverRating(rating);
        setHoverReview(review);
    };

     // Cuando el usuario saca el mouse de una estrella
    const handleHoverOut = () => {
        setHoverRating(0);
        setHoverReview("");
    };

    // Lista de opciones de calificación
    const ratings = [
        { rating: 1, review: "Malo" },
        { rating: 2, review: "Regular" },
        { rating: 3, review: "Bueno" },
        { rating: 4, review: "Muy Bueno" },
        { rating: 5, review: "Excelente" },
    ];

    return (
        <div className="w-full mx-auto bg-white rounded-xl p-6">
            <h3 className="text-lg font-semibold text-gray-800 mb-3 text-center">
                Valore y Reseñe este Producto
            </h3>

            <div className="flex items-center justify-center gap-2 mb-4">
                {ratings.map(({ rating, review }) => (
                <Star
                    key={rating}
                    onPointerEnter={() => handleHoverIn({ rating, review })}
                    onPointerLeave={handleHoverOut}
                    onClick={() => handleStarClick({ rating, review })}
                    className={cn(
                    "w-7 h-7 cursor-pointer text-black hover:text-black transition",
                    // Si la estrella está dentro del rango del hover o del click (cuando no hay hover)
                    rating <= hoverRating || (rating <= clickedRating && hoverRating < 1)
                        ? "fill-black" // Se rellena de negro
                        : "" // Si no, se muestra solo el borde
                    )}
                />
                ))}
            </div>

            {/* Texto informativo debajo de las estrellas */}
            <p className="text-center text-gray-600 text-sm">
                {hoverReview || clickedReview || "Puntuación"}
            </p>

            {/* Formulario para enviar la reseña */}
            <form className="flex flex-col gap-4 mt-4">
                <Textarea
                    name="content"
                    className="border border-gray-300 focus:border-blue-500 focus:ring focus:ring-blue-300 rounded-lg p-3 w-full resize-none"
                    placeholder="Escribe tu Reseña"
                    required
                />

                <Button className="bg-black text-white w-full py-2 rounded-lg hover:bg-gray-900 transition">
                    Añadir reseña
                </Button>
            </form>
        </div>
    );
};

export default ReviewForm;