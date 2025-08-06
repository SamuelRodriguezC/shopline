import { auth } from '@/auth'
import CategoryBtn from '@/components/category/CategoryBtn'
import ProductCard from '@/components/home/Productcard'
import { getCategories, getCategory } from '@/lib/api'
import { Category, Product } from '@/lib/type'

import React from 'react'


export async function generateMetadata({params} : {params: Promise<{slug: string}>}) {
  const { slug } = await params
  const category: Category = await getCategory(slug)

  
  return {
    title: `Shopline | ${category.name}`
  }
}


// Genera los parámetros estáticos para las rutas dinámicas de categorías
export async function generateStaticParams(){
  const categories = await getCategories()
  // Retornar solo los slugs necesarios para la generación estática
  return categories.map((category: Category) => ({slug: category.slug}))
}

const CategoryPage = async ({params}: {params: Promise<{slug: string}>}) => {
  
  // Obtener el email del usuario en sesión
  const session = await auth()
  const loggedInUserEmail = session?.user?.email
  
  // Obtener el slug desde los parámetros de la URL
  const { slug } = await params

  // Obtener todas las categorías y la información de la categoría seleccionada
  const [categories, category] = await Promise.all([getCategories(), getCategory(slug)])

  // Obtener los productos asociados a la categoría seleccionada
  const products = category.products

  return (
    <div className='main-max-width mx-auto padding-x py-9'>
        {/* Título: Nombre de la categoría actual */}
        <p className="font-semibold text-center text-4xl">{category.name}</p>

        <div className="flex-center flex-wrap my-6 gap-4">

         {/* Botones de todas las categorías */}
         {/* "Por cada categoría, muestra un botón de categoría, usando su id como clave y pasando la categoría como propiedad." */}
        {categories.map((category:Category) => <CategoryBtn key={category.id} category={category}/>)}


        </div>


        {/* Listado de productos de la categoría actual */}
        {/* "Por cada producto, muestra una card, usando su id como clave y pasando el producto como propiedad." */}
        <div className='flex-center flex-wrap my-6 gap-4'>
            {products.map((product: Product) => <ProductCard key={product.id} product={product} loggedInUserEmail={loggedInUserEmail}/>)}
        </div>


    </div>
  )
}

export default CategoryPage