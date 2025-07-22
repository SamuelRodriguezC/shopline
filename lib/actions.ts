"use server"

import { signOut } from "@/auth"
import { api } from "./api"
import { revalidatePath } from "next/cache"

export async function signOutUser() {
    await signOut({ redirectTo: "/" })
}

// Acción para actualizar una reseña
export async function updateReviewAction(formData: FormData) {
    const rating = Number(formData.get("rating"))
    const review = formData.get("review")
    const review_id = formData.get("review_id")
    const slug = formData.get("slug")

    // Objeto de la reseña
    const reviewObj = { rating, review }

    // Intentar enviar los datos al back
    try {
        const response = await api.put(`update_review/${review_id}/`, reviewObj)
        revalidatePath(`products/${slug}`)
        return response.data
    }
    catch (err: unknown) {
        // Si el error es instacia de la clase Error
        if (err instanceof Error) {
            // Lanzar el mensaje del error
            throw new Error(err.message)
        }
        // De lo contrario lanzar un mensaje generico
        throw new Error("Un Error Desconocido ha Ocurrido")
    }
}


// Crear un acción de servidor para permitir a los usuarios añadir reseñas 
// a un producto
export async function createReviewAction(formData: FormData) {

    //Obtener los datos del formualario 
    const product_id = formData.get("product_id")
    const email = formData.get("email")
    const rating = Number(formData.get("rating"))
    const review = formData.get("review")

    const slug = formData.get("slug")

    if (!product_id || !email || !rating || !review || !slug) {
        throw new Error("All fields are required")
    }

    const reviewObj = { product_id, email, rating, review }

    // Intentar enviar los datos al backend
    try {
        const response = await api.post("add_review/", reviewObj)
        // Invalida la caché de la ruta dinámica del producto para que al visitarla se muestre la información actualizada.
        revalidatePath(`products/${slug}`)
        // Recibir las respuesta del servidor
        return response.data
    }
    catch (err: unknown) {
        // Si el error es instacia de la clase Error
        if (err instanceof Error) {
            // Lanzar el mensaje del error
            throw new Error(err.message)
        }
        // De lo contrario lanzar un mensaje generico
        throw new Error("Un Error Desconocido ha Ocurrido")
    }

}


export async function deleteReviewAction(formData: FormData) {
    const review_id = Number(formData.get("review_id"))
    const slug = formData.get("slug")

    try {
        const response = await api.delete(`delete_review/${review_id}/`)
        revalidatePath(`products/${slug}`)
        return response.data
    }
    catch (err: unknown) {
        // Si el error es instacia de la clase Error
        if (err instanceof Error) {
            // Lanzar el mensaje del error
            throw new Error(err.message)
        }
        // De lo contrario lanzar un mensaje generico
        throw new Error("Un Error Desconocido ha Ocurrido")
    }
}