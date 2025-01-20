"use client";

import { useState } from "react";
import { ChevronDownIcon } from "@heroicons/react/20/solid";
import { Switch } from "@headlessui/react";

export default function ContactForm() {
  const [agreed, setAgreed] = useState(false);
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    message: "",
  });
  const [errors, setErrors] = useState({
    firstName: "",
    lastName: "",
    email: "",
    message: "",
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const newErrors = {};

    // Validación de campos
    if (!formData.firstName) newErrors.firstName = "El nombre es obligatorio.";
    if (!formData.lastName) newErrors.lastName = "El apellido es obligatorio.";
    if (!formData.email) {
      newErrors.email = "El correo electrónico es obligatorio.";
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "El correo electrónico no es válido.";
    }
    if (!formData.message) newErrors.message = "El mensaje es obligatorio.";
    if (!agreed) newErrors.agreed = "Debes aceptar la política de privacidad.";

    if (Object.keys(newErrors).length === 0) {
      alert("Formulario enviado con éxito");
      // Aquí puedes agregar lógica para enviar el formulario
    }

    setErrors(newErrors);
  };

  return (
    <div
      id="contacto"
      className="isolate bg-white dark:bg-black px-6 py-24 sm:py-32 lg:px-8"
    >
      <div
        aria-hidden="true"
        className="absolute inset-x-0 top-[-10rem] -z-10 transform-gpu overflow-hidden blur-3xl sm:top-[-20rem]"
      >
        <div
          style={{
            clipPath:
              "polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)",
          }}
          className="relative left-1/2 -z-10 aspect-[1155/678] w-[36.125rem] max-w-none -translate-x-1/2 rotate-[30deg] bg-gradient-to-tr from-[#ff80b5] to-[#9089fc] opacity-30 sm:left-[calc(50%-40rem)] sm:w-[72.1875rem]"
        />
      </div>
      <div className="mx-auto max-w-2xl text-center">
        <h2 className="text-4xl font-semibold tracking-tight text-gray-900 dark:text-white sm:text-5xl">
          Contactanos
        </h2>
        <p className="mt-4 text-xl text-gray-600 dark:text-white">
          Estamos aquí para cualquier inquietud
        </p>
      </div>
      <form
        onSubmit={handleSubmit}
        className="mx-auto mt-16 max-w-xl sm:mt-20 "
      >
        <div className="grid grid-cols-1 gap-x-8 gap-y-6 sm:grid-cols-2">
          <div>
            <label
              htmlFor="first-name"
              className="block text-sm font-semibold text-gray-900 dark:text-white"
            >
              Nombre
            </label>
            <div className="mt-2.5">
              <input
                id="first-name"
                name="firstName"
                type="text"
                autoComplete="given-name"
                value={formData.firstName}
                onChange={handleInputChange}
                className="block w-full rounded-md
                 bg-primary-200 px-3.5 py-2 
                 text-base text-gray-900 outline 
                 outline-1 outline-gray-300
                  placeholder:text-gray-400
                   focus:outline-primary-100"
              />
              {errors.firstName && (
                <p className="text-sm text-red-500">{errors.firstName}</p>
              )}
            </div>
          </div>
          <div>
            <label
              htmlFor="last-name"
              className="block text-sm font-semibold text-gray-900  dark:text-white"
            >
              Apellido
            </label>
            <div className="mt-2.5">
              <input
                id="last-name"
                name="lastName"
                type="text"
                autoComplete="family-name"
                value={formData.lastName}
                onChange={handleInputChange}
                className="block w-full rounded-md
                 bg-primary-200 px-3.5 py-2 
                 text-base text-gray-900 outline 
                 outline-1 outline-gray-300
                  placeholder:text-gray-400
                   focus:outline-primary-100"
              />
              {errors.lastName && (
                <p className="text-sm text-red-500">{errors.lastName}</p>
              )}
            </div>
          </div>

          <div className="sm:col-span-2">
            <label
              htmlFor="email"
              className="block text-sm font-semibold text-gray-900"
            >
              Email
            </label>
            <div className="mt-2.5">
              <input
                id="email"
                name="email"
                type="email"
                autoComplete="email"
                value={formData.email}
                onChange={handleInputChange}
                className="block w-full rounded-md
                 bg-primary-200 px-3.5 py-2 
                 text-base text-gray-900 outline 
                 outline-1 outline-gray-300
                  placeholder:text-gray-400
                   focus:outline-primary-100"
              />
              {errors.email && (
                <p className="text-sm text-red-500">{errors.email}</p>
              )}
            </div>
          </div>

          <div className="sm:col-span-2">
            <label
              htmlFor="message"
              className="block text-sm font-semibold text-gray-900"
            >
              Mensaje
            </label>
            <div className="mt-2.5">
              <textarea
                id="message"
                name="message"
                rows={4}
                value={formData.message}
                onChange={handleInputChange}
                className="block w-full rounded-md
                 bg-primary-200 px-3.5 py-2 
                 text-base text-gray-900 outline 
                 outline-1 outline-gray-300
                  placeholder:text-gray-400
                   focus:outline-primary-100"
              />
              {errors.message && (
                <p className="text-sm text-red-500">{errors.message}</p>
              )}
            </div>
          </div>
        </div>
        <div className="mt-10">
          <button
            type="submit"
            className="block w-full rounded-md
             bg-primary-100 px-3.5 py-2.5 text-center 
             text-sm font-semibold text-white shadow-sm
              hover:bg-secondary-300 active:bg-primary-100
              focus-visible:outline 
              focus-visible:outline-2 
              focus-visible:outline-offset-2
               focus-visible:outline-indigo-600"
          >
            Enviar
          </button>
        </div>
      </form>
    </div>
  );
}
