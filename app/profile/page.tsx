
// import MiniProductCard from '@/components/order/MiniProductCard'
import OrderContainer from '@/components/order/OrderContainer'
// import PurchasedOrder from '@/components/order/PurchasedOrder'
import Button from '@/components/uiComponents/Button'
import React from 'react'


// Página de perfil del usuario, muestra las órdenes compradas y la lista de deseos.
const ProfilePage = () => {
  // return (
  //   <>
  //   {/* Sección de órdenes compradas */}
  //   <PurchasedOrder />

  // {/* Sección de lista de deseos */}
  //   <section className="main-max-width padding-x mx-auto my-10">
  //   <h2 className="text-center text-2xl font-bold text-gray-800 mt-2 mb-4 max-sm:text-[16px]">
  //       Lista de Deseos
  //   </h2>

  //   {/* Contenedor de productos deseos */}
  //   <div className="flex items-center w-[full] gap-4 px-6 py-6 custom-overflow border border-gray-200 bg-white rounded-lg shadow-sm">
     
  //    <MiniProductCard/>
  //    <MiniProductCard />
  //    <MiniProductCard />
  //    <MiniProductCard />


  //   </div>
  // </section>



  //   </>
  // )

  return (
    <>
      <div className="main-max-widt padding-x py-6 flex-center mx-auto">
        <Button className="address-btn">Agregar direción de envío</Button>
      </div>

      <OrderContainer/>

      {/* <WishlistSection></WishlistSection> */}

    </>
  )

}

export default ProfilePage