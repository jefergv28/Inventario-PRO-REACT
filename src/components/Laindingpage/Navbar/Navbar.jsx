import React, { useState, useEffect } from "react";
import { HiMenuAlt3, HiMenuAlt1 } from "react-icons/hi";
import ResponsiveMenu from "./ResponsiveMenu";
import Logo from "../../..//assets/website/Vector.svg";
import DarkMode from "./DarkMode";

export const MenuLinks = [
  { id: 1, name: "Home", link: "#home" },
  { id: 2, name: "Acerca de", link: "#acerca-de" },
  { id: 3, name: "Servicios", link: "#services" },
  { id: 4, name: "Contacto", link: "#contacto" },
];

const Navbar = ({ onLogin, buttonRef }) => {
  const [showMenu, setShowMenu] = useState(false);
  const [isSticky, setIsSticky] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsSticky(window.scrollY > 10);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const toggleMenu = () => setShowMenu((prev) => !prev);

  return (
    <div
      className={`fixed top-0 left-0 w-full z-10 transition-all duration-300 ${
        isSticky
          ? "bg-opacity-90 bg-zinc-300 dark:bg-slate-900"
          : "bg-opacity-100 bg-transparent"
      }`}
    >
      <div className="container py-2 md:py-2 sm:py-2">
        <div className="flex justify-between items-center">
          {/* Logo */}
          <a href="/" className="flex items-center gap-3">
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

          {/* Desktop Navigation */}
          <nav className="hidden md:flex gap-8 items-center">
            {MenuLinks.map(({ id, name, link }) => (
              <a
                key={id}
                href={link}
                className="text-lg font-medium hover:text-primary-100 py-2 hover:border-b-2 hover:border-primary-100 transition-colors"
              >
                {name}
              </a>
            ))}
            <button
              ref={buttonRef}
              onClick={() => onLogin(true)}
              className="bg-primary-100 text-white px-6 py-3 rounded-lg hover:bg-secondary-300 sm:px-4 sm:py-2"
            >
              Iniciar sesión
            </button>
            <button
              onClick={() => onLogin(false)}
              className="bg-zinc-200 text-zinc-900 px-6 py-3 rounded-lg hover:bg-secondary-300 sm:px-4 sm:py-2"
            >
              Registro
            </button>
            <DarkMode />
          </nav>

          {/* Mobile Menu Icon */}
          <button
            onClick={toggleMenu}
            aria-expanded={showMenu}
            aria-label="Toggle Menu"
            className="md:hidden"
          >
            {showMenu ? <HiMenuAlt1 size={30} /> : <HiMenuAlt3 size={30} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {showMenu && <ResponsiveMenu showMenu={showMenu} />}
    </div>
  );
};

export default Navbar;
