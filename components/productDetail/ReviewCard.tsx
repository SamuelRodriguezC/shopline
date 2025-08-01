import { ProductDetail, Review } from "@/lib/type";
import { cn, timeAgo } from "@/lib/utils";
import { Star} from "lucide-react";
import { User } from "next-auth";
import Image from "next/image";
import React from "react";
import Modal from "../uiComponents/Modal";
import ReviewForm from "./ReviewForm";
import DeleteModal from "../uiComponents/DeleteModal";
import { deleteReviewAction } from "@/lib/actions";
import { toast } from "react-toastify";

const ReviewCard = ({review, loggedInUser, product}: {review: Review, loggedInUser: User | undefined | null, product: ProductDetail}) => {
  const starArray = [1, 2, 3, 4, 5];
  
  // Obtener el email del usuario en sesión 
  const loggedInUserEmail = loggedInUser?.email

  // función para eliminar la reseña
  async function handleDeleteReview(){
    const formData = new FormData()
    formData.set("review_id", String(review.id))
    formData.set("slug", product.slug)

    try{
        await deleteReviewAction(formData)
        toast.success("Reseña Eliminada Correctamente")
    }
    catch(err: unknown){
      if(err instanceof Error){
        toast.error("Ups Ha Ocurrido un Error Intentalo Más Tarde")
        throw new Error(err.message)
      }
      toast.error("Ha ocurrido un Error Desconocido")
      throw new Error("Ha ocurrido un Error Desconocido")
    }


  }

  return (
    <div className="w-full bg-white shadow-lg px-6 py-6 rounded-lg flex flex-col gap-4 mb-6">
      {/* Botones para editar o eliminar una reseña */}
      <div className="flex justify-between items-center">
        {loggedInUser?.email == review.user.email && <span className="flex gap-4">
          <>
            {/* Botón para borrar */}
            <DeleteModal handleDeleteReview={handleDeleteReview}/>
            {/* <button className="bg-gray-200 p-2 rounded-md cursor-pointer transition-all hover:bg-gray-300">
              <TrashIcon className="size-5 text-gray-600" />
            </button> */}

            {/* Botón para editar */}
            <Modal updateReviewModal>
              <ReviewForm updateReviewForm review={review} product={product} loggedInUserEmail={loggedInUserEmail}/>
            </Modal>

            {/* <button className="bg-gray-200 p-2 rounded-md cursor-pointer transition-all hover:bg-gray-300">
              <PenIcon className="size-5 text-gray-600" />
            </button> */}
          </>
        </span>}

        {/* Información que se muestra cuando la reseña ha sido actualizada */}
        <span className="text-sm text-gray-500">
          {review.created.slice(0, 20) == review.updated.slice(0, 20) ||( <small className="block">Editado...</small>)}
          <small>{timeAgo(review.created)}</small>
        </span>
      </div>

      {/* Mostrar la reseña junto con el usuario que la realizó */}

      <div className="flex gap-4 items-center">
        {/* Foto de perfil */}
        <div className="w-[50px] h-[50px] rounded-full relative overflow-hidden border-2 border-gray-200">
          <Image
            src={review.user.profile_picture_url ?  `${review.user.profile_picture_url}` : "/Sample_User_Icon.png"}
            alt="profile_pic"
            className="object-cover rounded-full"
            fill
          />
        </div>

        {/* Mostrar el contenido de la reseña incluyendo nombre, valoración y texto de la reseña */}
        <div className="flex flex-col flex-1">
          <p className="font-semibold text-lg text-gray-800">{review.user.first_name} {review.user.last_name}</p>

          <div className="flex gap-1 mt-2">
            {starArray.map((star) => (
              <Star key={star} className={cn("size-5 cursor-pointer", star <= review.rating ? "fill-black" : "")} />
            ))}
          </div>

          {/* Texto de reseña */}
          <small className="text-gray-600 text-justify leading-6 mt-4 font-medium">
            {review.review}
          </small>
        </div>
      </div>
    </div>
  );
};

export default ReviewCard;