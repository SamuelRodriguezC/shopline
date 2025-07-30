import { PartyPopper } from 'lucide-react'
import Link from 'next/link'
import React from 'react'

const page = () => {
  return (
    <section className="bg-gradient-to-br from-green-50 px-6 py-20 text-center">
        <div className="max-w-4xl mx-auto space-y-8">
                <div className="flex justify-center">
                <div className="bg-green-100 p-4 rounded-full shadow-inner">
                    <PartyPopper className="w-10 h-10 text-green-600"/>
                </div>
            </div>
            <h1 className="text-4xl md:text-5xl font-semibold text-green-900 leading-snug">Gracias por tu Compra!</h1>
            <p className="text-lg md:text-xl text-green-800 max:w-2xl mx-auto">
                Su pedido se ha realizado correctamente. Agradecemos sinceramente su confianza y le enviaremos información actualizada una vez que se envíe su pedido.
            </p>
            <div className="flex flex-col sm:flex-row justify-center gap-4 pt-4">
                <Link href='/profile' className="inline-block px-6 py-3 rounded-full bg-green-700 text-white text-base font-medium hover:bg-green-800 transition duration-100">Ver Orden</Link>
                <Link href='/' className="inline-block px-6 py-3 rounded-full bg-black text-white text-base font-medium hover:bg-gray-800 transition duration-100">Continuar Comprando</Link>
            </div>
        </div>
    </section>
  )
}

export default page