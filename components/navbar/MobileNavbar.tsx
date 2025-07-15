import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
// Importa los componentes del "Sheet" (deslizable lateral tipo modal)
// Generalmente usados para menús laterales o paneles emergentes

import { FaHamburger } from "react-icons/fa";
// Importa el ícono de hamburguesa del paquete react-icons (FontAwesome)

import NavItems from "./NavItems";
// Importa el componente NavItems (probablemente la lista de enlaces de navegación)


const MobileNavbar = () => {
  return (
    <Sheet>
      {/* Componente principal que envuelve el comportamiento del panel lateral */}
      <SheetTrigger>
        {/* Define qué elemento abrirá el Sheet al hacer clic */}
        <FaHamburger className="text-3xl cursor-pointer" />
      </SheetTrigger>

       {/* Contenido del panel que se desliza desde el lado izquierdo */}
      <SheetContent side="left">
        <SheetHeader>
          <SheetTitle className="text-center font-bold text-xl">
            Shopline
          </SheetTitle>
        </SheetHeader>

        <NavItems mobile />

      </SheetContent>
    </Sheet>
  );
};

export default MobileNavbar;