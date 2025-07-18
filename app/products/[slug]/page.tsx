
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
import React from "react";

const ProductPage = async ({params}: {params: Promise<{slug: string}>}) => {

  const {slug} = await params
  const product: ProductDetail = await getProductDetail(slug)
  // console.log(product)

  const averageRaing = product?.rating?.average_rating ?? 0
  const reviewsCounter = product?.rating?.total_reviews ?? 0

  const starRating = Math.floor(averageRaing) 

  const poor_ratign = product.poor_review
  const fair_rating = product.fair_review
  const good_rating = product.good_review
  const very_good_rating = product.very_good_review
  const excellent_rating = product.excellent_review

  const reviews = product.reviews

  const stars = [1, 2, 3, 4, 5]

  return (
    <>
      <ProductInfo product={product}/>

      <div className="main-max-width padding-x mx-auto">
        <h3 className="font-semibold text-xl text-center my-6 text-gray-800">
          Reseñas de Clientes
        </h3>

        <div className="w-full flex py-6 gap-6 flex-wrap items-center justify-between max-md:justify-center">
          {/* Rating display box */}
          <div className="w-[250px] h-[250px] bg-gray-100 rounded-lg px-4 py-6 flex flex-col gap-3 items-center justify-center shadow-lg">
            <h1 className="text-5xl font-bold text-gray-800">{averageRaing.toFixed(1)}</h1>
            <small className="text-gray-600 text-sm">de {reviewsCounter} {reviewsCounter > 2 ? "Reseñas": "Reseña"}</small>

            <div className="flex gap-2">
              {stars.map((star) => <Star key={star} className={cn("w-5 h-5 cursor-pointer", star <= starRating ? "fill-black" : "fill-gray-100")} />)}
              
            </div>
          </div>

          {/* Rating Display Box ends */}

          {/* Barra de progreso de valoraciones */}
          <div className="flex flex-col gap-6 w-[700px] max-md:w-full">
            <RatingProgressBar rating="Exelente" numRating={excellent_rating} />
            <RatingProgressBar rating="Muy Bueno" numRating={very_good_rating} />
            <RatingProgressBar rating="Bueno" numRating={good_rating} />
            <RatingProgressBar rating="Regular" numRating={fair_rating} />
            <RatingProgressBar rating="Malo" numRating={poor_ratign} />
          </div>

          {/* fin de barra de progreso de reseñas*/}
        </div>

        {/* formulario para reseña */}
        <div className="flex justify-center items-center w-full mb-5">
          <Modal>
            <ReviewForm />
          </Modal>
        </div>

        {/*Final del formulario */}
      </div>

      {reviews.length > 0 &&  <ReviewCardContainer reviews={reviews}/>}
      <ProductSection title="Productos de la Misma Categoría" />
    </>
  );
};

export default ProductPage;