import CategoryBtn from '@/components/category/CategoryBtn'
import ProductCard from '@/components/home/Productcard'
import { getCategories, getCategory } from '@/lib/api'
import { Category, Product } from '@/lib/type'
import React from 'react'

const CategoryPage = async ({params}: {params: Promise<{slug: string}>}) => {

  const { slug } = await params

  const [categories, category] = await Promise.all([getCategories(), getCategory(slug)])

  const products = category.products

  return (
    <div className='main-max-width mx-auto padding-x py-9'>
        <p className="font-semibold text-center text-4xl">{category.name}</p>


        <div className="flex-center flex-wrap my-6 gap-4">

        {categories.map((category:Category) => <CategoryBtn key={category.id} category={category}/>)}


        </div>


        <div className='flex-center flex-wrap my-6 gap-4'>
            {products.map((product: Product) => <ProductCard key={product.id} product={product}/>)}
        </div>


    </div>
  )
}

export default CategoryPage