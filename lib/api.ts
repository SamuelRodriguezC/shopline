import axios from "axios";


// Crear instancia de axios para usarla como cliente HTTP
const api = axios.create({
    baseURL: "http://127.0.0.1:8000"
})


// Consultar si un usuario ya existe por email
export async function getExtistingUser(email: string | null | undefined){
    try{
    // Enviar solicitud GET al backend para buscar un usuario por su email
        const response = await api.get(`existing_user/${email}`)
        // Capturar la repuesta del servidor
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


// Crear un nuevo usuario en la base de datos
export async function createNewUser(data: 
    {   
        "email": string | undefined | null,
        "username": string | undefined,
        "first_name": string | undefined | null,
        "last_name": string | undefined | null,
        "profile_picture_url": string | null,
    })
    
    {
    try{
        // Enviar solicitud POST al backend para crear un nuevo usuario con los datos proporcionados
        const response = await api.post(`create_user/`, data)
         // Devolver solo los datos relevantes de la respuesta del servidor
        return response.data // Capturar lo que responde la API
    }
    catch(err:unknown){
        // Si el error es instacia de la clase Error
        if(err instanceof Error){
            // Lazar el mensa del error
            throw new Error(err.message)
        }
        // De lo contrario lanzar un mensaje generico
        throw new Error("Un Error Desconocido ha Ocurrido") 

    }
}