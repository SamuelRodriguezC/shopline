// import React from 'react'
// import Image from "next/image"
// import { signIn } from '@/auth'

// // Página de registro/inicio de sesión usando Google como proveedor
// const SignupPage = () => {
//   return (
//     <div className="bg-gray-50 flex items-center justify-center min-h-screen px-4">
//     {/* Contenedor del formulario de registro */}
//     <div className="bg-white shadow-xl rounded-2xl p-6 sm:p-10 max-w-sm w-full flex flex-col gap-6">
//       <h2 className="text-3xl font-semibold text-center text-gray-900">
//         Bienvenido!
//       </h2>
  
//       {/* Formulario que ejecuta una Server Action al enviarse,
//       iniciando sesión con Google y redirigiendo al home al finalizar. */}
//       <form action= {async () => {
//         "use server"
//         await signIn("google", {redirectTo: "/"})
//       }}>
//         <button className="w-full flex items-center cursor-pointer justify-center border border-gray-300 hover:border-gray-500 text-gray-700 font-medium py-3 rounded-lg shadow-sm transition-all duration-300 bg-white hover:bg-gray-100">
//           <Image
//             src="/google.png"
//             alt="Google Icon"
//             width={30}
//             height={30}
//             className="mr-3"
//           />
//           Continuar con Google
//         </button>
//       </form>
//     </div>
//   </div>
//   )
// }

// export default SignupPage



"use client"
import React from 'react'
import Image from "next/image"
import { signIn } from 'next-auth/react'

const SignupPage = () => {
  return (
    <div className="bg-gray-50 flex items-center justify-center min-h-screen px-4">
      <div className="bg-white shadow-xl rounded-2xl p-6 sm:p-10 max-w-sm w-full flex flex-col gap-6">
        <h2 className="text-3xl font-semibold text-center text-gray-900">
          Bienvenido!
        </h2>

        <button
          onClick={() => signIn("google", { callbackUrl: "/" })}
          className="w-full flex items-center cursor-pointer justify-center border border-gray-300 hover:border-gray-500 text-gray-700 font-medium py-3 rounded-lg shadow-sm transition-all duration-300 bg-white hover:bg-gray-100"
        >
          <Image
            src="/google.png"
            alt="Google Icon"
            width={30}
            height={30}
            className="mr-3"
          />
          Continuar con Google
        </button>
      </div>
    </div>
  )
}

export default SignupPage
