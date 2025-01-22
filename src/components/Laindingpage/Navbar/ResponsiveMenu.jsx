import React, { useState } from "react";
import {
  FaFacebook,
  FaTwitter,
  FaInstagram,
  FaGoogle,
  FaLinkedin,
} from "react-icons/fa";
import { FaUserCircle } from "react-icons/fa"; // Solo el icono de usuario
import { MenuLinks } from "./Navbar";

const ResponsiveMenu = ({ showMenu, toggleMenu }) => {
  const [activeForm, setActiveForm] = useState(null);
  // Para controlar qué formulario mostrar
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    fullName: "",
    confirmPassword: "",
    birthDate: "",
  });
  const [errors, setErrors] = useState({});

  const handleLinkClick = () => {
    toggleMenu(); // Cierra el menú al hacer clic en un enlace
  };

  const handleLoginClick = () => {
    setActiveForm("login"); // Cambia al formulario de login
  };

  const handleRegisterClick = () => {
    setActiveForm("register"); // Cambia al formulario de registro
  };

  const handleGoogleLogin = () => {
    setErrors({ message: "Iniciar sesión con Google no implementada" });
  };
  const handleLinkedInLogin = () => {
    setErrors({ message: "Iniciar sesión con LinkedIn no implementada" });
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const validateForm = () => {
    const newErrors = {};
    if (!formData.email) newErrors.email = "Correo electrónico es obligatorio";
    if (!formData.password) newErrors.password = "Contraseña es obligatoria";
    if (activeForm === "register") {
      if (!formData.fullName)
        newErrors.fullName = "Nombre completo es obligatorio";
      if (formData.password !== formData.confirmPassword)
        newErrors.confirmPassword = "Las contraseñas no coinciden";
      if (!formData.birthDate)
        newErrors.birthDate = "Fecha de nacimiento es obligatoria";
      // Validación de la fecha de nacimiento
      if (!formData.birthdate) {
        formErrors.birthdate = "La fecha de nacimiento es obligatoria";
        valid = false;
      } else {
        const birthDateObj = new Date(formData.birthdate);
        const today = new Date();
        let age = today.getFullYear() - birthDateObj.getFullYear();
        const m = today.getMonth() - birthDateObj.getMonth();

        if (m < 0 || (m === 0 && today.getDate() < birthDateObj.getDate())) {
          age--;
        }

        if (age < 18) {
          formErrors.birthdate = "Debes tener al menos 18 años";
          valid = false;
        }
      }

      // Validación de la contraseña
      if (!formData.password) {
        formErrors.password = "La contraseña es obligatoria";
        valid = false;
      } else if (formData.password.length < 8) {
        formErrors.password = "La contraseña debe tener al menos 8 caracteres";
        valid = false;
      } else if (!/^[A-Za-z0-9]+$/.test(formData.password)) {
        formErrors.password =
          "La contraseña no debe contener espacios ni caracteres especiales";
        valid = false;
      }
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (validateForm()) {
      alert("Formulario enviado correctamente");

      // Limpia los campos del formulario
      setFormData({
        email: "",
        password: "",
        username: "",
        birthDate: "",
      });
    }
  };

  return (
    <div
      className={`${
        showMenu ? "left-0" : "-left-full"
      } fixed bottom-0 top-0 z-20 flex 
      h-screen w-[75%] flex-col justify-between
       bg-white dark:bg-gray-900
        dark:text-white px-8 pb-6 pt-16
         text-black transition-all duration-200 
         md:hidden rounded-r-xl shadow-md`}
    >
      {/* Si no hay formulario activo, mostrar contenido inicial */}
      {activeForm === null ? (
        <>
          <div className="flex items-center gap-3">
            <FaUserCircle size={50} />
            <div>
              <h1>¡Hola! Únete a nosotros</h1>
              <h1 className="text-sm text-slate-500">
                Para disfrutar de una experiencia personalizada
              </h1>
            </div>
          </div>

          {/* Menú de enlaces */}
          <nav className="mt-12">
            <ul className="space-y-4 text-xl">
              {MenuLinks.map((data) => (
                <li key={data.name}>
                  <a
                    href={data.link}
                    className="mb-5 inline-block text-gray-700 hover:text-primary-100 hover:underline transition-all duration-300"
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
              onClick={handleLoginClick}
              className="bg-primary-100 text-white px-6 py-3 rounded-lg hover:bg-secondary-300 transition-colors w-full"
            >
              Iniciar sesión
            </button>
            <button
              onClick={handleRegisterClick}
              className="bg-zinc-200 text-zinc-900 px-6 py-3 rounded-lg hover:bg-secondary-300 transition-colors w-full"
            >
              Registro
            </button>
          </div>
        </>
      ) : activeForm === "login" ? (
        // Formulario de Iniciar sesión
        <div className="mt-5 flex flex-col gap-4 ">
          <div className="flex items-center gap-3">
            <FaUserCircle size={50} />
            <div>
              <h1>¡Hola! Únete a nosotros</h1>
              <h1 className="text-sm text-slate-500">
                Para disfrutar de una experiencia personalizada
              </h1>
            </div>
          </div>
          <h2 className="text-xl font-semibold">Iniciar sesión</h2>
          <form onSubmit={handleSubmit} className="flex flex-col mb-4">
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleInputChange}
              placeholder="Correo electrónico"
              className="  bg-gray-300 text-gray-700
               dark:bg-white  dark:text-gray-700 border-2
               border-gray-300  focus:outline-none 
               focus:ring-2 focus:ring-primary-100
               px-4 py-2 rounded-lg mb-4"
            />
            {errors.email && (
              <span className="text-red-500 text-sm mb-4">{errors.email}</span>
            )}
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleInputChange}
              placeholder="Contraseña"
              className="  bg-gray-300 text-gray-700
               dark:bg-white  dark:text-gray-700 border-2
               border-gray-300  focus:outline-none 
               focus:ring-2 focus:ring-primary-100
               px-4 py-2 rounded-lg mb-4"
            />
            {errors.password && (
              <span className="text-red-500 text-sm mb-4">
                {errors.password}
              </span>
            )}
            <button
              type="submit"
              className="bg-primary-100 text-white px-6 py-3 rounded-lg hover:bg-secondary-300 transition-colors w-full"
            >
              Iniciar sesión
            </button>
          </form>
          {/* Botón de regreso */}
          <button
            onClick={() => setActiveForm(null)}
            className="text-primary-100 mt-4 text-lg underline"
          >
            Volver al menú
          </button>

          {/* Texto para cambiar a registro */}
          <div className="mt-4 text-center">
            <p>
              ¿No tienes cuenta?{" "}
              <button
                onClick={handleRegisterClick}
                className="text-primary-100 underline"
              >
                Regístrate
              </button>
            </p>
          </div>

          {/* Opciones de inicio de sesión con Google y LinkedIn */}
          <div className="mt-6 text-center">
            <p className="text-sm mb-2">O inicia sesión con:</p>
            <div className="flex justify-center space-x-4">
              <div
                onClick={handleGoogleLogin}
                className="cursor-pointer text-3xl text-gray-700 hover:text-primary-100"
              >
                <FaGoogle />
              </div>
              <div
                onClick={handleLinkedInLogin}
                className="cursor-pointer text-3xl text-gray-700 hover:text-primary-100"
              >
                <FaLinkedin />
              </div>
            </div>
          </div>
        </div>
      ) : activeForm === "register" ? (
        // Formulario de Registro
        <div className="mt-8 flex flex-col gap-4">
          <div className="flex items-center gap-3">
            <FaUserCircle size={50} />
            <div>
              <h1>¡Hola! Únete a nosotros</h1>
              <h1 className="text-sm text-slate-500">
                Para disfrutar de una experiencia personalizada
              </h1>
            </div>
          </div>
          <h2 className="text-xl font-semibold">Registro</h2>
          <form onSubmit={handleSubmit} className="flex flex-col mb-4">
            <input
              type="text"
              name="fullName"
              value={formData.fullName}
              onChange={handleInputChange}
              placeholder="Nombre completo"
              className="  bg-gray-300 text-gray-700
               dark:bg-white  dark:text-gray-700 border-2
               border-gray-300  focus:outline-none 
               focus:ring-2 focus:ring-primary-100
               px-4 py-2 rounded-lg mb-4"
            />
            {errors.fullName && (
              <span className="text-red-500 text-sm">{errors.fullName}</span>
            )}
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleInputChange}
              placeholder="Correo electrónico"
              className=" bg-gray-300 text-gray-700
               dark:bg-white  dark:text-gray-700 border-2
               border-gray-300  focus:outline-none 
               focus:ring-2 focus:ring-primary-100
               px-4 py-2 rounded-lg mb-4"
            />
            {errors.email && (
              <span className="text-red-500 text-sm">{errors.email}</span>
            )}
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleInputChange}
              placeholder="Contraseña"
              className="  bg-gray-300 text-gray-700
               dark:bg-white  dark:text-gray-700border-2 
               border-gray-300  focus:outline-none 
               focus:ring-2 focus:ring-primary-100
               px-4 py-2 rounded-lg mb-4"
            />
            {errors.password && (
              <span className="text-red-500 text-sm">{errors.password}</span>
            )}
            <input
              type="password"
              name="confirmPassword"
              value={formData.confirmPassword}
              onChange={handleInputChange}
              placeholder="Confirmar contraseña"
              className=" bg-gray-300 text-gray-700
               dark:bg-white  dark:text-gray-700  border-2
               border-gray-300  focus:outline-none 
               focus:ring-2 focus:ring-primary-100
               px-4 py-2 rounded-lg mb-4"
            />
            {errors.confirmPassword && (
              <span className="text-red-500 text-sm">
                {errors.confirmPassword}
              </span>
            )}
            <input
              type="date"
              name="birthDate"
              value={formData.birthDate}
              onChange={handleInputChange}
              placeholder="Fecha de nacimiento"
              className="bg-gray-300 text-gray-700 
    dark:bg-white dark:text-black 
    border-2 border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-blue-500 
    px-4 py-2 rounded-lg mb-4 transition duration-300 ease-in-out"
            />
            {errors.birthDate && (
              <span className="text-red-500 text-sm">{errors.birthDate}</span>
            )}
            <button
              type="submit"
              className="bg-primary-100 text-white px-6 py-3 rounded-lg hover:bg-secondary-300 transition-colors w-full"
            >
              Crear cuenta
            </button>
          </form>

          {/* Botón de regreso */}
          <button
            onClick={() => setActiveForm(null)}
            className="text-primary-100 mt-4 text-lg underline"
          >
            Volver al menú
          </button>

          {/* Texto para cambiar a login */}
          <div className="mt-4 text-center">
            <p>
              ¿Ya tienes cuenta?{" "}
              <button
                onClick={handleLoginClick}
                className="text-primary-100 underline"
              >
                Inicia sesión
              </button>
            </p>
          </div>
        </div>
      ) : null}

      {/* Footer */}
      <footer className="mt-auto mb-4 text-center text-gray-500">
        <p>&copy; 2025 Todos los derechos reservados.</p>
        <p className="text-sm">
          Hecho con <span className="text-red-500">♥</span> por jeferson
        </p>
        {/* Redes Sociales */}
        <div className="mt-4 flex justify-center gap-4">
          <a
            href="https://www.facebook.com/yourprofile"
            target="_blank"
            rel="noopener noreferrer"
            className="text-gray-700 hover:text-primary-100"
          >
            <FaFacebook size={30} />
          </a>
          <a
            href="https://www.instagram.com/yourprofile"
            target="_blank"
            rel="noopener noreferrer"
            className="text-gray-700 hover:text-primary-100"
          >
            <FaInstagram size={30} />
          </a>
          <a
            href="https://x.com/yourprofile"
            target="_blank"
            rel="noopener noreferrer"
            className="text-gray-700 hover:text-primary-100"
          >
            <FaTwitter size={30} />
          </a>
        </div>
      </footer>
    </div>
  );
};

export default ResponsiveMenu;
