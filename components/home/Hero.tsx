import React from 'react'

const Hero = () => {
  return (
    <section className="relative bg-[url('/banner.jpg')] bg-cover bg-center bg-no-repeat px-6 py-16 text-center w-full">
      {/* Overlay */}
      <div className="absolute inset-0 bg-black/50"></div>

      {/* Contenido con z-index para estar encima del overlay */}
      <div className="relative z-10 max-w-4xl mx-auto space-y-8 px-6 sm:px-12 md:px-16 lg:px-24 text-white">
        <h1 className="text-4xl font-extrabold leading-snug md:text-5xl">
          Encuentra el Producto Perfecto para la Ocasión
        </h1>
        <p className="text-lg max-w-2xl mx-auto">
          Descubre la selección precisa de productos de alta calidad pensados para adaptarse a tu estilo de vida.
        </p>
        <a
          href="#product_section"
          className="inline-block bg-white text-black text-lg font-semibold px-8 py-3 rounded-xl shadow-lg hover:bg-gray-100 transition-all duration-300"
        >
          Comprar Ahora
        </a>
      </div>
    </section>
  )
}

export default Hero
