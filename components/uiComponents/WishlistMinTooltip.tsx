// import React from 'react'
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip"
import { FaHeart } from "react-icons/fa6"


const WishlistMinTooltip = ({loggedInUserEmail}: {loggedInUserEmail: string | null | undefined }) => {
  return (
    <Tooltip>
        <TooltipTrigger disabled={!Boolean(loggedInUserEmail)} className="btn-2 bg-gray-400 disabled:cursor-not-allowed">
             <FaHeart />            
        </TooltipTrigger>
        <TooltipContent>
            <p>Inicia Sesión para Añadir a lista de deseos</p>
        </TooltipContent>
    </Tooltip>
    )
}

export default WishlistMinTooltip