import React from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} 
from "@/components/ui/dialog";
import Button from "./Button";
import { PenIcon } from "lucide-react";
import { AddressType } from "@/lib/type";

interface Props {
  children: React.ReactNode;
  userHaveReview?: boolean;
  updateReviewModal?: boolean;
  addressForm?: boolean;
  address?: AddressType | undefined;
}

const Modal = ({ children, userHaveReview, updateReviewModal, addressForm, address}: Props) => {

  if(userHaveReview){
    return null
  }

  return (
    <Dialog>
      <DialogTrigger asChild>

        {updateReviewModal ?
            
           (<button className="bg-gray-200 p-2 rounded-md cursor-pointer transition-all hover:bg-gray-300">
              <PenIcon className="size-5 text-gray-600" />
            </button>)

        :

        addressForm ? 
          <Button className="address-btn cursor-pointer">{address?.city? "Editar Dirección" : "Agregar direción de envío"}</Button>
          :


        (<Button className="default-btn max-sm:text-[12px] max-sm:px-4 my-6">
              Añadir Reseña
        </Button>)
        }
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle className="hidden">¿Está seguro?</DialogTitle>
        </DialogHeader>

        {children}
      </DialogContent>
    </Dialog>
  );
};

export default Modal;