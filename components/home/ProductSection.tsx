import React from "react";
import ProductCard from "./Productcard";
import { getFeaturedProducts } from "@/lib/api";
import { Product } from "@/lib/type";
import { auth } from "@/auth";

interface Props{
  title: string;
  similar_products?: Product[];
  detailPage?: boolean
}

const ProductSection = async ({title, similar_products, detailPage}: Props) => {

  // Si estamos en una página de detalle (detailPage === true), usamos los productos similares pasados por props.
  // De lo contrario, obtenemos la lista completa de productos llamando a la función asincrónica getProducts().
  const products = detailPage ? similar_products : await getFeaturedProducts(8)
  // console.log(products)

  
  // Obtener el email del usuario en sesión 
  const session = await auth()
  const loggedInUserEmail = session?.user?.email

  return (
    <section className="main-max-width x-10 max-sm:px-10 mx-auto my-12">
      <h2 className="my-9 text-center text-xl font-bold text-gray-800">
        {title}
      </h2>

      {/* Contenido */}
      <div className="flex-center flex-wrap gap-4">
        {products.map((product: Product) => <ProductCard key={product.id} product={product} loggedInUserEmail={loggedInUserEmail}/>)}

      </div>
    </section>
  );
};

export default ProductSection;