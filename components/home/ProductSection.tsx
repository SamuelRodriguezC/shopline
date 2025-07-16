import React from "react";
import ProductCard from "./Productcard";

interface Props{
  title: string
}

const ProductSection = ({title}: Props) => {
  return (
    <section className="main-max-width x-10 max-sm:px-10 mx-auto my-12">
      <h2 className="my-9 text-center text-xl font-bold text-gray-800">
        {title}
      </h2>

      {/* Content */}
      <div className="flex-center flex-wrap gap-4">
        <ProductCard />
        <ProductCard />
        <ProductCard />
        <ProductCard />
      </div>
    </section>
  );
};

export default ProductSection;