import React, { useState } from "react";
import { FaGoogle, FaLinkedin } from "react-icons/fa"; // Asegúrate de tener react-icons instalados

const Modal = ({ isOpen, onClose, isLogin, onSwitch }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [birthdate, setBirthdate] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  // Función para manejar el inicio de sesión con Google
  const handleGoogleLogin = () => {
    alert("Iniciar sesión con Google");
  };

  // Función para manejar el registro con Google
  const handleGoogleRegister = () => {
    setErrorMessage("Registrarse con Google");
  };

  // Función para manejar el inicio de sesión con LinkedIn
  const handleLinkedInLogin = () => {
    alert("Iniciar sesión con LinkedIn");
  };

  // Función para manejar el registro con LinkedIn
  const handleLinkedInRegister = () => {
    setErrorMessage("Registrarse con LinkedIn");
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex justify-center items-center z-50">
      <div
        className="modal-overlay absolute inset-0 bg-black opacity-50"
        onClick={onClose}
      />
      <div
        className={`modal-content bg-white/80
           dark:bg-black/80 text-black
            dark:text-white rounded-lg
             transition-all duration-500 ease-in-out
            relative left-96 bottom-20
            ${isOpen ? "modal-slide-down" : ""} max-w-lg w-full`}
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

          {/* Formulario dinámico */}
          <form className="space-y-4">
            <div>
              <label className="block text-sm font-medium">
                Correo electrónico
              </label>
              <input
                type="email"
                placeholder="Ingrese su correo"
                className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-100"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>

            <div>
              <label className="block text-sm font-medium">Contraseña</label>
              <input
                type="password"
                placeholder="Ingrese su contraseña"
                className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-100"
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
                    className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-100"
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
                    className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-100"
                    value={birthdate}
                    onChange={(e) => setBirthdate(e.target.value)}
                  />
                </div>
              </>
            )}

            <div className="flex justify-between items-center">
              <button
                type="submit"
                className="w-full py-3 bg-primary-100
                 text-white rounded-md
                  hover:bg-primary-200
                   active:bg-primary-100 
                   transition-colors "
              >
                {isLogin ? "Iniciar sesión" : "Registrarse"}
              </button>
            </div>
          </form>

          {/* Mensaje de error */}
          {errorMessage && (
            <div className="text-red-500 text-center mt-4">
              <p>{errorMessage}</p>
            </div>
          )}

          {/* Opción de Iniciar sesión o Registrarse con Google y LinkedIn */}
          <div className="mt-4 text-center">
            <p className="text-sm mb-2">
              {isLogin ? "Iniciar sesión con:" : "Regístrate con:"}
            </p>

            {/* Íconos alineados horizontalmente */}
            <div className="flex justify-center space-x-4">
              <div
                onClick={isLogin ? handleGoogleLogin : handleGoogleRegister}
                className="cursor-pointer"
              >
                <FaGoogle
                  className="text-3xl text-zinc-950 hover:scale-110
                 hover:text-primary-100 active:text-blue-700"
                />
              </div>

              <div
                onClick={isLogin ? handleLinkedInLogin : handleLinkedInRegister}
                className="cursor-pointer"
              >
                <FaLinkedin
                  className="text-3xl text-zinc-900 hover:scale-110
                 hover:text-primary-100 active:text-blue-700"
                />
              </div>
            </div>
          </div>

          {/* Cambio entre formulario de Login y Register */}
          <div className="text-center mt-4">
            <button
              onClick={onSwitch}
              className="text-sm text-blue-500 hover:scale-110  hover:text-blue-600"
            >
              {isLogin
                ? "¿No tienes cuenta? Regístrate"
                : "¿Ya tienes cuenta? Inicia sesión"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Modal;
