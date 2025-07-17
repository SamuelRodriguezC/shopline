import NextAuth from "next-auth"
import Google from "next-auth/providers/google"
import { createNewUser, getExtistingUser } from "./lib/api"

// Exportar
//  (handlers: Manejo de rutas API)
//  (singIn: Iniciar Sesión Manualamente)
//  (singOut: Cerrar Sesión Manualamente)
//  (auth: Protección de rutas)
//  (NextAuth: Libreria para autenticación Next.js)

// Configuración de autenticación con NextAuth y Google
export const { handlers, signIn, signOut, auth } = NextAuth({

  // Proveedor de autenticación
  providers: [Google],

  // Funciones que permite personalizar como funciona la autenticación
  callbacks: {

    // Cuando se inicie sesión 
    async signIn({profile}){
      // Intentar extraer los datos del perfil del usuario
      try{
        const email = profile?.email
        const first_name = profile?.given_name
        const last_name = profile?.family_name
        const username = profile?.email?.split("@")[0]
        const profile_picture_url = profile?.picture
        //console.log(profile) //  Verificar si los esta obteniendo correctamente

        // Creamos un objeto usuario con los datos del usurio autenticado
        const userObj = {email, first_name, last_name, username, profile_picture_url};

        try{
          // Esperar que la función encuentre o no un usuario con el email (api.ts)
          await getExtistingUser(email)
        }
        // Si no existe en la base de datos, crear el usuario
        catch(err){
          console.log(err)
          await createNewUser(userObj);
        }

        return true
      }
      catch(err:unknown){
       console.log(err)
       return false
      }

    }

  }

})