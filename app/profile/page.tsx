
// import MiniProductCard from '@/components/order/MiniProductCard'
import ProductSectionSkeleton from '@/components/home/ProductSectionSkeleton'
import OrderContainer from '@/components/order/OrderContainer'
import WishlistSection from '@/components/order/WishlistSection'
// import PurchasedOrder from '@/components/order/PurchasedOrder'
import Button from '@/components/uiComponents/Button'
import React, { Suspense } from 'react'


// Página de perfil del usuario, muestra las órdenes compradas y la lista de deseos.
const ProfilePage = () => {

  return (
    <>
      <div className="main-max-width padding-x py-6 flex-center mx-auto">
        <Button className="address-btn">Agregar direción de envío</Button>
      </div>

      <Suspense fallback={<ProductSectionSkeleton/>}> 
          <OrderContainer/>  
      </Suspense>

      <Suspense fallback={<ProductSectionSkeleton/>}>
          <WishlistSection/>
      </Suspense>


    </>
  )

}

export default ProfilePage