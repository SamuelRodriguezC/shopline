import { auth } from '@/auth';
import ProductCard from '@/components/home/Productcard';
import { productSearch } from '@/lib/api';
import { Product } from '@/lib/type';
import { Metadata } from 'next';
import React from 'react';

export const metadata: Metadata = {
  title: "Shopline - Buscar",
  description: "...",
};

const SearchPage = async ({ searchParams }: { searchParams: Promise<{ query: string | null | undefined }> }) => {

  // Obtener el parámetros 
  const params = await searchParams;
  const query = params.query;

  // Ejecutar busqueda
  const searchedProducts = await productSearch(query);

  // Obtener el email del usuario en sesión 
  const session = await auth()
  const loggedInUserEmail = session?.user?.email

  return (
    <div className="main-max-width mx-auto padding-x py-9">
      <p className="font-thin text-center text-xl">
        Has Buscado - <span className="font-semibold">{query || "Sin término de búsqueda"}</span>
      </p>

      <div className="flex-center flex-wrap my-9 gap-4">

        {/* Si la cantidad de productos encontrados es mayor a 1 */}
        {searchedProducts?.length > 0 ? (
          searchedProducts.map((product: Product) => (
            <ProductCard key={product.id} product={product} loggedInUserEmail={loggedInUserEmail}/>
          ))
        ) 
        // De lo contrario 
        : (
          <p className="font-thin text-center text-lg">
            No hay ningún producto que coincida con la búsqueda
          </p>
        )}
      </div>
    </div>
  );
};

export default SearchPage;
