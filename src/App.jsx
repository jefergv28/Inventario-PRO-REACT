import React, { useState } from "react";
import { Routes, Route, useLocation } from "react-router-dom"; // Importa useLocation
import LandingPage from "./components/Laindingpage/LaindingPage";
import Dashboard from "./components/Dashboard/scenes/dasboard/Dashboard";
import Topbar from "./components/Dashboard/scenes/global/Topbar";
import Sidebar from "./components/Dashboard/scenes/global/Sidebar";
import { CssBaseline, ThemeProvider } from "@mui/material";
import { ColorModeContext, useMode } from "./theme";
import Modal from ".//components/Laindingpage/Modal/Modal"; // Asegúrate de tener la ruta correcta del Modal

const App = () => {
  const [theme, colorMode] = useMode();
  const [isSidebar, setIsSidebar] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isLogin, setIsLogin] = useState(true);

  // Hook useLocation para obtener la ruta actual
  const location = useLocation();

  const openModal = (isLogin) => {
    setIsModalOpen(true);
    setIsLogin(isLogin);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const switchForm = () => {
    setIsLogin(!isLogin);
  };

  // Verifica si la ruta es la del dashboard
  const isDashboardPage = location.pathname.startsWith("/dashboard");

  return (
    <ColorModeContext.Provider value={colorMode}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <div className="app">
          {/* Muestra el Sidebar solo si estamos en la página del Dashboard */}
          {isDashboardPage && <Sidebar isSidebar={isSidebar} />}

          <main className="content">
            {/* Muestra el Topbar solo si estamos en la página del Dashboard */}
            {isDashboardPage && <Topbar setIsSidebar={setIsSidebar} />}

            <Routes>
              {/* Página principal (LandingPage) */}
              <Route path="/" element={<LandingPage openModal={openModal} />} />

              {/* Ruta para el Dashboard */}
              <Route path="/dashboard" element={<Dashboard />} />
            </Routes>
          </main>
        </div>

        {/* Modal */}
        <Modal
          isOpen={isModalOpen}
          onClose={closeModal}
          isLogin={isLogin}
          onSwitch={switchForm}
        />
      </ThemeProvider>
    </ColorModeContext.Provider>
  );
};

export default App;
