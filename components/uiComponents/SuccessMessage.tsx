import { Link } from 'lucide-react'
import React from 'react'

const SuccessMessage = () => {
  return (
    <section className="bg-gradient-to-br from-green-50 px-6 py-20 text-center">
        <div className="max-w-4xl mx-auto space-y-8">
            <h1 className="text-4xl md:text-5xl font-semibold text-green-900 leading-snug">Gracias por tu Compra!</h1>
            <p className="text-lg md:text-xl text-green-800 max:w-2xl mx-auto">
                Tu orden ha sido realizada correctamente.
            </p>
            <div className="flex flex-col sm:flex-row justify-center gap-4 pt-4">
                <Link href='/profile' className="inline-block px-6 py-3 rounded-full bg-green-700 text-white text-base font-medium hover:bg-green-800 transition duration-100">Ver Orden</Link>
                <Link href='/' className="inline-block px-6 py-3 rounded-full bg-black text-white text-base font-medium hover:bg-gray-800 transition duration-100">Continuar Comprando</Link>
            </div>
        </div>
    </section>
  )
}

export default SuccessMessage