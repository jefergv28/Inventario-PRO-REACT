import React, { useState } from "react";
import { Routes, Route, useLocation } from "react-router-dom";
import LandingPage from "./components/Laindingpage/LaindingPage";
import Dashboard from "./components/Dashboard/scenes/dasboard/Dashboard";
import Topbar from "./components/Dashboard/scenes/global/Topbar";
import Sidebar from "./components/Dashboard/scenes/global/Sidebar";
import { CssBaseline, ThemeProvider, Box } from "@mui/material"; // Importamos Box de MUI
import { ColorModeContext, useMode } from "./theme";
import Modal from ".//components/Laindingpage/Modal/Modal";
import Inventario from "./components/Dashboard/scenes/inventario/Inventario";
import Agregar from "./components/Dashboard/scenes/Agregar/Agregar";
import Historial from "./components/Dashboard/scenes/Historial/Historial";
import Informe from "./components/Dashboard/scenes/Informe/Informe";
import Favoritos from "./components/Dashboard/scenes/Favoritos/Favoritos";
import Stock from "./components/Dashboard/scenes/Stock/Stock";
import Provedores from "./components/Dashboard/scenes/Provedores/Provedores";
import Bar from "./components/Dashboard/BarChart";
import Pie from "./components/Dashboard/PieChart";
import Line from "./components/Dashboard/LineChart";
import Geography from "./components/Dashboard/GeographyChart";
import ResponsiveMenu from "./components/Laindingpage/Navbar/ResponsiveMenu";

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

          <Box
            component="main"
            sx={{
              // Solo aplica el ajuste si estamos en la página del Dashboard
              marginLeft: isDashboardPage
                ? isSidebar
                  ? "20px"
                  : "60px"
                : "0px",
              transition: "margin-left 0.1s ease", // Animación para el cambio de margin
              width: "100%", // Asegura que el ancho sea 100% para que ocupe todo el espacio
              marginTop: isDashboardPage ? "40px" : "0px", // Añadimos un margin top en el Dashboard si es necesario
            }}
          >
            {/* Muestra el Topbar solo si estamos en la página del Dashboard */}
            {isDashboardPage && <Topbar setIsSidebar={setIsSidebar} />}

            <Routes>
              {/* Página principal (LandingPage) */}
              <Route path="/" element={<LandingPage openModal={openModal} />} />
              <Route path="/responsive-menu" element={<ResponsiveMenu />} />
              {/* Rutas para el Dashboard */}
              <Route path="/dashboard" element={<Dashboard />} />
              <Route path="/dashboard/Inventario" element={<Inventario />} />
              <Route path="/dashboard/Agregar" element={<Agregar />} />
              <Route path="/dashboard/Informe/Informe" element={<Informe />} />
              <Route
                path="/dashboard/Favoritos/Favoritos"
                element={<Favoritos />}
              />
              <Route
                path="/dashboard/Historial/Historial"
                element={<Historial />}
              />
              <Route path="/dashboard/Stock/Stock" element={<Stock />} />
              <Route
                path="/dashboard/Provedores/Provedores"
                element={<Provedores />}
              />
              <Route path="/dashboard/BarChart" element={<Bar />} />
              <Route path="/dashboard/PieChart" element={<Pie />} />
              <Route path="/dashboard/LineChart" element={<Line />} />
              <Route path="/dashboard/GeographyChart" element={<Geography />} />
            </Routes>
          </Box>
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
