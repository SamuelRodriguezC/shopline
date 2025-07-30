import React from 'react'
import Button from '../uiComponents/Button'

const CartSummary = ({total, loggedInUserEmail}: {total: number, loggedInUserEmail: string | null | undefined}) => {

  const tax = 5
  const sub_total = Number(total)
  const total_format = (tax + sub_total).toFixed(2)

  const sub_total_format = sub_total.toFixed(2)

  return (
    <div className="w-[400px] max-lg:w-full border border-gray-200 rounded-lg shadow-md bg-white px-8 py-6">
    <h2 className="font-semibold text-2xl text-gray-800 mb-6">Resumen del Pedido</h2>

    <div className="w-full flex items-center justify-between py-2">
      <p className="text-gray-600 font-medium">Subtotal</p>
      <p className="text-gray-800 font-semibold">${sub_total_format}</p>
    </div>

    <div className="w-full flex items-center justify-between py-2">
      <p className="text-gray-500 font-medium">Impuestos Estimados</p>
      <p className="text-gray-800 font-semibold">$5.00</p>
    </div>

    <hr className="my-4 border-gray-300" />

    <div className="w-full flex items-center justify-between py-2">
      <p className="text-lg font-semibold text-gray-800">Total</p>
      <p className="text-lg font-bold text-black">${total_format}</p>
    </div>

  

    <Button className='checkout-btn' disabled={!Boolean(loggedInUserEmail) || total < 10}>
        {loggedInUserEmail ? "Continuar con el Proceso de Pago" : "Inicia Sesión para Pagar"}
    </Button>

  </div>
  )
}

export default CartSummary