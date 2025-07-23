
"use client"

import React, { useEffect, useState } from 'react'
import Image from "next/image"
import Button from '../uiComponents/Button'
import { ProductDetail } from '@/lib/type'
import { api, BASE_URL } from '@/lib/api'
import { useCart } from '@/context/CartContext'
import { addToCartAction, addToWishlistAction } from '@/lib/actions'
import { toast } from 'react-toastify'
import WishlistTooltip from '../uiComponents/WishlistTooltip'

const ProductInfo = ({ product, loggedInUserEmail }: { product: ProductDetail, loggedInUserEmail: string | null | undefined }) => {

  const { cartCode, setCartItemsCount } = useCart()
  const [addToCartLoader, setAddToCartLoader] = useState(false)
  const [addedToWishList, setAddedToWishList] = useState(false)
  const [addedToCart, setAddedToCart] = useState(false)
  const [addWishListLoader, setWishListLoader] = useState(false)

  useEffect(() => {

    async function handleAddToCart() {

      try {
        const response = await api.get(`product_in_cart?cart_code=${cartCode}&product_id=${product.id}`)
        setAddedToCart(response.data.product_in_cart)
        return response.data
      }
      catch (err: unknown) {
        if (err instanceof Error) {
          throw new Error(err.message)
        }
        throw new Error("Un Eror Desconocido ha Ocurrido")
      }

    }
    handleAddToCart()

  }, [cartCode, product.id])


  async function handleAddToCart() {
    setAddToCartLoader(true)
    const formData = new FormData();
    formData.set("cart_code", cartCode ? cartCode : "")
    formData.set("product_id", String(product.id))

    try {
      const response = await addToCartAction(formData)
      setAddedToCart(true)
      setCartItemsCount(curr => curr + 1)
      toast.success("Producto Añadido al Carrito")
      return response
    }
    catch (err: unknown) {
      if (err instanceof Error) {
        throw new Error(err.message)
      }
      throw new Error("Un Eror Desconocido ha Ocurrido")
    }
    finally {
      setAddToCartLoader(false)
    }

  }

  async function handleAddToWishlist() {
    setWishListLoader(true)
    const formData = new FormData()
    formData.set("product_id", String(product.id))
    formData.set("email", loggedInUserEmail ? loggedInUserEmail : "")

    try {
      const result = await addToWishlistAction(formData)
      setAddedToWishList(result.action === "created")
      toast.success("Lista de Deseos Actualizada")
    }
    catch (err: unknown) {
      if (err instanceof Error) {
        throw new Error(err.message)
      }
      throw new Error("Un Eror Desconocido ha Ocurrido")
    }
    finally {
      setWishListLoader(false)
    }
  }

  return (
    <div className="bg-gray-50 padding-x py-10 flex items-start flex-wrap gap-12 main-max-width padding-x mx-auto">
      {/* Product Image */}

      <div className="w-[350px] h-[400px] relative overflow-hidden rounded-lg shadow-sm border border-gray-200">
        <Image
          src={`${BASE_URL}${product.image}`}
          alt="gaming"
          fill
          className="object-cover rounded-lg"
        />
      </div>

      {/* Product Info */}
      <div className="flex flex-1 flex-col gap-6 max-w-[500px] max-md:w-full">
        <div className="flex flex-col gap-3">
          <h1 className="text-3xl font-bold">{product.name}</h1>
          <h3 className="text-2xl font-semibold text-black">${product.price}</h3>

        </div>

        {/* Product Details */}
        <div>
          <h3 className="font-medium text-lg mb-3">Detalles</h3>
          <p className="text-gray-600 text-justify leading-6 text-[14px] max-md:text-[12px]">
            {/* {product.description} */}
            {product.description}
          </p>
        </div>

        {/* Buttons */}
        <div className='flex py-3 items-center gap-4 flex-wrap'>
          <Button className="default-btn disabled:opacity-50 disabled:cursor-not-allowed" handleClick={handleAddToCart} disabled={addToCartLoader || addedToCart}>
            {addToCartLoader ? "Añadiendo..." : addedToCart ? "Añadido al Carrito" : "Añadir al Carrito"}
          </Button>

          {loggedInUserEmail ? (
            <Button disabled={addWishListLoader} handleClick={handleAddToWishlist} className="wish-btn disabled:opacity-50 disabled:cursor-not-allowed">
              {addedToWishList ? addWishListLoader ? "Actualizando..." : "Quitar de la lista de Deseos" : addWishListLoader ? "Agregando..." : "Añadir a lista de Deseos"}
            </Button>
          )
            :
            (
              <WishlistTooltip loggedInUserEmail={loggedInUserEmail} />
            )
          }
        </div>

      </div>
    </div>
  )
}
export default ProductInfo