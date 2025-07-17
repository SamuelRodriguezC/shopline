import React from 'react'
import CategoryCardSkeleton from './CategoryCardSkeleton'

const CategorySectionSkeleton = () => {
  return (
    <section className="main-amx-width padding-x mx-auto animate-pulse">
        <div className="my-9 h-6 w-56 bg-gray-300 mx-auto rounded-md"></div>
            <div className="flex justify-center flex-wrap gap-8">
                <CategoryCardSkeleton/>
                <CategoryCardSkeleton/>
                <CategoryCardSkeleton/>
                <CategoryCardSkeleton/>
                <CategoryCardSkeleton/>
            </div>

    </section>
  )
}

export default CategorySectionSkeleton