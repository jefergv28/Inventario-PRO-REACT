import React from "react";
import { FaFacebook, FaInstagram, FaLinkedin } from "react-icons/fa";

const Footer = () => {
  return (
    <div className="bg-neutral-200 dark:bg-slate-900 text-black dark:text-white">
      <section className="container py-10">
        <div className="grid md:grid-cols-3 py-5">
          {/* Mapa del Sitio */}
          <div className="py-8 px-4">
            <h1 className="sm:text-3xl text-xl font-bold sm:text-left text-justify mb-3 flex items-center gap-3">
              Mapa del Sitio
            </h1>
            <ul className="flex flex-col gap-3">
              <li className="cursor-pointer hover:translate-x-1 duration-300 hover:!text-primary-100 text-gray-400">
                <a href="#home">Home</a>
              </li>
              <li className="cursor-pointer hover:translate-x-1 duration-300 hover:!text-primary-100 text-gray-400">
                <a href="#about">Acerca de</a>
              </li>
              <li className="cursor-pointer hover:translate-x-1 duration-300 hover:!text-primary-100 text-gray-400">
                <a href="#services">Servicios</a>
              </li>
              <li className="cursor-pointer hover:translate-x-1 duration-300 hover:!text-primary-100 text-gray-400">
                <a href="#contacto">Contacto</a>
              </li>
            </ul>
          </div>

          {/* Detalles de la Empresa */}
          <div className="py-8 px-4">
            <h1 className="sm:text-3xl text-xl font-bold sm:text-left text-justify mb-3 flex items-center gap-3">
              InventarioPRO
            </h1>
            <p className="text-sm">
              Un sistema avanzado para la gestión de inventarios. Administra
              productos, proveedores y movimientos de forma eficiente y
              sencilla.
            </p>
            <br />
            {/* Redes Sociales */}
            <div className="flex items-center gap-4 mt-6">
              <a
                href="https://www.instagram.com"
                target="_blank"
                rel="noopener noreferrer"
              >
                <FaInstagram className="text-2xl hover:text-primary-100 duration-300" />
              </a>
              <a
                href="https://www.facebook.com"
                target="_blank"
                rel="noopener noreferrer"
              >
                <FaFacebook className="text-2xl hover:text-primary-100 duration-300" />
              </a>
              <a
                href="https://www.linkedin.com"
                target="_blank"
                rel="noopener noreferrer"
              >
                <FaLinkedin className="text-2xl hover:text-primary-100 duration-300" />
              </a>
            </div>
          </div>
        </div>

        {/* Copyright */}
        <div className="text-center py-4 border-t border-gray-600">
          <p className="text-sm text-gray-400">
            © InventarioPRO 2025. Todos los derechos reservados.
          </p>
        </div>
      </section>
    </div>
  );
};

export default Footer;
