import React from 'react'
import NavBar from './NavBar'
import { auth } from '@/auth'

const NavBarContainer =  async () => {

    // guardamos la sesión en una constante (diccionario (nombre, email, foto))
    const session = await auth()

    // Obtiene la sesión si existe de lo contrario es undefined
    const user = session?.user

    // Verificamos en la consola si se están obteniendo correctamente 
    // Los datos de las sesión 
    // console.log(session)

    return (
        // Le pasamos la sesión a la barra de navegación 
        <NavBar loggedInUser={user}/>
    )
}

export default NavBarContainer