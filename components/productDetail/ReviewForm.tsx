"use client";
// Indica que este componente se debe ejecutar en el cliente (usa hooks, eventos, etc.)

import { Star } from "lucide-react";  // Icono de estrella
import React, { useEffect, useState } from "react";  // React y el hook useState
import Button from "../uiComponents/Button";  // Botón personalizado
import { cn } from "@/lib/utils";  // Función para combinar clases CSS
import { Textarea } from "../ui/textarea";  // Textarea personalizado (probablemente shadcn o tuyo)
import { Product, Review } from "@/lib/type";
import { createReviewAction, updateReviewAction } from "@/lib/actions";
import { toast } from 'react-toastify'



// Tipado para las props que usan las funciones de hover y click
interface Props {
    rating: number;
    review: string;
}

const ReviewForm = ({product, loggedInUserEmail, review, updateReviewForm}: {product: Product, loggedInUserEmail: string | null | undefined, review?: Review, updateReviewForm?: boolean}) => {

    // Extraer el id e slug del producto pasado desde la pagina
    const {id, slug} = product

    // Extrar el rating y texto de la review
    // const {rating, review: reviewMessage} = review

    // Obtener los campos del formulario (review e usuario que realizó la acción)
    const[customerReview, setCustomerReview] = useState("") 

    // Estado para controlar la animación o deshabilitación del botón mientras se envía la reseña
    const [reviewBtnLoader, setReviewBtnLoader] = useState(false);

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

    // 
    useEffect(() => {
        if (updateReviewForm && review){
            const {rating, review: reviewMessage} = review 
            setClickedRating(rating)
            setCustomerReview(reviewMessage)

            const ratingTag = ratings.find((r) => r.rating === rating)
            setClickedReview(ratingTag ? ratingTag.review : "")
        }


    }, [updateReviewForm]);

    async function handleUpdateReview(e: React.FormEvent){
        e.preventDefault()
        const formData = new FormData()
        setReviewBtnLoader(true)
        formData.set("slug", slug)
        formData.set("review", customerReview)
        formData.set("rating", String(clickedRating))
        formData.set("review_id", review? String(review.id) : "")

        try{
            await updateReviewAction(formData)
            toast.success("Reseña Actualizada Correctamente")
        }
         // Mostrar mensaje de error en caso de una falla
        catch(err:unknown){
            if(err instanceof Error){
                toast.error("Un error ha ocurrido, intentalo más tarde.")
                throw new Error(err.message)
            }
            toast.error("Un Error desconocido ha ocurrido..")
            throw new Error("Un Error desconocido ha ocurrido.")
        }
          finally{
            setReviewBtnLoader(false)
        }


        
    }

    // Función para crear la reseña 
    async function handleCreateReview(e: React.FormEvent){
        // Prevenir el comportamiento por defecto del formulario (recarga de página)
        e.preventDefault()

        // Activar el loader del botón para indicar al usuario que la acción está en proceso
        setReviewBtnLoader(true)

        // Crear un objeto FormData para enviar los datos al backend
        const formData = new FormData()

        // Obtener los datos necesario para enviar
        formData.set("product_id" , String(id))
        formData.set("slug" , slug)
        formData.set("review", customerReview)
        formData.set("rating", String(clickedRating))
        formData.set("email", String(loggedInUserEmail))

        // Intentar crear la reseña solicitud al back por medio de la función (createRe..) definida en actions.ts
        try{
            await createReviewAction(formData);
            // Mostrar notificación 
            toast.success("Reseña Añadida Correctamente")
        }
        // Mostrar mensaje de error en caso de una falla
        catch(err:unknown){
            if(err instanceof Error){
                toast.error("Un error ha ocurrido, intentalo más tarde.")
                throw new Error(err.message)
            }
            toast.error("Un Error desconocido ha ocurrido..")
            throw new Error("Un Error desconocido ha ocurrido.")
        }
        // Finalmente, se desactiva el loader del botón sin importar el resultado del intento de crear la reseña
        finally{
            setReviewBtnLoader(false)
        }

    }

    return (
        <div className="w-full mx-auto bg-white rounded-xl p-6">
            <h3 className="text-lg font-semibold text-gray-800 mb-3 text-center">
                Valorar este Producto
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
            <form className="flex flex-col gap-4 mt-4" onSubmit={updateReviewForm ? handleUpdateReview :  handleCreateReview}>
                <Textarea
                    //Nombrar el campo para obtener correctamente su contenido
                    value={customerReview} 
                    // Cuando el usuario escribe en el textarea, este onChange captura el evento,
                    // toma el valor actual del campo (e.target.value) y actualiza el estado customerReview
                    // manteniendo sincronizado el valor del input con el estado interno del componente.
                    onChange={(e) => setCustomerReview(e.target.value)}
                    name="content"
                    className="border border-gray-300 focus:border-blue-500 focus:ring focus:ring-blue-300 rounded-lg p-3 w-full resize-none"
                    placeholder="Escribe tu Reseña"
                    required
                />

                <Button 
                    // Deshabilitar el botón si:
                    // - No se ha seleccionado una calificación (clickedRating < 1)
                    // - El textarea está vacío o solo contiene espacios en blanco
                    // - El botón está en estado de carga (reviewBtnLoader es true)
                    disabled={  clickedRating < 1  ||  ( customerReview && customerReview.trim()).length==0 || reviewBtnLoader } 
                    className="bg-black text-white w-full py-2 rounded-lg hover:bg-gray-900 transition cursor-pointer disabled:opacity-60 disabled:cursor-not-allowed">

                    {/*  */}
                    {/* {reviewBtnLoader ? "Añadiendo Reseña...": "Añadir Reseña"} */}
                    {updateReviewForm ? reviewBtnLoader ? "Acualizando..." :  "Editar Reseña" : reviewBtnLoader ? "Añadiendo..." : "Añadir Reseña"}
                </Button>
            </form>
        </div>
    );
};

export default ReviewForm;