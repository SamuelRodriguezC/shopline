
// import MiniProductCard from '@/components/order/MiniProductCard'
import ProductSectionSkeleton from '@/components/home/ProductSectionSkeleton'
import AddressFormContainer from '@/components/order/AddressFormContainer'
import OrderContainer from '@/components/order/OrderContainer'
import WishlistSection from '@/components/order/WishlistSection'
import { Metadata } from 'next'
// import PurchasedOrder from '@/components/order/PurchasedOrder'
import React, { Suspense } from 'react'


export const metadata: Metadata = {
  title: "Shopline - Perfil",
  description: "...",
};

// Página de perfil del usuario, muestra las órdenes compradas y la lista de deseos.
const ProfilePage = () => {

  return (
    <>
      <div className="main-max-width padding-x py-6 flex-center mx-auto">
        <AddressFormContainer/>        
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