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
import { TrashIcon } from 'lucide-react'

const DeleteModal = ({handleDeleteReview}: {handleDeleteReview: () => void }) => {
  return (
    <AlertDialog>
  <AlertDialogTrigger asChild>
        <button className="bg-gray-200 p-2 rounded-md cursor-pointer transition-all hover:bg-gray-300" >
            <TrashIcon className="size-5 text-gray-600" />
        </button>
  </AlertDialogTrigger>
  <AlertDialogContent>
    <AlertDialogHeader>
      <AlertDialogTitle>¿Está seguro de realizar esta acción?</AlertDialogTitle>
      <AlertDialogDescription>
        Esta acción no se puede deshacer. Si confirma esta reseña será eliminada permanetemente 
        de este producto.
      </AlertDialogDescription>
    </AlertDialogHeader>
    <AlertDialogFooter>
      <AlertDialogCancel className='cursor-pointer'>Cancelar</AlertDialogCancel>
      <AlertDialogAction className='cursor-pointer' onClick={handleDeleteReview}>Continuar</AlertDialogAction>
    </AlertDialogFooter>
  </AlertDialogContent>
</AlertDialog>
  )
}

export default DeleteModal