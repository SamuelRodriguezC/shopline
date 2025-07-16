import ProductSection from "@/components/home/ProductSection";
import ProductInfo from "@/components/productDetail/ProductInfo";
import RatingProgressBar from "@/components/productDetail/RatingProgressBar";
import ReviewCardContainer from "@/components/productDetail/ReviewCardContainer";
import ReviewForm from "@/components/productDetail/ReviewForm";
import Modal from "@/components/uiComponents/Modal";
import { Star } from "lucide-react";
import React from "react";

const ProductPage = () => {
  return (
    <>
      <ProductInfo />

      <div className="main-max-width padding-x mx-auto">
        <h3 className="font-semibold text-xl text-center my-6 text-gray-800">
          Reseñas de Clientes
        </h3>

        <div className="w-full flex py-6 gap-6 flex-wrap items-center justify-between max-md:justify-center">
          {/* Rating display box */}
          <div className="w-[250px] h-[250px] bg-gray-100 rounded-lg px-4 py-6 flex flex-col gap-3 items-center justify-center shadow-lg">
            <h1 className="text-5xl font-bold text-gray-800">5.0</h1>
            <small className="text-gray-600 text-sm">de 10 reseñas</small>

            <div className="flex gap-2">
              <Star className="fill-black w-5 h-5 cursor-pointer" />
              <Star className="fill-black w-5 h-5 cursor-pointer" />
              <Star className="fill-black w-5 h-5 cursor-pointer" />
              <Star className="fill-black w-5 h-5 cursor-pointer" />
              <Star className="fill-gray-100 w-5 h-5 cursor-pointer" />
            </div>
          </div>

          {/* Rating Display Box ends */}

          {/* Barra de progreso de valoraciones */}
          <div className="flex flex-col gap-6 w-[700px] max-md:w-full">
            <RatingProgressBar rating="Exelente" numRating={10} />
            <RatingProgressBar rating="Muy Bueno" numRating={8} />
            <RatingProgressBar rating="Bueno" numRating={6} />
            <RatingProgressBar rating="Regular" numRating={5} />
            <RatingProgressBar rating="Malo" numRating={3} />
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

      <ReviewCardContainer />
      <ProductSection title="Productos de la Misma Categoría" />
    </>
  );
};

export default ProductPage;