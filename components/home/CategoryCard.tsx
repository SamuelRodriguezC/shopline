import React from 'react'
import Image from "next/image"
import { Category } from '@/lib/type'
import { BASE_URL } from '@/lib/api'
import Link from 'next/link'

const CategoryCard = ({ category }: { category: Category }) => {


  return (

     <Link
      href={`/categories/${category.slug}`}
      className="group"
    >
      <div className="w-[220px] h-[140px] bg-white group-hover:bg-black rounded-2xl flex flex-col items-center justify-center p-4 shadow-lg transition duration-300 hover:scale-105 cursor-pointer">
        {/* Category Icon */}
        <div className="bg-gray-100 group-hover:bg-white p-3 rounded-full transition duration-300">
          <Image
            src={`${BASE_URL}${category.image}`}
            alt={category.name}
            width={40}
            height={40}
          />
        </div>

        {/* Category Name */}
        <p className="font-semibold mt-3 text-black group-hover:text-white transition duration-300">
          {category.name}
        </p>
      </div>
    </Link>

  )
}

export default CategoryCard