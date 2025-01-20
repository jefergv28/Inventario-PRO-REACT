import React from "react";
import { FaBox } from "react-icons/fa";
import { GiArchiveResearch } from "react-icons/gi";
import { IoMdAlert } from "react-icons/io";
import { MdReport } from "react-icons/md";
import { BsSearch } from "react-icons/bs"; // Para la búsqueda

const servicesData = [
  {
    name: "Gestión de Inventarios",
    icon: <FaBox className="text-4xl text-primary" />,
    link: "#",
    description:
      "Administra tus productos de forma eficiente. Añade, edita y elimina artículos fácilmente desde tu inventario.",
    aosDelay: "0",
  },
  {
    name: "Alertas de Stock",
    icon: <IoMdAlert className="text-4xl text-primary" />,
    link: "#",
    description:
      "Recibe notificaciones automáticas cuando los productos lleguen a niveles bajos de stock, para que no te quedes sin inventario.",
    aosDelay: "300",
  },
  {
    name: "Reportes de Inventario",
    icon: <MdReport className="text-4xl text-primary" />,
    link: "#",
    description:
      "Genera reportes detallados sobre el estado de tu inventario, con información clara y precisa sobre cantidades y movimientos.",
    aosDelay: "500",
  },
  {
    name: "Control de Movimientos",
    icon: <GiArchiveResearch className="text-4xl text-primary" />,
    link: "#",
    description:
      "Mantén un registro completo de todas las entradas y salidas de productos, permitiendo un seguimiento detallado de cada movimiento.",
    aosDelay: "700",
  },
  {
    name: "Búsqueda de Productos",
    icon: <BsSearch className="text-4xl text-primary" />,
    link: "#",
    description:
      "Encuentra fácilmente cualquier producto en tu inventario mediante un sistema de búsqueda avanzado.",
    aosDelay: "900",
  },
  {
    name: "Filtrado Avanzado",
    icon: <GiArchiveResearch className="text-4xl text-primary" />,
    link: "#",
    description:
      "Filtra los productos según criterios como categoría, precio, fecha de ingreso y más, para encontrar exactamente lo que necesitas.",
    aosDelay: "1100",
  },
];

const Services = () => {
  return (
    <>
      <span id="services"></span>
      <div className="bg-gray-100 dark:bg-black dark:text-white py-12 sm:grid sm:place-items-center">
        <div className="container">
          {/* Header */}
          <div className="pb-12 text-center space-y-3">
            <h1
              data-aos="fade-up"
              className="text-3xl font-semibold sm:text-3xl text-zinc-900 dark:text-white"
            >
              Descubre Nuestros Servicios
            </h1>
            <p
              data-aos="fade-up"
              className="text-gray-600 dark:text-gray-400 text-sm"
            >
              Ofrecemos soluciones avanzadas para la gestión eficiente de tu
              inventario. Descubre cómo podemos ayudarte.
            </p>
          </div>

          {/* services cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6">
            {servicesData.map((service) => (
              <div
                key={service.name}
                data-aos="fade-up"
                data-aos-delay={service.aosDelay}
                className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg 
                hover:scale-110 hover:shadow-lg
                "
              >
                <div className="flex justify-center mb-4">{service.icon}</div>
                <h2 className="text-xl font-semibold text-center text-zinc-900 dark:text-white">
                  {service.name}
                </h2>
                <p className="text-gray-600 dark:text-gray-400 text-center mt-2">
                  {service.description}
                </p>
              </div>
            ))}
          </div>

          {/* button */}
          <div
            data-aos="fade-up"
            data-aos-delay="1300"
            data-aos-offset="0"
            className="text-center mt-8"
          >
            <button className="primary-btn">Saber Más</button>
          </div>
        </div>
      </div>
    </>
  );
};

export default Services;
