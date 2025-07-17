import React from 'react'
import CategoryCard from './CategoryCard'
import { getCategories } from '@/lib/api'
import { Category } from '@/lib/type'


const CategorySection = async () => {

  // Obtener desde la api las categorías de la base de datos
  const categories = await getCategories()
  // console.log(categories)
  return (
    <section className="main-max-width padding-x mx-auto">
      <h2 className="my-9 text-center text-xl font-bold text-gray-800">
        Buscar Categoría
      </h2>

      {/* Content */}
      <div className="flex justify-center flex-wrap gap-8">
        {/* Pasarle al componente el objeto de la categoría */}
        {categories.map((category: Category) => <CategoryCard key={category.id} category={category}/> )}
        

      </div>
    </section>
  )
}

export default CategorySection