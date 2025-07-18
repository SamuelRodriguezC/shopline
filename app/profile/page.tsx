
import MiniProductCard from '@/components/order/MiniProductCard'
import PurchasedOrder from '@/components/order/PurchasedOrder'
import React from 'react'


// Página de perfil del usuario, muestra las órdenes compradas y la lista de deseados.
const ProfilePage = () => {
  return (
    <>
    {/* Sección de órdenes compradas */}
    <PurchasedOrder />

  {/* Sección de lista de deseados */}
    <section className="main-max-width padding-x mx-auto my-10">
    <h2 className="text-center text-2xl font-bold text-gray-800 mt-2 mb-4 max-sm:text-[16px]">
        Lista de Deseados
    </h2>

    {/* Contenedor de productos deseados */}
    <div className="flex items-center w-[full] gap-4 px-6 py-6 custom-overflow border border-gray-200 bg-white rounded-lg shadow-sm">
     
     <MiniProductCard/>
     <MiniProductCard />
     <MiniProductCard />
     <MiniProductCard />


    </div>
  </section>



    </>
  )
}

export default ProfilePage