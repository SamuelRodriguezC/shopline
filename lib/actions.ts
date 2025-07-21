"use server"

import { signOut } from "@/auth"
import { api } from "./api"
import { revalidatePath } from "next/cache"

export async function signOutUser(){
    await signOut({redirectTo: "/"})
}

// Crear un acción de servidor para permitir a los usuarios añadir reseñas 
// a un producto
export async function createReviewAction(formData: FormData){

    //Obtener los datos del formualario 
    const product_id = formData.get("product_id")
    const email = formData.get("email")
    const rating = Number(formData.get("rating"))
    const review = formData.get("review")

    const slug = formData.get("slug")

    if(!product_id || !email || !rating || !review || !slug){
        throw new Error("All fields are required")
    }

    const reviewObj = {product_id, email, rating, review}

    // Intentar enviar los datos al backend
    try{
        const response = await api.post("add_review/", reviewObj)
        // Invalida la caché de la ruta dinámica del producto para que al visitarla se muestre la información actualizada.
        revalidatePath(`products/${slug}`)
        // Recibir las respuesta del servidor
        return response.data
    }
     catch(err:unknown){
        // Si el error es instacia de la clase Error
        if(err instanceof Error){
            // Lanzar el mensaje del error
            throw new Error(err.message)
        }
        // De lo contrario lanzar un mensaje generico
        throw new Error("Un Error Desconocido ha Ocurrido") 
     }

}