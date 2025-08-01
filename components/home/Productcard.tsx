"use client"


import React, { useEffect, useState } from 'react'
import Image from "next/image"
import { Product } from '@/lib/type'
import { api, BASE_URL } from '@/lib/api'
import Link from 'next/link'
import { FaHeart, FaShoppingCart } from "react-icons/fa";
import { FaEye, FaSpinner } from 'react-icons/fa6'
import { addToWishlistAction } from '@/lib/actions'
import { toast } from 'react-toastify'
import Button from '../uiComponents/Button'
import WishlistMinTooltip from '../uiComponents/WishlistMinTooltip'


const ProductCard = ({ product, loggedInUserEmail}: { product: Product, loggedInUserEmail: string | null | undefined }) => {

  // Manejar estado de producto en lista de deseos
  const [ addedToWishList, setAddedToWishList ] = useState(false)

  // Manejar estado del botón de lista de deseos
  const [addWishListLoader, setWishListLoader] = useState(false)


  // Función para agregar productos al carrito
  async function handleAddToWishlist() {
    setWishListLoader(true)
    const formData = new FormData()
    formData.set("product_id", String(product.id))
    formData.set("email", loggedInUserEmail ? loggedInUserEmail : "")

    try{
      const result = await addToWishlistAction(formData)
      setAddedToWishList(result.action === "created")
      toast.success("Lista de Deseos Actualizada")
    }
    catch(err: unknown){
      if(err instanceof Error){
        toast.error("Ha Ocurrido un error intentalo más tarde")
      }
      toast.error("Ha Ocurrido un error intentalo más tarde")
    }
    finally{
      setWishListLoader(false)
    }

  }

  
    useEffect(() => {
  
      async function handleProductInWishlist(){
        if(loggedInUserEmail){
          try{
            const response = await api.get(`product_in_wishlist?email=${loggedInUserEmail}&product_id=${product.id}`)
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
  
      handleProductInWishlist()
  
    }, [loggedInUserEmail, product.id])
  
  
  return (
    <div className="w-[280px] rounded-lg shadow-md bg-white overflow-hidden transition-all duration-300 hover:shadow-xl hover:scale-105">
      <Link href={`/products/${product.slug}`}>
      {/* Imagen */}
        <div className="w-full h-[200px] overflow-hidden">
          <Image
            src={`${BASE_URL}${product.image}`}
            alt={product.name}
            width={260}
            height={200}
            className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
          />
        </div>
      </Link>

      {/* Contenido */}
      <div className="p-4 space-y-2">

        {/* Nombre */}
        <p className="text-lg font-semibold text-gray-800">{product.name}</p>

        {/* Precio */}
        <div className="flex items-center gap-2">
          <span className="text-lg font-normal text-gray-900">$ {product.price.toLocaleString()}</span>
        </div>

        {/* Reseñas */}
        <div className="flex items-center text-sm gap-1 text-yellow-500">
          <span>★★★★☆</span>
          <span className="text-gray-500 ml-1">20k reviews</span>
        </div>

        {/* Botones */}
          <div className="flex items-center gap-2 text-gray-600">

            {/* Carrito de Compras */}
            <button className="btn-2 bg-gray-400">
              <FaShoppingCart />
            </button>

            {/* Lista de Deseos */}
            {loggedInUserEmail ? 
              <Button 
                disabled={addWishListLoader} 
                className={`btn-2 disabled:cursor-not-allowed ${addedToWishList ? "bg-black" : " bg-gray-400"}`} 
                handleClick={handleAddToWishlist}>
              {addWishListLoader ? <FaSpinner className="animate-spin"/> : <FaHeart />}
            </Button>
            :
            <WishlistMinTooltip loggedInUserEmail={loggedInUserEmail}/>
          }

            {/* Ver Producto */}
            <Link href={`/products/${product.slug}`} className="btn-2 bg-gray-400">
              <FaEye />
            </Link>
        </div>
      </div>
    </div>
  )
}

export default ProductCard
