import React, { useEffect, useState } from "react";
import { HiMoon, HiSun } from "react-icons/hi"; // Importar los íconos

const DarkMode = () => {
  const [isDarkMode, setIsDarkMode] = useState(false);

  // Al iniciar, verificamos si ya está guardada la preferencia del modo oscuro en el localStorage
  useEffect(() => {
    const savedMode = localStorage.getItem("darkMode");
    if (savedMode === "true") {
      setIsDarkMode(true);
      document.documentElement.classList.add("dark");
    } else {
      setIsDarkMode(false);
      document.documentElement.classList.remove("dark");
    }
  }, []);

  // Cambia el estado de modo oscuro y guarda en el localStorage
  const toggleDarkMode = () => {
    setIsDarkMode(!isDarkMode);
    if (isDarkMode) {
      document.documentElement.classList.remove("dark");
      localStorage.setItem("darkMode", "false");
    } else {
      document.documentElement.classList.add("dark");
      localStorage.setItem("darkMode", "true");
    }
  };

  return (
    <button
      onClick={toggleDarkMode}
      className="text-lg font-medium text-gray-800 dark:text-gray-200"
    >
      {isDarkMode ? <HiMoon size={24} /> : <HiSun size={24} />}{" "}
      {/* Íconos para modo claro/oscuro */}
    </button>
  );
};

export default DarkMode;
