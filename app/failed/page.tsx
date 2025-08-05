import { AlertTriangle } from 'lucide-react'
import Link from 'next/link'
import React from 'react'

const page = () => {
    return (
        <section className="bg-gradient-to-br from-red-50 to-red-100 px-6 py-20 text-center">
            <div className="max-w-3xl mx-auto space-y-8">
                <div className="flex justify-center">
                    <div className="bg-red-100 p-4 rounded-full shadow-inner">
                        <AlertTriangle className="w-10 h-10 text-red-600"/>
                    </div>
                </div>

                <h1 className="text-4xl md:text-5xl font-semibold text-red-900 leading-snug">Upps! Pago Fallido</h1>

                <p className="text-lg md:text-xl text-red-800 max-w-2xl mx-auto">Algo ha salido mal en el proceso de pago, No te preocupes tu orden no ha sido cargada.</p>

                <div className="flex flex-col sm:flex-row justify-center gap-4 py-4">
                    <Link href='/checkout' className="inline-block px-6 py-3 rounded-full bg-red-600 text-white text-base font-medium hover:bg-red-800 transition duration-100">Intentar de Nuevo.</Link>
                    <Link href='/contact' className="inline-block px-6 py-3 rounded-full bg-black text-white text-base font-medium hover:bg-gray-800 transition duration-100">Contactar a Soporte.</Link>
                </div>

            </div>
        </section>
    )
}

export default page