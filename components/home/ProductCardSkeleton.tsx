import React from 'react'

const ProductCardSkeleton = () => {
  return (
    <div className="w-[260-px] rounded-lg shadow-md bg-white flex flex-col items-center gap-4 px-5 py-6 animate-pulse">
        {/* Esqueleto de la imagen */}
        <div className="w-[200px] h-[200] bg-gray-300 rounded-md">
        </div>
        {/* Esqueleto del nombre del Producto */}
        <div className="w-36 h-4 bg-gray-300 rounded-md"></div>

        {/* Precio del producto */}
        <div className="w-20 h-5 bg-gray-300 rounded-md"></div>
    </div>
  )
}

export default ProductCardSkeleton