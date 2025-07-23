import React from 'react'
import Image from "next/image"
import { Minus, Plus, X } from 'lucide-react'
import Button from '../uiComponents/Button'
import { CartItemType } from '@/lib/type'
import { BASE_URL } from '@/lib/api'

const CartItem = ({cartItem}: {cartItem: CartItemType}) => {

  const sub_total_Format = (cartItem.sub_total).toFixed(3)

  return (
    <div className="flex items-center justify-between gap-6 border-b border-gray-200 py-4 mb-6 w-full flex-wrap bg-white px-4 rounded-lg shadow-sm">
    
        {/* Imagen del producto */}
        <div className="relative overflow-hidden w-[70px] h-[70px] rounded-lg border border-gray-200">
          <Image
            src={`${BASE_URL}/${cartItem.product.image}`}
            alt="cartitem-img"
            className="object-cover"
            fill
          />
        </div>
    
        {/* Detalles del producto - Nombre y precio  */}
        <div className="flex-1 min-w-[120px]">
          <p className="font-semibold text-gray-800">{cartItem.product.name}</p>
          <p className="text-gray-600 text-sm mt-1">${cartItem.product.price}</p>
        </div>
    
        {/* Selector de Cantidad */}
        <div className="flex items-center justify-center gap-2 bg-gray-100 px-2 py-1 rounded-md">
          {/* Disminuir la Cantidad */}
          <button 
            className="p-2 rounded-md bg-white border hover:bg-gray-200 transition disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <Minus className="w-5 h-5 text-gray-700" />
          </button>
    
          {/* Indicador de cantidad*/}
          <div className="w-[50px] h-[40px] flex items-center justify-center font-medium bg-white border border-gray-300 rounded-md shadow-sm">
            {cartItem.quantity}
          </div>
    
          {/* Boton de crementar*/}
          <button 
            className="p-2 rounded-md bg-white border hover:bg-gray-200 transition"
          >
            <Plus className="w-5 h-5 text-gray-700" />
          </button>
        </div>
    
        {/* Subtotal */}
        <p className="text-lg font-semibold text-gray-800">${sub_total_Format}</p>
    
        {/* Boton de quitar producto */}
        <button 
          className="p-2 rounded-md bg-red-50 hover:bg-red-100 transition text-red-500 border border-red-300"
        >
          <X className="w-5 h-5" />
        </button>
    
        {/* boton para actualizar el carrito */}
        <Button className='update-item-btn'>
          Actualizar Carrito
        </Button>
     
      </div>
  )
}

export default CartItem