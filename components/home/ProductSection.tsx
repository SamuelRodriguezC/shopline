import React from "react";
import ProductCard from "./Productcard";
import { getProducts } from "@/lib/api";
import { Product } from "@/lib/type";

interface Props{
  title: string
}

const ProductSection = async ({title}: Props) => {

  const products = await getProducts()
  // console.log(products)

  return (
    <section className="main-max-width x-10 max-sm:px-10 mx-auto my-12">
      <h2 className="my-9 text-center text-xl font-bold text-gray-800">
        {title}
      </h2>

      {/* Content */}
      <div className="flex-center flex-wrap gap-4">
        {products.map((product: Product) => <ProductCard key={product.id} product={product}/>)}

      </div>
    </section>
  );
};

export default ProductSection;