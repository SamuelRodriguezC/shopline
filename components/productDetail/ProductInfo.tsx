
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

  // Traemos variables globales del contexto del carrito
  const { cartCode, setCartItemsCount } = useCart()

  // Manejar el estado de carga del carrito
  const [addToCartLoader, setAddToCartLoader] = useState(false)

  // Manejar estado de productos en la lista de deseos
  const [addedToWishList, setAddedToWishList] = useState(false)

  // Manejar estado de productos añadidos al carrito
  const [addedToCart, setAddedToCart] = useState(false)

  // Manejar estado de carga de la lista de deseos
  const [addWishListLoader, setWishListLoader] = useState(false)

  // Ejecuta el código cuando el componente se monta o cambian las dependencias
  useEffect(() => {
    async function handleAddToCart() {
      try {
        // Llamar a la api para cosultar si un producto ya está en el carrito
        const response = await api.get(`product_in_cart?cart_code=${cartCode}&product_id=${product.id}`)
        // Se guarda la respuesta 
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
  }, [cartCode, product.id]) //Se ejecuta cada vez que cambia el código del carrito o el product id


  // Función para agregar un producto al carrito y actualizar el estado de carga del mismo
  async function handleAddToCart() {
    // Se Activa el loader
    setAddToCartLoader(true)

    // Crear formData para enviar datos a la api
    const formData = new FormData();
    formData.set("cart_code", cartCode ? cartCode : "")
    formData.set("product_id", String(product.id))

    try {
      // Llamar función para agregar productos al carrito de la api
      const response = await addToCartAction(formData)
      setAddedToCart(true)
      // Aumentar la cantidad de productos en el carrito
      setCartItemsCount(curr => curr + 1)
      // mostrar notificación de exito
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
      // Se finaliza el loader
      setAddToCartLoader(false)
    }

  }

  // Función para agregar un producto a la lista de deseos y actualizar el loader
  async function handleAddToWishlist() {
    // Comienza el loader
    setWishListLoader(true)

    // Crear formData para enviar datos a la api
    const formData = new FormData()
    formData.set("product_id", String(product.id))
    formData.set("email", loggedInUserEmail ? loggedInUserEmail : "")

    try {
      // Ejecuta función para añadir pasandole en formData
      const result = await addToWishlistAction(formData)
      // Actualizar estado para reflejar si el producto está en la lista de deseos
      setAddedToWishList(result.action === "created")
      toast.success("Lista de Deseos Actualizada")
    }
    catch (err: unknown) {
      if (err instanceof Error) {
        throw new Error(err.message)
      }
      throw new Error("Un Eror Desconocido ha Ocurrido")
    }
    // Desactivar el loader 
    finally {
      setWishListLoader(false)
    }
  }

  // Función que se ejecuta cuando cambie el email del usuario o el id del producto
  useEffect(() => {
    async function handleProductInWishlist(){
      // Evitar hacer la petición sin no hay sesión iniciada 
      if(loggedInUserEmail){
        try{
          // consultar si el producto está en la lista de deseos del usuario logeado
          const response = await api.get(`product_in_wishlist?email=${loggedInUserEmail}&product_id=${product.id}`)
          // Actualizar el estado según la respuesta de la api
          setAddedToWishList(response.data.product_in_wishlist)
          return response.data
        }
        catch (err: unknown) {
          if (err instanceof Error) {
            throw new Error(err.message)
          }
          throw new Error("Un Eror Desconocido ha Ocurrido")
        }
      }
    }
    // Guaradar ña respuesta en el estado local
    handleProductInWishlist()
  }, [loggedInUserEmail, product.id]) 

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