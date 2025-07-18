"use client"

import React from 'react'
import Image from "next/image" // Importa el componente de imagen optimizada de Next.js
import { Category } from '@/lib/type'
import { BASE_URL } from '@/lib/api'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { cn } from '@/lib/utils'

const CategoryBtn = ({category}: {category: Category}) => {

  const pathName = usePathname()
  const btnPath = `/categories/${category.slug}`
  // console.log(pathName)


  return (

    <Link href={`/categories/${category.slug}`}>
      <button className={cn("cat-btn cursor-pointer", pathName == btnPath ? "bg-black": "bg-gradient-to-r from-gray-100 to-gray-200")}>
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
      <p className={cn("font-semibold  text-[16px]", pathName == btnPath ? "text-white": "text-gray-800")}>{category.name}</p>
    </button>
    </Link>
  )
}

export default CategoryBtn