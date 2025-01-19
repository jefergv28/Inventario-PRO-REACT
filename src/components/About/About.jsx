import React, { useEffect } from "react";
import AOS from "aos";
import "aos/dist/aos.css";

const About = () => {
  useEffect(() => {
    AOS.init({ duration: 1000, once: true }); // Configura AOS para que la animación solo ocurra una vez
  }, []);

  return (
    <div className="py-20 bg-gray-50 dark:bg-gray-800 text-center">
      <div className="container mx-auto px-6">
        <h2 data-aos="fade-up" className="text-3xl font-semibold text-primary">
          Sobre Nosotros
        </h2>
        <p
          data-aos="fade-up"
          data-aos-delay="200"
          className="mt-4 text-lg text-gray-700 dark:text-gray-300"
        >
          Somos un equipo de emprendedores apasionados por ayudar a pequeñas
          empresas y emprendedores a gestionar sus inventarios de manera
          eficiente y accesible. Nos dimos cuenta de que la mayoría de las
          aplicaciones de inventario eran demasiado costosas, lo que dificultaba
          su acceso para muchos emprendedores y empresas pequeñas.
        </p>
        <p
          data-aos="fade-up"
          data-aos-delay="400"
          className="mt-4 text-lg text-gray-700 dark:text-gray-300"
        >
          Por eso creamos{" "}
          <span className="font-semibold text-primary">InventarioPRO</span>, una
          herramienta innovadora y asequible, diseñada específicamente para
          satisfacer las necesidades de gestión de inventarios de empresas
          emergentes. Nuestra misión es hacer que la gestión de inventarios sea
          fácil, económica y accesible para todos.
        </p>
      </div>
    </div>
  );
};

export default About;
