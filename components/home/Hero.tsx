import React from 'react'


const Hero = () => {
  return (
    <section className="bg-gray-200 px-6 py-16 text-center w-full">
    <div className="max-w-4xl mx-auto space-y-8 px-6 sm:px-12 md:px-16 lg:px-24">
      <h1 className="text-4xl font-extrabold text-gray-900 leading-snug md:text-5xl">
        Encuentra el Producto Perfecto para la Ocasión
      </h1>
      <p className="text-lg text-gray-700 max-w-2xl mx-auto">
        Descubre la selección precisa de productos de alta calidad pensados para adaptarse a tu estilo de vida.
      </p>
      <a
        href="#product_section"
        className="inline-block bg-black text-white text-lg font-semibold px-8 py-3 rounded-xl shadow-lg hover:bg-gray-900 transition-all duration-300"
      >
       Compar Ahora
      </a>
    </div>
  </section>
  )
}

export default Hero