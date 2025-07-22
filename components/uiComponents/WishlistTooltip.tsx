// import React from 'react'
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip"


const WishlistTooltip = ({loggedInUserEmail}: {loggedInUserEmail: string | null | undefined }) => {
  return (
    <Tooltip>
        <TooltipTrigger disabled={!Boolean(loggedInUserEmail)} className="wish-btn disabled:opacity-50 disabled:cursor-not-allowed">
            Añadir a la lista de deseos              
        </TooltipTrigger>
        <TooltipContent>
            <p>Inicia Sesión para Añadir a lista de deseados</p>
        </TooltipContent>
    </Tooltip>
    )
}

export default WishlistTooltip