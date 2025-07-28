import ProductCard from '@/components/home/Productcard';
import { productSearch } from '@/lib/api';
import { Product } from '@/lib/type';
import React from 'react';

const SearchPage = async ({ searchParams }: { searchParams: { query: string | null | undefined } }) => {

  const query = searchParams.query;
  const searchedProducts = await productSearch(query);

  return (
    <div className="main-max-width mx-auto padding-x py-9">
      <p className="font-thin text-center text-xl">
        Has Buscado - <span className="font-semibold">{query || "Sin término de búsqueda"}</span>
      </p>

      <div className="flex-center flex-wrap my-9 gap-4">
        {searchedProducts?.length > 0 ? (
          searchedProducts.map((product: Product) => (
            <ProductCard key={product.id} product={product} />
          ))
        ) : (
          <p className="font-thin text-center text-lg">
            No hay ningún producto que coincida con la búsqueda
          </p>
        )}
      </div>
    </div>
  );
};

export default SearchPage;
