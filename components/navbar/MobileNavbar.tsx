import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { FaHamburger } from "react-icons/fa";
import NavItems from "./NavItems";

interface Props{
  loggedInUser:{
    name: string;
    email: string;
    image: string;
  }
}

const MobileNavbar = ({loggedInUser}: Props) => {
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

        <NavItems mobile loggedInUser={loggedInUser}/>

      </SheetContent>
    </Sheet>
  );
};

export default MobileNavbar;