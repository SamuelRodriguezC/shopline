"use client"
import React, { useState } from 'react'
import Image from "next/image"
import { CarIcon, Minus, Plus, X } from 'lucide-react'
import Button from '../uiComponents/Button'
import { CartItemType } from '@/lib/type'
import { BASE_URL } from '@/lib/api'
import { useCart } from '@/context/CartContext'
import { deleteCartitemAction, updateCartItemAction } from '@/lib/actions'
import { toast } from 'react-toastify'
import DeleteModal from '../uiComponents/DeleteModal'

const CartItem = ({ cartItem }: { cartItem: CartItemType }) => {

  const { cartCode, setCartItemsCount } = useCart()

  const sub_total_Format = (cartItem.sub_total).toFixed(3)

  const [quantity, setQuantity] = useState(cartItem.quantity)

  const [cartItemUpdateLoader, setCartItemUpdateLoader] = useState(false)

  const [counter, setCounter] = useState(0)

  function increaseQuantity() {
    setCounter(curr => curr + 1)
    setQuantity(curr => curr + 1)
  }

  function decreaseQuantity() {
    setCounter(curr => curr - 1)
    setQuantity(curr => curr > 1 ? curr - 1 : 0)
  }

  async function handleUpdateCartItem() {
    setCartItemUpdateLoader(true)
    const formData = new FormData()
    formData.set("quantity", String(quantity))
    formData.set("cartitem_id", String(cartItem.id))
    formData.set("cart_code", cartCode ? cartCode : '')

    try {
      await updateCartItemAction(formData)
      setCartItemsCount(curr => curr + counter)
      toast.success(`Item - ${cartItem.product.name} actualizado`)
    }
    catch (err: unknown) {
      if (err instanceof Error) {
        toast.error("Ha Ocurrido un Error")
        throw new Error(err.message)
      }
      toast.error("Error Desconocido")
      throw new Error("Error Desconocido")
    }
    finally {
      setCartItemUpdateLoader(false)
    }

  }

  async function handleDeleteCartitem() {
    const formData = new FormData()
    formData.set("cartitem_id", String(cartItem.id))
    formData.set("cart_code", cartCode ? cartCode : "")

    try {
      await deleteCartitemAction(formData)
      setCartItemsCount(curr => curr - cartItem.quantity )
      toast.success(`Item - ${cartItem.product.name} eliminado del carrito`)
    }
    catch (err: unknown) {
      if (err instanceof Error) {
        toast.error("Ha Ocurrido un Error")
        // setCartItemsCount(curr => curr - cartItem.quantity)
        throw new Error(err.message)
      }
      toast.error("Error Desconocido")
      throw new Error("Error Desconocido")
    }
  }

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
        <button onClick={decreaseQuantity} disabled={quantity <= 1}
          className="p-2 rounded-md bg-white border hover:bg-gray-200 cursor-pointer transition disabled:opacity-50 disabled:cursor-not-allowed"
        >
          <Minus className="w-5 h-5 text-gray-700" />
        </button>

        {/* Indicador de cantidad*/}
        <div className="w-[50px] h-[40px] flex items-center justify-center font-medium bg-white border border-gray-300 rounded-md shadow-sm">
          {quantity}
        </div>

        {/* Boton de crementar*/}
        <button onClick={increaseQuantity}
          className="p-2 rounded-md bg-white border hover:bg-gray-200 cursor-pointer transition"
        >
          <Plus className="w-5 h-5 text-gray-700" />
        </button>
      </div>

      {/* Subtotal */}
      <p className="text-lg font-semibold text-gray-800">${sub_total_Format}</p>

      {/* Boton de quitar producto */}
      <DeleteModal deleteCartitem handleDeleteCartitem={handleDeleteCartitem} />

      {/* boton para actualizar el carrito */}
      <Button className='update-item-btn' disabled={cartItemUpdateLoader} handleClick={handleUpdateCartItem}>
        {cartItemUpdateLoader ? "Actualizando..." : "Actualizar Carrito"}
      </Button>

    </div>
  )
}

export default CartItem