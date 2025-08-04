"use client"


import React, { useEffect, useState } from 'react'
import Image from "next/image"
import { Product, ProductDetail } from '@/lib/type'
import { api, BASE_URL, getProductDetail } from '@/lib/api'
import Link from 'next/link'
import { FaHeart, FaShoppingCart } from "react-icons/fa";
import { FaCheck, FaEye, FaSpinner } from 'react-icons/fa6'
import { addToCartAction, addToWishlistAction } from '@/lib/actions'
import { toast } from 'react-toastify'
import Button from '../uiComponents/Button'
import WishlistMinTooltip from '../uiComponents/WishlistMinTooltip'
import { Star } from 'lucide-react'
import { cn } from '@/lib/utils'
import { useCart } from '@/context/CartContext'


const ProductCard = ({ product, loggedInUserEmail}: { product: Product, loggedInUserEmail: string | null | undefined }) => {

  // Loader de estado para saber si se está agregando el producto al carrito
  const [addToCartLoader, setAddToCartLoader] = useState(false)

  // Loader de estado para saber si se está agregando el producto al carrito
  const [addedToCart, setAddedToCart] = useState(false)

  // Traemos variables globales del contexto del carrito
  const { cartCode, setCartItemsCount } = useCart()
  
  
  // Estado donde se guardan los detalles completos del producto (reviews, rating, etc.)
  const [productDetail, setProductDetail] = useState<ProductDetail | null>(null);

  // Al montar el componente o cambiar el slug, cargamos los detalles del producto
  useEffect(() => {
    async function fetchProductDetail() {
      try {
        // Obtener los destalles del producto
        const detail: ProductDetail = await getProductDetail(product.slug);
        setProductDetail(detail);
      } catch (err: unknown) {
        if (err instanceof Error) {
          toast.error("Ups Parece que ha ocurrido un error");
        }
      }
    }
    fetchProductDetail();
  }, [product.slug]);

  // Promedio de calificación y total de reseñas, o 0 si no existen.
  const averageRating = productDetail?.rating?.average_rating ?? 0
  const reviewsCounter = productDetail?.rating?.total_reviews ?? 0

  // Convierte el promedio de calificación a un número entero redondeando hacia abajo (para el sistema de estrellas). 
  const starRating = Math.floor(averageRating) 

  // Lista de Estrellas
  const stars = [1, 2, 3, 4, 5]

  // Estado para saber si el producto ya está en la lista de deseos
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

  // Función para agregar productos al carrito
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
        <div className="flex items-center text-sm gap-1 my-3 text-yellow-500">
              {stars.map((star) => 
                <Star 
                    key={star}
                    className={cn("w-5 h-5", star <= starRating ? "fill-yellow-500" : "")} 
                />)
              }
          <span className="text-gray-500 ml-1">{reviewsCounter} {reviewsCounter === 1 ? "Reseña" : "Reseñas"}</span>
        </div>

        {/* Botones */}
          <div className="flex items-center gap-2 text-gray-600">

            {/* Carrito de Compras */}
            <Button className="btn-2 bg-gray-400 disabled:bg-black disabled:cursor-not-allowed" handleClick={handleAddToCart} disabled={addToCartLoader || addedToCart}>
              {addToCartLoader ? <FaSpinner className="animate-spin"/> : addedToCart ? <FaCheck/> : <FaShoppingCart />}
            </Button>

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
