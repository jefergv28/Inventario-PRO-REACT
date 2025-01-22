import React, { useState } from "react";
import Navbar from "./Navbar/Navbar";
import Hero from "./Hero/Hero";
import About from "./About/About";
import Services from "./Services/Services";
import Testimonial from "./Testimonial/Testimonial";
import Contacto from "./Contacto/Contact";
import Footer from "./Footer/Footer";
import Modal from "./Modal/Modal";

const LandingPage = () => {
  const [isModalOpen, setIsModalOpen] = useState(false); // Controla si el modal está abierto
  const [isLogin, setIsLogin] = useState(true); // Controla si es "login" o "registro"
  const [isLoggedIn, setIsLoggedIn] = useState(
    localStorage.getItem("authToken") !== null
  ); // Estado de autenticación

  // Función que abre el modal con el tipo correspondiente
  const onLogin = (isLogin) => {
    setIsModalOpen(true);
    setIsLogin(isLogin); // Establecemos el estado correcto
  };

  // Función para cerrar el modal
  const closeModal = () => {
    setIsModalOpen(false);
  };

  // Simula el login (sin backend)
  const handleLogin = (e) => {
    e.preventDefault();
    // Aquí simulamos un login correcto
    localStorage.setItem("authToken", "fake-token"); // Almacenamos el "token"
    setIsLoggedIn(true); // Actualizamos el estado de autenticación
    closeModal();
    alert("Login exitoso");
  };

  // Función para simular el logout
  const handleLogout = () => {
    localStorage.removeItem("authToken"); // Eliminamos el "token"
    setIsLoggedIn(false); // Actualizamos el estado
    alert("Has cerrado sesión");
  };

  return (
    <div className="bg-white dark:bg-black dark:text-white text-black overflow-x-hidden">
      {/* Ancla para el enlace "Home" */}
      <div id="home"></div>
      <Navbar onLogin={onLogin} /> {/* Pasamos la función como prop */}
      <Hero />
      <About />
      <Services />
      <Testimonial />
      <Contacto />
      <Footer />
      {/* Mostrar el botón de logout si está autenticado */}
      {isLoggedIn ? (
        <button onClick={handleLogout} className="logout-btn">
          Cerrar sesión
        </button>
      ) : (
        <button onClick={() => onLogin(true)} className="login-btn">
          Iniciar sesión
        </button>
      )}
      {/* Modal */}
      {isModalOpen && (
        <Modal
          isOpen={isModalOpen} // Controlamos si el modal está abierto
          onClose={closeModal} // Función para cerrar el modal
          isLogin={isLogin} // Determinamos si es login o registro
          onSwitch={() => setIsLogin(!isLogin)} // Cambiamos entre login y registro
          handleLogin={handleLogin} // Pasamos la función de login
        />
      )}
    </div>
  );
};

export default LandingPage;
