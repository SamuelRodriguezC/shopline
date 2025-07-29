import { auth } from "@/auth";
import CartItem from "@/components/cart/CartItem";
import CartSummary from "@/components/cart/CartSummary";
import { getCart } from "@/lib/api";
import { CartType } from "@/lib/type";
import React from "react";

const CartItemPage = async ({params}: {params: Promise<{cartcode: string}>}) => {

  // Obtiene el código del carrito desde los parámetros de la url
  const {cartcode} = await params

  // Llama a la API para obtener los detalles del carrito pasandole el código del carrito
  const cart:CartType = await getCart(cartcode)

  // Obtener los items del carrito
  const cartItems = cart.cartitems

  // Obtener la cantidad de items del carrito
  const cartitems_count = cart.cartitems.length;

  // Obtener el total del carrito
  const total_cart = cart.cart_total;

  const session = await auth()

  const loggedInUserEmail = session?.user?.email

  return (
    <div className="main-max-width padding-x mx-auto py-9">
      <h1 className="font-semibold text-2xl text-gray-800 mb-6">Carrito</h1>

      <div className="flex flex-wrap gap-6 lg:gap-8 justify-between w-full">
        {/* Cartitem */}
        <div className="w-[600px] max-lg:w-full border border-gray-200 shadow-sm rounded-lg bg-white overflow-hidden flex-1">
          <div className="max-h-[400px] overflow-y-auto px-6 py-4">
            {cartitems_count > 0 ? (cartItems.map((cartitem) => <CartItem key={cartitem.id} cartItem={cartitem}/>)) : <p className="text-center text-gray-500 py-10">Tu Carrito Está Vacío.</p>}
          </div>
        </div>
        {/* Cartitem */}

        <CartSummary total={total_cart} loggedInUserEmail={loggedInUserEmail} />
      </div>
    </div>
  );
};

export default CartItemPage;