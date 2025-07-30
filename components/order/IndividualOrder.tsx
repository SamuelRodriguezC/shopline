import React from 'react'
import MiniProductCard from './MiniProductCard'
import { ReceiptText } from 'lucide-react'
import { OrderType } from '@/lib/type'
import { timeAgo } from '@/lib/utils'

const IndividualOrder = ({order}: {order: OrderType}) => {

  const orderItems = order.items

  return (
    <div className="w-full border border-gray-200 bg-white px-4 py-4 rounded-lg shadow-md">
    {/* Order Header */}
    <div className="w-full bg-gray-50 px-4 py-3 rounded-md flex items-center justify-between shadow-sm border border-gray-200">

      <div className="flex items-center gap-2">
        <ReceiptText className="w-5 h-5 text-green-600"/>
          <p className="text-sm sm:text-base font-medium text-gray-800 max-sm:hidden">
            ID de Orden:{" "}
            <span className="text-green-600 font-semibold">
              {order.stripe_checkout_id.slice(0, 15) + "..."}
            </span>
          </p>
      </div>



      <small className="text-gray-500 text-xs sm:text-sm">{timeAgo(order.created_at)}</small>
    </div>

    {/* Order Items */}
    <div className="w-full py-4 flex items-center gap-4 custom-overflow">
      {orderItems.map((orderitem) => <MiniProductCard key={orderitem.id} item={orderitem}/>)}
    </div>


  </div>
  )
}

export default IndividualOrder