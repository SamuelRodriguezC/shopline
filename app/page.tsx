// Importación de componentes principales para la página de inicio
import Hero from '@/components/home/Hero'
import CategorySection from '@/components/home/CategorySection'
import ProductSection from '@/components/home/ProductSection'


// Importación de skeletons para mostrar mientras carga el contenido
import CategorySectionSkeleton from '@/components/home/CategorySectionSkeleton'
import ProductSectionSkeleton from '@/components/home/ProductSectionSkeleton'


import React, { Suspense } from 'react'

// Usa Suspense para mostrar skeletons mientras se cargan las secciones dinámicas
const HomePage = () => {
  return (
    <>
      <Hero/>

      {/* Sección de categorías con carga ralentizada */}
      <Suspense fallback={<CategorySectionSkeleton/>}>
      <CategorySection/>
      </Suspense>

    {/* Sección de productos con carga ralentizada */}
      <Suspense fallback={<ProductSectionSkeleton/>}>
      <ProductSection title="Prodcutos Destacados"/>
      </Suspense>

    </>
  )
}

export default HomePage