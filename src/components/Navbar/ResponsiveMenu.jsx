import { FaFacebook, FaTwitter, FaInstagram } from "react-icons/fa";
import React from "react";
import { FaUserCircle } from "react-icons/fa"; // Solo el icono de usuario
import { MenuLinks } from "./Navbar";

const ResponsiveMenu = ({ showMenu, toggleMenu }) => {
  const handleLinkClick = () => {
    toggleMenu(); // Cierra el menú al hacer clic en un enlace
  };

  return (
    <div
      className={`${
        showMenu ? "left-0" : "-left-full"
      } fixed bottom-0 top-0 z-20 flex h-screen w-[75%] flex-col justify-between bg-white dark:bg-gray-900 dark:text-white px-8 pb-6 pt-16 text-black transition-all duration-200 md:hidden rounded-r-xl shadow-md`}
    >
      <div className="flex items-center gap-3">
        <FaUserCircle size={50} />
        <div>
          <h1>Hola usuario</h1>
          <h1 className="text-sm text-slate-500">Premium user</h1>
        </div>
      </div>

      {/* Menú de enlaces */}
      <nav className="mt-12">
        <ul className="space-y-4 text-xl ">
          {MenuLinks.map((data) => (
            <li key={data.name}>
              <a
                href={data.link}
                className=" mb-5 inline-block text-gray-700 hover:text-primary-100 hover:underline transition-all duration-300"
                onClick={handleLinkClick} // Cierra el menú al hacer clic en un enlace
              >
                {data.name}
              </a>
            </li>
          ))}
        </ul>
      </nav>

      {/* Botones de Iniciar sesión y Registro */}
      <div className="mt-8 flex flex-col gap-4">
        <button
          className="bg-primary-100
         text-white px-6 py-3 rounded-lg 
          hover:bg-secondary-300 active:bg-primary-100
           transition-colors w-full"
        >
          Iniciar sesión
        </button>
        <button
          className="bg-zinc-200
         text-zinc-900 px-6 py-3 rounded-lg
          hover:bg-secondary-300 active:bg-slate-300
          transition-colors w-full"
        >
          Registro
        </button>
      </div>

      <div className="footer  mt-auto flex justify-center items-center gap-6 py-4">
        <a
          href="https://www.facebook.com"
          target="_blank"
          rel="noopener noreferrer"
          className="text-xl text-gray-600 hover:text-primary-100 hover:underline transition-colors"
        >
          <FaFacebook size={30} />
        </a>
        <a
          href="https://www.twitter.com"
          target="_blank"
          rel="noopener noreferrer"
          className="text-xl text-gray-600 hover:text-primary-100 hover:underline transition-colors"
        >
          <FaTwitter size={30} />
        </a>
        <a
          href="https://www.instagram.com"
          target="_blank"
          rel="noopener noreferrer"
          className="text-xl text-gray-600 hover:text-primary-100 hover:underline transition-colors"
        >
          <FaInstagram size={30} />
        </a>
      </div>
    </div>
  );
};

export default ResponsiveMenu;
