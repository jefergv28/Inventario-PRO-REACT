import React from "react";

// Datos de testimonios
const testimonialsData = [
  {
    name: "Juan Pérez",
    position: "Gerente de Logística",
    img: "/images/juan.png", // Aquí pondrás la ruta de la imagen de Juan
    testimony:
      "La app de gestión de inventarios me ha ayudado a mejorar la organización y eficiencia de mi empresa. Ahora podemos tener un control total sobre nuestro stock y recibir alertas cuando los productos estén bajos.",
    aosDelay: "0",
  },
  {
    name: "Ana Gómez",
    position: "Dueña de Tienda Online",
    img: "images/ana.png", // Aquí pondrás la ruta de la imagen de Ana
    testimony:
      "¡Increíble! La facilidad de uso y las opciones de filtrado avanzadas hacen que gestionar mi inventario sea mucho más rápido y preciso. ¡Altamente recomendada!",
    aosDelay: "300",
  },
  {
    name: "Carlos Rodríguez",
    position: "Propietario de Restaurante",
    img: "images/carlos.png", // Aquí pondrás la ruta de la imagen de Carlos
    testimony:
      "La herramienta nos ha ayudado a llevar un registro detallado de todos los productos que usamos en nuestra cocina, evitando faltantes y mejorando la logística.",
    aosDelay: "600",
  },
  {
    name: "Laura Martínez",
    position: "Fundadora de Startup",
    img: "images/laura.png", // Aquí pondrás la ruta de la imagen de Laura
    testimony:
      "Con la app, puedo manejar el inventario de mi negocio sin tener que contratar personal adicional. Es intuitiva y tiene todo lo que necesito para administrar mi stock.",
    aosDelay: "900",
  },
  {
    name: "Miguel Sánchez",
    position: "Consultor Empresarial",
    img: "images/miguel.png", // Aquí pondrás la ruta de la imagen de Miguel
    testimony:
      "El sistema de alertas y la opción de generar reportes son esenciales para mantener el control de los productos. Es una herramienta que cualquier pequeña o mediana empresa debería tener.",
    aosDelay: "1200",
  },
];

const Testimonial = () => {
  return (
    <>
      <span id="testimonials"></span>
      <div className="bg-neutral-200 dark:bg-slate-900 dark:text-white py-12 sm:grid sm:place-items-center">
        <div className="container">
          {/* Header */}
          <div className="pb-12 text-center space-y-3">
            <h1
              data-aos="fade-up"
              className="text-3xl font-semibold sm:text-3xl text-zinc-950 dark:text-white"
            >
              Testimonios
            </h1>
            <p
              data-aos="fade-up"
              className="text-gray-600 dark:text-gray-400 text-sm"
            >
              Lo que dicen nuestros clientes sobre nuestra app de gestión de
              inventarios.
            </p>
          </div>

          {/* Testimonios */}
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
            {testimonialsData.map((testimonial) => (
              <div
                key={testimonial.name}
                data-aos="fade-up"
                data-aos-delay={testimonial.aosDelay}
                className="card space-y-3 sm:space-y-4 p-6 bg-white dark:bg-gray-800 rounded-lg shadow-md"
              >
                <div className="flex items-center space-x-4">
                  <img
                    src={testimonial.img}
                    alt={testimonial.name}
                    className="w-16 h-16 rounded-full object-cover"
                  />
                  <div>
                    <h1 className="text-lg font-semibold">
                      {testimonial.name}
                    </h1>
                    <p className="text-gray-600 dark:text-gray-400">
                      {testimonial.position}
                    </p>
                  </div>
                </div>
                <p className="text-gray-600 dark:text-gray-300 mt-4">
                  "{testimonial.testimony}"
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default Testimonial;
