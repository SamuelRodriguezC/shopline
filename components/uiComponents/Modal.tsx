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

interface Props {
  children: React.ReactNode;
}

const Modal = ({ children }: Props) => {
  return (
    <Dialog>
      <DialogTrigger>
        <Button className="default-btn max-sm:text-[12px] max-sm:px-4 my-6">
          Añadir Reseña
        </Button>
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