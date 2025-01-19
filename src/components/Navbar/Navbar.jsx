import React, { useState, useEffect } from "react";
import { HiMenuAlt3, HiMenuAlt1 } from "react-icons/hi";
import ResponsiveMenu from "./ResponsiveMenu";
import Logo from "../../assets/website/Vector.svg";
import DarkMode from "./DarkMode";

export const MenuLinks = [
  { id: 1, name: "Home", link: "#home" },
  { id: 2, name: "Acerca de", link: "#acerca-de" },
  { id: 3, name: "Servicios", link: "#services" },
  { id: 4, name: "Contacto", link: "#contacto" },
];

const Navbar = () => {
  const [showMenu, setShowMenu] = useState(false);
  const [isSticky, setIsSticky] = useState(false);

  // Función para cambiar el estado de sticky al hacer scroll
  const handleScroll = () => {
    if (window.scrollY > 10) {
      setIsSticky(true);
    } else {
      setIsSticky(false);
    }
  };

  // Detectamos el evento scroll
  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  // Función para alternar el estado del menú
  const toggleMenu = () => {
    setShowMenu(!showMenu);
  };

  return (
    <div
      className={`fixed top-0 left-0 w-full z-10 transition-all duration-300 ${
        isSticky
          ? "bg-opacity-90 bg-zinc-300 dark:bg-black"
          : "bg-opacity-100 bg-transparent"
      }`}
    >
      <div className="container py-3 md:py-2">
        <div className="flex justify-between items-center">
          {/* Logo */}
          <a target="_blank" href="/" className="flex items-center gap-3">
            <img
              src={Logo}
              width={60}
              height={60}
              alt="logo"
              className="logo"
            />
            <span className="text-2xl sm:text-2xl font-semibold">
              Inventario PRO
            </span>
          </a>

          {/* Desktop view Navigation */}
          <nav className="hidden md:block">
            <ul className="flex items-center gap-8">
              {MenuLinks.map(({ id, name, link }) => (
                <li key={id} className="py-4">
                  <a
                    href={link}
                    className="text-lg font-medium hover:text-primary-100 py-2 hover:border-b-2 hover:border-primary-100 transition-colors duration-500"
                  >
                    {name}
                  </a>
                </li>
              ))}
              <button className="bg-primary-100 text-white px-6 py-3 rounded-lg hover:bg-secondary-300 active:bg-primary-100 transition-colors sm:px-4 sm:py-2">
                Iniciar sesión
              </button>
              <button className="bg-zinc-200 text-zinc-900 px-6 py-3 rounded-lg hover:bg-secondary-300 active:bg-zinc-300 transition-colors sm:px-4 sm:py-2">
                Registro
              </button>
              <DarkMode />
            </ul>
          </nav>

          {/* Mobile view Hamburger Icon */}
          <div className="flex items-center gap-4 md:hidden">
            <DarkMode />
            {showMenu ? (
              <HiMenuAlt1
                onClick={toggleMenu}
                className="cursor-pointer transition-all"
                size={30}
                aria-label={toggleMenu}
              />
            ) : (
              <HiMenuAlt3
                onClick={toggleMenu}
                className="cursor-pointer transition-all"
                size={30}
                aria-label={toggleMenu}
              />
            )}
          </div>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      <ResponsiveMenu showMenu={showMenu} />
    </div>
  );
};

export default Navbar;
