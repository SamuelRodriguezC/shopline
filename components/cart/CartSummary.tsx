"use client"
import React, { useState } from 'react'
import Button from '../uiComponents/Button'
import { useCart } from '@/context/CartContext'
import { initiatePayment } from '@/lib/api'

const CartSummary = ({total, loggedInUserEmail}: {total: number, loggedInUserEmail: string | null | undefined}) => {

  const tax = 5
  const sub_total = Number(total)
  const total_format = (tax + sub_total).toFixed(2)
  const sub_total_format = sub_total.toFixed(2)

  const [ initiatePaymentLoader, setInitiatePaymentLoader  ]= useState(false)

  // Obtener el código del carrito
  const { cartCode } = useCart()

  // 
  async function handleInitiatePayment(){

    // Alistar información para enviar a la api
    const paymentInfo = { email:loggedInUserEmail, cart_code: cartCode}
    setInitiatePaymentLoader(true)
    try{
        // Llamar funcion de la api enviando datos para hacer el pago 
        const response = await initiatePayment(paymentInfo)

        // Redirigir al la url enviada como respuesta de la api
        window.location.href = response.data.url
    }
    catch(err: unknown){
        if (err instanceof Error) {
            throw new Error(err.message)
        }
        throw new Error("Un Error Desconocido ha Ocurrido")
    }
    finally{
      setInitiatePaymentLoader(false)
    }

  }

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

  

    <Button className='checkout-btn' handleClick={handleInitiatePayment} disabled={!Boolean(loggedInUserEmail) || total < 10 || initiatePaymentLoader}>
        {loggedInUserEmail ? initiatePaymentLoader ? "Redireccionando a Stripe" : "Continuar con el Proceso de Pago" : "Inicia Sesión para Pagar"}
    </Button>

  </div>
  )
}

export default CartSummary