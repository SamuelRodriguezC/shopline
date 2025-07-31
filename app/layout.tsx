// Importación de tipos de metadata para SEO y configuración global
import type { Metadata } from "next";

// Importación de fuentes personalizadas desde Google Fonts usando el módulo de Next.js
// import { Geist, Geist_Mono } from "next/font/google";
import { Ubuntu } from 'next/font/google'
import { ToastContainer } from 'react-toastify'


// Importación global de estilos CSS
import "./globals.css";

// Importación de componentes globales (Navbar y Footer)
import NavBarContainer from "@/components/navbar/NavBarContainer";
import Footer from "@/components/footer/Footer";
import { CartProvider } from "@/context/CartContext";



// // Configuración de las fuentes con variables CSS o clases
// const geistSans = Geist({
//   variable: "--font-geist-sans",
//   subsets: ["latin"],
// });


// const geistMono = Geist_Mono({
//   variable: "--font-geist-mono",
//   subsets: ["latin"],
// });

const ubuntu = Ubuntu({
  weight: ["400", "500", "700"],
  subsets: ["latin"]
})



// Metadata global de la aplicación (Título y descripción)
export const metadata: Metadata = {
  title: "Shopline - Inicio",
  description: "ShopLine es un sitio web de comercio electrónico elegante y moderno en el que puedes navegar por , comprar y pasar por caja de forma segura y sencilla. Tanto si buscas en las últimas tendencias como artículos de uso cotidiano, Shoppit hace que comprar en línea en sea sencillo y agradable.",
};

// Componente RootLayout: define la estructura base de toda la aplicación
export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={ubuntu.className}>
      <body className={``}>
        <main className="w-full ">

          <CartProvider>


           {/* Barra de navegación global */}
          <NavBarContainer/>

          <ToastContainer/>

           {/* Contenido dinámico según la ruta */}
          {children}

          {/* Pie de página global */}
          <Footer/>
          
          </CartProvider>
        </main>
      </body>
    </html>
  );
}
