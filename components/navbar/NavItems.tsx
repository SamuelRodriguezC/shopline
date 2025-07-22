import React from "react";
import Link from "next/link";
import { FaCartShopping } from "react-icons/fa6";
import { cn } from "@/lib/utils";
import Image from "next/image";
import { signOutUser } from "@/lib/actions";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
import { useCart } from "@/context/CartContext";



interface Props {
  mobile?: boolean
  loggedInUser: {
    name: string;
    email: string;
    image: string;
  }
}
// Extender sweetalert para poder renderizar contenido React dentro de las alertas
const MySwal = withReactContent(Swal);

const NavItems = ({ mobile, loggedInUser }: Props) => {
  // Función para mostrar alerta (sweeraler) al cerrar sesión
  const handleLogout = async () => {
    const result = await MySwal.fire({
      title: "¿Estás seguro?",
      text: "Se cerrará tu sesión",
      icon: "warning",
      confirmButtonColor: "#3085d6",
      showCancelButton: true,
      confirmButtonText: "Sí, cerrar sesión",
      cancelButtonText: "Cancelar",
    })
    if (result.isConfirmed) {
      Swal.fire({
          icon: "success",
          title: "Tu Sesión ha sido Cerrada Correctamente",
          showConfirmButton: false,
          timer: 1500
      });
      await signOutUser();
    }
  };

  const { cartItemCount } =  useCart()

  return (
    <div className={cn("flex items-center justify-center gap-6", mobile ? "flex-col" : "flex-row")}>


      {loggedInUser ? //Si el usuario está logeado 
        <>
          <div className="w-[50px] h-[50px] rounded-full overflow-hidden shadow-md relative">
          {/* Profile picture container */}
          <Image src={loggedInUser.image} alt="Foto de Perfil" className="object-cover" fill/>
        </div>

        <Link
          href="/profile"
          className="text-lg font-medium text-gray-900 hover:text-gray-700 transition"
        >
          {loggedInUser.name}
        </Link>

          
            <button className="nav-btn" onClick={handleLogout}>Cerrar</button>
        </>

        // De lo contrario
        :
        <Link href="/signin" className="nav-btn">Ingresar</Link>
      }


      <div className="relative flex items-center h-[60px] w-[60px] justify-center cursor-pointer">
        <FaCartShopping className="text-4xl" />

        {cartItemCount == 0 || <span className="absolute top-0 right-0 px-2 py-0.5 bg-black rounded-full text-white">
          {cartItemCount}
        </span>}
      </div>
    </div>
  );
};

export default NavItems;