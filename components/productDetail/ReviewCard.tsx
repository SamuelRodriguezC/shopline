import { Review } from "@/lib/type";
import { cn, timeAgo } from "@/lib/utils";
import { PenIcon, Star, TrashIcon } from "lucide-react";
import { User } from "next-auth";
import Image from "next/image";
import React from "react";

const ReviewCard = ({review, loggedInUser}: {review: Review, loggedInUser: User | undefined | null}) => {
  const starArray = [1, 2, 3, 4, 5];

  return (
    <div className="w-full bg-white shadow-lg px-6 py-6 rounded-lg flex flex-col gap-4 mb-6">
      {/* Action buttons for editing and deleting the review */}
      <div className="flex justify-between items-center">
        {loggedInUser?.email == review.user.email && <span className="flex gap-4">
          <>
            {/* Trash button to delete review */}
            <button className="bg-gray-200 p-2 rounded-md cursor-pointer transition-all hover:bg-gray-300">
              <TrashIcon className="size-5 text-gray-600" />
            </button>

            {/* Pen button to edit review */}
            <button className="bg-gray-200 p-2 rounded-md cursor-pointer transition-all hover:bg-gray-300">
              <PenIcon className="size-5 text-gray-600" />
            </button>
          </>
        </span>}

        {/* Information showing when the review was edited */}
        <span className="text-sm text-gray-500">
          {review.created == review.updated || <small className="block">Editado...</small>}
          <small>{timeAgo(review.updated)}</small>
        </span>
      </div>

      {/* Reviewer's profile and review content */}

      <div className="flex gap-4 items-center">
        {/* Profile picture */}
        <div className="w-[50px] h-[50px] rounded-full relative overflow-hidden border-2 border-gray-200">
          <Image
            src={review.user.profile_picture_url ?  `${review.user.profile_picture_url}` : "/Sample_User_Icon.png"}
            alt="profile_pic"
            className="object-cover rounded-full"
            fill
          />
        </div>

        {/* Review content including name, rating, and review text */}
        <div className="flex flex-col flex-1">
          <p className="font-semibold text-lg text-gray-800">{review.user.first_name} {review.user.last_name}</p>

          <div className="flex gap-1 mt-2">
            {starArray.map((star) => (
              <Star key={star} className={cn("size-5 cursor-pointer", star <= review.rating ? "fill-black" : "fill-gray-100")} />
            ))}
          </div>

          {/* Review text */}
          <small className="text-gray-600 text-justify leading-6 mt-4 font-medium">
            {review.review}
          </small>
        </div>
      </div>
    </div>
  );
};

export default ReviewCard;