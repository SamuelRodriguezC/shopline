import React from 'react'
import Image from "next/image" // Importa el componente de imagen optimizada de Next.js

const CategoryBtn = () => {
  return (
    <button className="cat-btn">
       {/* Contenedor del ícono (imagen dentro de un círculo) */}
      <div className="w-[40px] h-[40px] bg-white rounded-full overflow-hidden flex items-center justify-center shadow-sm">
        <Image
          src="/electronics.svg"
          width={30}
          height={30}
          className="object-contain"
          alt="thumbnail"
        />
      </div>

      {/* Nombre de la categoría */}
      <p className="font-semibold text-gray-800 text-[16px]">Electronica</p>
    </button>
  )
}

export default CategoryBtn