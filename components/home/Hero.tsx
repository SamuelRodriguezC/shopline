/* eslint-disable @next/next/no-img-element */
import React from 'react'

const Hero = () => {
  return (
    <section className="relative bg-gray-200 py-15 flex items-center text-left w-full overflow-hidden">


      
      {/* Overlay */}
      <div className="absolute inset-0 bg-gray-200"></div>

      {/* Contenido con z-index para estar encima del overlay */}
      <div className="relative z-10 container mx-auto px-6 flex flex-col lg:flex-row items-center justify-between gap-12 text-gray-700">
         {/* Texto */}
        <div className="lg:w-1/2 space-y-6 text-left">
          <h1 className="text-4xl font-extrabold leading-snug md:text-5xl">
            Encuentra el Producto Perfecto para la Ocasión en Shopline.
          </h1>
          <p className="text-lg max-w-xl">
            Descubre la selección precisa de productos de alta calidad pensados para adaptarse a tu estilo de vida.
          </p>
          <a
            href="#product_section"
            className="inline-block bg-blue-800 text-white text-lg font-semibold px-8 py-3 rounded-xl shadow-lg   hover:bg-black transition duration-400"
          >
            Comprar Ahora
          </a>
      </div>

      {/* Imagen con fondo blob */}
        <div className="lg:w-1/2 relative w-full flex justify-center items-center">
          {/* Blob SVG como fondo */}
          <img
            src="/blob.svg"
            alt="Blob background"
            className="absolute w-[120%] max-w-none h-auto -z-10"
          />
          {/* Imagen encima del blob */}
          <img
            src="/heroimage.png"
            alt="Hero Image"
            className="relative w-full max-w-md"
          />
        </div>
      </div>
    </section>
  )
}

export default Hero



