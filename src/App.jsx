import React, { useEffect, useState, useRef } from "react";
import AOS from "aos";
import "aos/dist/aos.css";

// Component import
import Navbar from "./components/Navbar/Navbar";
import Hero from "./components/Hero/Hero";
import About from "./components/About/About";
import Services from "./components/Services/Services";
import Testimonial from "./components/Testimonial/Testimonial";
import Contacto from "./components/Contacto/Contact";
import Footer from "./components/Footer/Footer";
import Modal from "./components/Modal/Modal"; // Importa el modal

const App = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isLogin, setIsLogin] = useState(true); // Estado para saber si es Login o Register

  // Abre el modal con el estado de Login o Register
  const openModal = (isLogin) => {
    setIsModalOpen(true);
    setIsLogin(isLogin); // Si es Login o Register
  };

  // Cierra el modal
  const closeModal = () => {
    setIsModalOpen(false);
  };

  // Cambia entre Login y Register
  const switchForm = () => {
    setIsLogin(!isLogin);
  };

  useEffect(() => {
    AOS.init({
      offset: 100,
      duration: 800,
      easing: "ease-in",
      delay: 100,
    });
    AOS.refresh();
  }, []);

  return (
    <div className="bg-white dark:bg-black dark:text-white text-black overflow-x-hidden">
      {/* Esto es el ancla para el enlace "Home" */}
      <div id="home"></div>

      {/* Pasa openModal como prop a Navbar */}
      <Navbar openModal={openModal} />
      <Hero />
      <About />
      <Services />
      <Testimonial />
      <Contacto />

      {/* Modal de Login y Register */}
      <Modal
        isOpen={isModalOpen}
        onClose={closeModal}
        isLogin={isLogin}
        onSwitch={switchForm}
      />

      <Footer />
    </div>
  );
};

export default App;
