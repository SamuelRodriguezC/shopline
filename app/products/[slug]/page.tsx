
import { auth } from "@/auth";
import ProductSection from "@/components/home/ProductSection";
import ProductInfo from "@/components/productDetail/ProductInfo";
import RatingProgressBar from "@/components/productDetail/RatingProgressBar";
import ReviewCardContainer from "@/components/productDetail/ReviewCardContainer";
import ReviewForm from "@/components/productDetail/ReviewForm";
import Modal from "@/components/uiComponents/Modal";
import { getProductDetail } from "@/lib/api";
import { ProductDetail } from "@/lib/type";
import { cn } from "@/lib/utils";
import { Star } from "lucide-react";
import Link from "next/link";
import React from "react";

// Componente de página del producto (usado en la ruta dinámica). 
// Recibe el parámetro `slug` desde la URL para cargar los datos del producto.
const ProductPage = async ({params}: {params: Promise<{slug: string}>}) => {

  // Obtener el slug desde los parametros de la URL
  const {slug} = await params

  // Usar función de la api.ts para traer los detales del producto y pasarle el slug del producto
  const product: ProductDetail = await getProductDetail(slug)

  // Promedio de calificación y total de reseñas, o 0 si no existen.
  const averageRating = product?.rating?.average_rating ?? 0
  const reviewsCounter = product?.rating?.total_reviews ?? 0

  // Convierte el promedio de calificación a un número entero redondeando hacia abajo (para el sistema de estrellas). 
  const starRating = Math.floor(averageRating) 

  // Obtener la cantidad de reseñas recibidas por cada calificación (de 1 a 5 estrellas) ej: malo (5) reseñas
  const poor_ratign = product.poor_review 
  const fair_rating = product.fair_review
  const good_rating = product.good_review
  const very_good_rating = product.very_good_review
  const excellent_rating = product.excellent_review

  // Obtener las reseñas del producto
  const reviews = product.reviews

  // Productos similares
  const similar_products = product.similar_products

  const stars = [1, 2, 3, 4, 5]

  // Obtener la sesión actual (si hay un usuario autenticado)
  const session = await auth()
  const loggedInUser = session?.user
  // Obtener el email del usuario en sesión 
  const loggedInUserEmail = loggedInUser?.email

  // Verificar si una review de un usuario es la misma de usuario autenticado
  const userHaveReview = reviews.some((review) => review.user.email === loggedInUserEmail)


  return (
    <>
      <ProductInfo product={product} loggedInUserEmail={loggedInUserEmail}/>

      <div className="main-max-width padding-x mx-auto">
        <h3 className="font-semibold text-xl text-center my-6 text-gray-800">
          Reseñas de Clientes
        </h3>

        <div className="w-full flex py-6 gap-6 flex-wrap items-center justify-between max-md:justify-center">
          {/* Contenedor para mostrar las Estrellas */}
          <div className="w-[250px] h-[250px] bg-gray-100 rounded-lg px-4 py-6 flex flex-col gap-3 items-center justify-center shadow-lg">
            <h1 className="text-5xl font-bold text-gray-800">{averageRating.toFixed(1)}</h1>
            {/* Mostrar en plural o singular si el contador de reviews es mayor a 2 */}
            <small className="text-gray-600 text-sm">de {reviewsCounter} {reviewsCounter < 2 ? "Reseña": "Reseñas"}</small>

            {/*Renderiza las estrellas de calificación, rellenándolas en negro si su valor es menor o igual al promedio. */}
            <div className="flex gap-2">
              {stars.map((star) => 
                <Star 
                    key={star}
                    className={cn("w-5 h-5 cursor-pointer", star <= starRating ? "fill-black" : "fill-gray-100")} 
                />)
              }
              
            </div>
          </div>

          {/* Fin del Contenedor de Estrellas*/}

          {/* Barra de progreso de valoraciones */}
          <div className="flex flex-col gap-6 w-[700px] max-md:w-full">
            {/* Crear componente de barra de progreso y pasarle en número de reviews que tiene cada estrella */}
            <RatingProgressBar rating="Exelente" numRating={excellent_rating} />
            <RatingProgressBar rating="Muy Bueno" numRating={very_good_rating} />
            <RatingProgressBar rating="Bueno" numRating={good_rating} />
            <RatingProgressBar rating="Regular" numRating={fair_rating} />
            <RatingProgressBar rating="Malo" numRating={poor_ratign} />
          </div>

          {/* fin de barra de progreso de reseñas*/}
        </div>

        {/* Modal con formulario para reseña */}
        <div className="flex justify-center items-center w-full mb-5">
          {/* Si hay un usuario autenticado  */}
          { loggedInUser  ?
          // Mostrar esto
              <Modal userHaveReview={userHaveReview}>
              <ReviewForm review={undefined} product={product} loggedInUserEmail={loggedInUserEmail}/>
            </Modal>
          : //De lo contrario
          <Link href="/signin" className="default-btn max-sm:text-[20px] max-sm:px-4 my-6">
           Inicia Sesión para Añadir 
          </Link>
          }
        </div>

        {/*Final del formulario */}
      </div>

      {/*Mostrar las reseñas si hay */}
      {reviews.length > 0 &&  <ReviewCardContainer reviews={reviews} product={product}/>}

      {/* Sección de productos relacionados por categoría */}
      <ProductSection title="Productos de la Misma Categoría" similar_products={similar_products} detailPage/>
    </>
  );
};

export default ProductPage;