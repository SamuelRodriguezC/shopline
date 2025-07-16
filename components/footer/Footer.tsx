import React from 'react'
import { FaLinkedin, FaFacebookF, FaYoutube } from "react-icons/fa";
import { BsTwitterX } from "react-icons/bs";

const Footer = () => {
  return (
    <footer className="bg-black text-white w-full py-16">
      <div className="flex justify-between items-center main-max-width mx-auto padding-x flex-wrap gap-6 max-md:justify-center">
        {/* Logo & Description */}
        <div className="flex flex-col gap-6 w-[500px]">
          <h1 className="text-3xl font-bold text-white">ShopLine</h1>
          <p className="text-[15px] text-gray-400 leading-[1.6]">
            ShopLine es un sitio web de comercio electrónico elegante y moderno en el que puedes navegar por
            , comprar y pasar por caja de forma segura y sencilla. Tanto si buscas en
            las últimas tendencias como artículos de uso cotidiano, Shoppit hace que comprar en línea en
            sea sencillo y agradable. 🚀🛍️
          </p>
        </div>

        {/* Quick Links */}
        <div className="flex flex-col gap-5">
          <h2 className="text-lg font-semibold">Links</h2>
          <ul className="text-gray-400 space-y-3">
          

            <li className="hover:text-white transition">Inicio</li>
            <li className="hover:text-white transition">
              Comprar accesorios para Iphone
            </li>
            <li className="hover:text-white transition">
              Comprar accesorios para Samsung
            </li>
            <li className="hover:text-white transition">Mejores Productos</li>
            <li className="hover:text-white transition">Contactanos</li>
          </ul>
        </div>

        {/* Customer Support */}
        <div className="flex flex-col gap-5">
          <h2 className="text-lg font-semibold">Categorías</h2>
          <ul className="text-gray-400 space-y-3">
            
            
            <li className="hover:text-white transition">Enviar Información</li>
            <li className="hover:text-white transition">Devoluciones y reembolsos</li>
            <li className="hover:text-white transition">Politica de garantía</li>
            <li className="hover:text-white transition">Preguntas Frecuentes</li>
            <li className="hover:text-white transition">Seguir Orden</li>
            <li className="hover:text-white transition">Contactar a Soporte</li>
          </ul>
        </div>
      </div>

      {/* Social Media */}
      <div className="flex justify-center items-center gap-6 mt-10">
        <FaLinkedin className="text-2xl text-gray-400 hover:text-white transition cursor-pointer" />
        <FaFacebookF className="text-2xl text-gray-400 hover:text-white transition cursor-pointer" />
        <BsTwitterX className="text-2xl text-gray-400 hover:text-white transition cursor-pointer" />
        <FaYoutube className="text-2xl text-gray-400 hover:text-white transition cursor-pointer" />
        {/* <ContactLinks /> */}
        
      </div>

      {/* Copyright */}
      <div className="text-center text-gray-500 text-sm mt-8">
        © {new Date().getFullYear()} Shopline Todos los Derechos Reservados
      </div>
    </footer>
  )
}

export default Footer