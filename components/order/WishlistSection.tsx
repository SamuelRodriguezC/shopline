import { auth } from '@/auth'
import { getWishLists } from '@/lib/api'
import { HeartOff } from 'lucide-react'
import React from 'react'
import MiniProductCard from './MiniProductCard'
import { WishlistType } from '@/lib/type'

const WishlistSection = async () => {

    const session = await auth()
    const loggedInUserEmail = session?.user?.email
    const wishlists = await getWishLists(loggedInUserEmail)
    console.log(wishlists)

    if(!wishlists) {
        return (
            <section className="main-max-width padding-x mx-auto my-16 text-center bg-white p-10 rounded-xl shadow">
                <div className="flex flex-col items-center space-y-4">
                    <div className="bg-red-100 p-4 rounded-full shadow">
                        <HeartOff className="w-8 h-8 text-red-600"/>
                    </div>
                        <h2 className="text-xl font-semibold text-gray-800">Tu lista de deseos está vacía</h2>
                        <p className="text-gray-600 max-w-md">No has añadido productos a tu lista de deseos aún. Empieza a explorar y guardar tus favoritos</p>
                </div>
            </section>
        )
    }

    return (
        <section className="main-max-width padding-x mx-auto my-10">
            <h2 className="text-center text-3xl font-bold text-gray-800 mb-8 max-sm:text-xl">Tu Lista de Deseos</h2>
        
            <div className="flex items-center w-[full] gap-4 px-6 py-6 custom-overflow border border-gray-200 bg-white">
                {wishlists.map((wishlist: WishlistType) => <MiniProductCard key={wishlist.id} item={wishlist}/>)}
            </div>

        </section>
    )

}

export default WishlistSection