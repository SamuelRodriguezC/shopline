import React from 'react'
import NavBar from './NavBar'
import { auth } from '@/auth'

const NavBarContainer = async () => {
    const session = await auth()
    const user = session?.user

    // Validación: solo renderizar si hay un usuario autenticado
    if (!user || !user.name || !user.email || !user.image) {
        return null // o puedes retornar un loading, fallback, etc.
    }

    return (
        <NavBar loggedInUser={{
            name: user.name,
            email: user.email,
            image: user.image
        }} />
    )
}

export default NavBarContainer