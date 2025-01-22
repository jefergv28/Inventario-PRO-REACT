import React, { useState } from "react";
import { FaGoogle, FaLinkedin } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import ModalMessage from "./ModalMessage"; // Importamos el ModalMessage

const Modal = ({ isOpen, onClose, isLogin, onSwitch }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [birthdate, setBirthdate] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [isLoggedIn, setIsLoggedIn] = useState(
    localStorage.getItem("authToken") ? true : false
  );
  const [modalMessage, setModalMessage] = useState(""); // Estado para el mensaje modal
  const navigate = useNavigate();

  const handleGoogleLogin = () => {
    setModalMessage("Iniciando sesión con Google...");
  };

  const handleGoogleRegister = () => {
    setModalMessage("Registrándose con Google...");
  };

  const handleLinkedInLogin = () => {
    setModalMessage("Iniciando sesión con LinkedIn...");
  };

  const handleLinkedInRegister = () => {
    setModalMessage("Registrándose con LinkedIn...");
  };

  const validateForm = () => {
    if (!email || !password) {
      setErrorMessage("El correo y la contraseña son obligatorios.");
      return false;
    }

    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    if (!emailRegex.test(email)) {
      setErrorMessage("Por favor, ingresa un correo electrónico válido.");
      return false;
    }

    if (password.length < 6) {
      setErrorMessage("La contraseña debe tener al menos 6 caracteres.");
      return false;
    }

    if (!isLogin && password !== confirmPassword) {
      setErrorMessage("Las contraseñas no coinciden.");
      return false;
    }

    if (!isLogin && !birthdate) {
      setErrorMessage("La fecha de nacimiento es obligatoria.");
      return false;
    }

    if (!isLogin && birthdate) {
      const birthYear = new Date(birthdate).getFullYear();
      const currentYear = new Date().getFullYear();
      if (currentYear - birthYear < 18) {
        setErrorMessage("Debes ser mayor de 18 años.");
        return false;
      }
    }

    return true;
  };

  const handleLogout = () => {
    localStorage.removeItem("authToken");
    setIsLoggedIn(false);
    setModalMessage("Logout exitoso");
  };
  ///es crea un token y seguarda en el localstore miestra se desarrolla
  //la app despues se debe agregar logica de bakend para mayo seguuuridad
  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateForm()) {
      setErrorMessage("");
      setModalMessage(isLogin ? "Iniciando sesión..." : "Registrándose...");

      // Cerrar el modal después de 3 segundos
      setTimeout(() => {
        setModalMessage(""); // Cierra el modal
      }, 3000); // 3000ms = 3 segundos

      if (isLogin) {
        localStorage.setItem("authToken", "some-auth-token");
        setIsLoggedIn(true);
        setModalMessage("Iniciado sesión con éxito");
        navigate("/dashboard");
      } else {
        setModalMessage("Usuario registrado con éxito");
        setTimeout(() => {
          onSwitch();
        }, 3000);
      }
    }
  };

  const closeModalMessage = () => {
    setModalMessage(""); // Cierra el modal de mensaje
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex justify-center items-center z-50">
      <div
        className="modal-overlay absolute inset-0 bg-black opacity-50"
        onClick={onClose}
      />
      <div
        className={`modal-content bg-white/80 dark:bg-black/80 text-black dark:text-white rounded-lg transition-all duration-500 ease-in-out relative left-96 bottom-20 ${
          isOpen ? "modal-slide-down" : ""
        } max-w-lg w-full`}
      >
        <div className="p-6">
          <button
            className="absolute top-3 right-3 text-xl text-black dark:text-white"
            onClick={onClose}
          >
            X
          </button>
          <h2 className="text-2xl text-center mb-6">
            {isLogin ? "Iniciar sesión" : "Crear cuenta"}
          </h2>

          <form className="space-y-4" id="login" onSubmit={handleSubmit}>
            <div>
              <label className="block text-sm font-medium">
                Correo electrónico
              </label>
              <input
                type="email"
                placeholder="Ingrese su correo"
                className="w-full p-3 border border-gray-300 
                dark:bg-white dark:text-gray-700 
                 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-100"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>

            <div>
              <label className="block text-sm font-medium">Contraseña</label>
              <input
                type="password"
                placeholder="Ingrese su contraseña"
                className="w-full p-3 border
                 border-gray-300 rounded-md 
                   dark:bg-white dark:text-gray-700 
                 focus:outline-none focus:ring-2 focus:ring-primary-100"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>

            {!isLogin && (
              <>
                <div>
                  <label className="block text-sm font-medium">
                    Confirmar Contraseña
                  </label>
                  <input
                    type="password"
                    placeholder="Confirme su contraseña"
                    className="w-full p-3 border
                     border-gray-300 rounded-md 
                     dark:bg-white dark:text-gray-700 
                     focus:outline-none focus:ring-2 focus:ring-primary-100"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium">
                    Fecha de nacimiento
                  </label>
                  <input
                    type="date"
                    className="w-full p-3 border
                     border-gray-300 rounded-md 
                     focus:outline-none focus:ring-2
                     dark:bg-white dark:text-gray-700 
                      focus:ring-primary-100"
                    value={birthdate}
                    onChange={(e) => setBirthdate(e.target.value)}
                  />
                </div>
              </>
            )}

            <div className="flex justify-between items-center">
              <button
                type="submit"
                className="w-full py-3 bg-primary-100 text-white rounded-md hover:bg-primary-200 active:bg-primary-100 transition-colors"
              >
                {isLogin ? "Iniciar sesión" : "Registrarse"}
              </button>
            </div>
          </form>

          {errorMessage && (
            <div className="text-red-500 text-center mt-4">
              <p>{errorMessage}</p>
            </div>
          )}

          <div className="mt-4 text-center">
            <p className="text-sm mb-2">
              {isLogin ? "Iniciar sesión con:" : "Regístrate con:"}
            </p>
            <div className="flex justify-center space-x-4">
              <div
                onClick={isLogin ? handleGoogleLogin : handleGoogleRegister}
                className="cursor-pointer"
              >
                <FaGoogle className="text-3xl text-zinc-950 dark:text-zinc-50 hover:scale-110 hover:text-primary-100 dark:hover:text-primary-100" />
              </div>
              <div
                onClick={isLogin ? handleLinkedInLogin : handleLinkedInRegister}
                className="cursor-pointer"
              >
                <FaLinkedin className="text-3xl text-zinc-900 dark:text-zinc-50 hover:scale-110 hover:text-primary-100 dark:hover:text-primary-100" />
              </div>
            </div>
          </div>

          <div className="text-center mt-4">
            <p>
              {isLogin ? "¿No tienes una cuenta? " : "¿Ya tienes una cuenta? "}
              <button
                onClick={onSwitch}
                className="text-primary-100 hover:text-primary-200"
              >
                {isLogin ? "Regístrate" : "Inicia sesión"}
              </button>
            </p>
          </div>
        </div>
      </div>

      {modalMessage && (
        <ModalMessage message={modalMessage} onClose={closeModalMessage} />
      )}
    </div>
  );
};

export default Modal;
