import React from 'react'
// import IndividualOrder from './IndividualOrder'
import { PackageSearch } from 'lucide-react'
import { getOrders } from '@/lib/api'
import IndividualOrder from './IndividualOrder'
import { auth } from '@/auth'
import { OrderType } from '@/lib/type'
import { redirect } from 'next/navigation'

const OrderContainer = async () => {

  const session = await auth()
  const loggedInUserEmail = session?.user?.email
  const orders = await getOrders(loggedInUserEmail)

  if (!session){
      redirect("/")
  }


  if (!orders || orders.length == 0) {
    return (
      <div className="w-full py-20 px-6 text-center bg-gray-50 rounded-lg">
        <div className="flex flex-col items-center space-y-4">
          <div className="bg-white p-4 rounded-full shadow">
            <PackageSearch className="w-10 h-10 text-gray-400" />
          </div>
          <h2 className="text-2xl font-semibold text-gray-400">Si ordenes Aún</h2>
          <p className="text-gray-500 max-w-md">Parece que no hay ordenes relizadas aún. Cuando las realices aparecerán aqui</p>
        </div>
      </div>
    )
  }

  return (
    <section className="main-max-auto mx-auto padding-x py-12">
      <div className="text-center mb-8">
        <h2 className="text-3xl font-bold text-gray-900 max-sm:text-xl">Tus Ordenes</h2>
        <p className="text-gray-600 mt-2 text-base max-w-md mx-auto">Aquí están todos los artículos que ha Ordenado. Realice su seguimiento fácilmente.</p>
      </div>
      <div className="wf-full max-h-[500px] overflow-y-auto px-6 py-4 bg-white rounded-xl shadow-md space-y-6 border border-gray-200">

        {orders.map((order: OrderType) => <IndividualOrder key={order.id} order={order}/>)}
        
      </div>
    </section>
    )

}

export default OrderContainer