import React from 'react'
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog"
import { TrashIcon, X } from 'lucide-react'

const DeleteModal = ({handleDeleteReview, handleDeleteCartitem, deleteCartitem}: {handleDeleteReview?: () => void, handleDeleteCartitem?: ()=> void, deleteCartitem?: boolean }) => {
  return (
    <AlertDialog>
  <AlertDialogTrigger asChild>

    {deleteCartitem ? 
          <button 
          className="p-2 rounded-md bg-red-50 hover:bg-red-100 transition text-red-500 border border-red-300 cursor-pointer"
        >
          <X className="w-5 h-5" />
        </button>  
        : 
        <button className="bg-gray-200 p-2 rounded-md cursor-pointer transition-all hover:bg-gray-300" >
            <TrashIcon className="size-5 text-gray-600" />
        </button>
  }
  </AlertDialogTrigger>
  <AlertDialogContent>
    <AlertDialogHeader>
      <AlertDialogTitle>¿Está seguro de realizar esta acción?</AlertDialogTitle>
{  deleteCartitem ?
  <AlertDialogDescription>
    Está seguro que quitar este producto del carrito de compras? 
      </AlertDialogDescription>
    : 
      <AlertDialogDescription>
        Esta acción no se puede deshacer. Si confirma esta reseña será eliminada permanetemente 
        de este producto.
      </AlertDialogDescription>
    }
    </AlertDialogHeader>
    <AlertDialogFooter>
      <AlertDialogCancel className='cursor-pointer'>Cancelar</AlertDialogCancel>
      <AlertDialogAction className='cursor-pointer' onClick={deleteCartitem ? handleDeleteCartitem :  handleDeleteReview}>Continuar</AlertDialogAction>
    </AlertDialogFooter>
  </AlertDialogContent>
</AlertDialog>
  )
}

export default DeleteModal