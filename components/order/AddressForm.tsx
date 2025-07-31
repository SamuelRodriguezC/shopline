"use client"

import React, { useState } from 'react'
import { Input } from '../ui/input'
import { addAddress } from '@/lib/api'
import { toast } from 'react-toastify'
import { AddressType } from '@/lib/type'

const AddressForm = ({loggedInUserEmail, address}: {loggedInUserEmail: string | null | undefined, address: AddressType | undefined}) => {

    const [ street, setStreet] = useState(address?.street ? address.street : "") // Usa el valor de 'street' si existe; si no, deja el campo vacío
    const [ city, setCity ] = useState(address?.city ? address.city : "") // Usa el valor de 'city' si existe; si no, deja el campo vacío
    const [ state, setState ] = useState(address?.state ? address.state : "") // Usa el valor de 'state' si existe; si no, deja el campo vacío
    const [ phone, setPhone ] = useState(address?.phone ? address.phone : "") // Usa el valor de 'phone' si existe; si no, deja el campo vacío
    const [ btnLoader, setBtnLoader ] = useState(false)
    

    function disabledButton(){
        if (street.trim().length <= 2 || city.trim().length <= 2 || state.trim().length <= 2 || phone.trim().length <= 9 || phone.trim().length >= 11){
            return true
        }
        return false
        
    }

    async function handleAddress(e: React.FormEvent<HTMLElement>){
        e.preventDefault()
        const addressObj = {state, street, phone, city, email: loggedInUserEmail}
        setBtnLoader(true)

        try{
            await addAddress(addressObj)
            toast.success("Dirección agregada Correctamente")

            // Limpiar campos luego de enviar la solicitud post
            setStreet("")
            setCity("")
            setState("")
            setPhone("")
        }
        catch(err: unknown){
            if (err instanceof Error){
                toast.error("Ha Ocurrido un Error, Intentalo más Tarde")
            }
            toast.error("Ha Ocurrido un Error Desconocido")
        }
        finally{
            setBtnLoader(false)
        }
    }

    return (
        <form onSubmit={handleAddress} className="w-full mx-auto bg-white p-8 rounded-2xl space-y-6">
            <h2 className="text-2xl font-semibold text-gray-800 text-center mb-6">
                Dirección de Envío
            </h2>

            <div className="space-y-4">
                {/* Dirección */}
                <Input
                    placeholder='Dirección de Calle' 
                    value={street}
                    // onChange actualiza la variable de estado con el valor del input en tiempo real.
                    onChange={(e) => setStreet(e.target.value)}
                    className="w-full h-12 px-4 rounded-md border-gray-300 focus:border-black focus:ring-2 focus:ring-black transition-all  duration-300" 
                    required>
                </Input>
                
                {/* Ciudad */}
                <Input 
                    placeholder='Ciudad' 
                    value={city}
                    onChange={(c) => setCity(c.target.value)}
                    className="w-full h-12 px-4 rounded-md border-gray-300 focus:border-black focus:ring-2 focus:ring-black transition-all  duration-300">
                </Input>
                
                {/* Estado */}
                <Input 
                    placeholder='Estado'
                    value={state}
                    onChange={(s) => setState(s.target.value)}
                    className="w-full h-12 px-4 rounded-md border-gray-300 focus:border-black focus:ring-2 focus:ring-black transition-all  duration-300">
                </Input>
                
                {/* Telefono Celular */}
                <Input
                    placeholder='Telefono Celular' 
                    // type='number'
                    value={phone}
                    onChange={(p) => setPhone(p.target.value)}
                    className="w-full h-12 px-4 rounded-md border-gray-300 focus:border-black focus:ring-2 focus:ring-black transition-all  duration-300">
                </Input>
            </div>

            <button 
                type='submit' 
                className="w-full h-12 bg-black text-white font-medium rounded-md hover:bg-gray-900 transition-all duration-300 cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed" 
                disabled={disabledButton() || btnLoader}>
                    
                    {btnLoader ? "Guardando Dirección..." : address?.city ? "Acualizar Dirección" : "Guardar"}
                
            </button>

        </form>
    )
}

export default AddressForm