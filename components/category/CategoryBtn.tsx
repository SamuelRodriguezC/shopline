import React from 'react'
import Image from "next/image" // Importa el componente de imagen optimizada de Next.js
import { Category } from '@/lib/type'
import { BASE_URL } from '@/lib/api'
import Link from 'next/link'

const CategoryBtn = ({category}: {category: Category}) => {

  return (

    <Link href={`/categories/${category.slug}`}>
          <button className="cat-btn cursor-pointer">
       {/* Contenedor del ícono (imagen dentro de un círculo) */}
      <div className="w-[40px] h-[40px] bg-white rounded-full overflow-hidden flex items-center justify-center shadow-sm">
        <Image
          src={`${BASE_URL}${category.image}`}
          width={30}
          height={30}
          className="object-contain"
          alt="thumbnail"
        />
      </div>

      {/* Nombre de la categoría */}
      <p className="font-semibold text-gray-800 text-[16px]">{category.name}</p>
    </button>
    </Link>
  )
}

export default CategoryBtn