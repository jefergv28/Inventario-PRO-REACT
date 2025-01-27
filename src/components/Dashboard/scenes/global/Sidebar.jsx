import { useState, useEffect } from "react";
import { ProSidebar, Menu, MenuItem } from "react-pro-sidebar";
import { Box, IconButton, Typography, useTheme } from "@mui/material";
import { Link, useLocation } from "react-router-dom";
import "react-pro-sidebar/dist/css/styles.css";
import { tokens } from "../../../../theme";
import HomeOutlinedIcon from "@mui/icons-material/HomeOutlined";
import WarehouseIcon from "@mui/icons-material/Warehouse";
import AddIcon from "@mui/icons-material/Add";
import AssessmentIcon from "@mui/icons-material/Assessment";
import HistoryOutlinedIcon from "@mui/icons-material/HistoryOutlined";
import StorefrontOutlinedIcon from "@mui/icons-material/StorefrontOutlined";
import BarChartOutlinedIcon from "@mui/icons-material/BarChartOutlined";
import PieChartOutlineOutlinedIcon from "@mui/icons-material/PieChartOutlineOutlined";
import TimelineOutlinedIcon from "@mui/icons-material/TimelineOutlined";
import StorageOutlinedIcon from "@mui/icons-material/StorageOutlined";
import MenuOutlinedIcon from "@mui/icons-material/MenuOutlined";
import FavoriteBorderOutlinedIcon from "@mui/icons-material/FavoriteBorderOutlined";
import MapOutlinedIcon from "@mui/icons-material/MapOutlined";
import Logo from "../../../../assets/website/Vector.svg";
import Perfil from "../../imges/perfile.png";

const Item = ({ title, to, icon, selected, setSelected }) => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  return (
    <MenuItem
      active={selected === to}
      style={{
        color: colors.grey[100],
      }}
      onClick={() => setSelected(title)}
      icon={icon}
    >
      <Typography>{title}</Typography>
      <Link to={to} />
    </MenuItem>
  );
};

const Sidebar = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const location = useLocation();
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [selected, setSelected] = useState("Dashboard");

  useEffect(() => {
    setSelected(location.pathname);
  });
  [location.pathname];

  return (
    <Box
      sx={{
        position: "fixed",
        zIndex: 1000,

        "& .pro-sidebar-inner": {
          background: `${colors.primary[400]} !important`,
        },
        "& .pro-icon-wrapper": {
          backgroundColor: "transparent !important",
        },
        "& .pro-inner-item": {
          padding: "5px 35px 5px 20px !important",
          transition: "all 0.1s ease",
        },
        "& .pro-inner-item:hover": {
          color: "#f29727!important ",
          transition: "background-color 0.1s ease",
        },
        "& .pro-menu-item.active": {
          color: `${colors.blueAccent[500]} !important`,
          backgroundColor: `${colors.grey[900]}!important`,
          borderLeft: `5px solid ${colors.primary[100]}!important`,
          borderRadius: "25px 0px 0px 10px !important",
          boxShadow: "0px 4px 6px rgba(0, 0, 0, 0.1)", // Sombra ligera
          transition: "all 0.1s ease, transform 0.1s ease",
          transform: "translateY(-5px)", // Efecto de deslizamiento
        },
        "& .pro-menu-item": {
          transition: "all 0.1s ease, transform 0.1s ease",
        },
        "& .pro-menu-item.active:hover": {
          transform: "translateY(5px)", // Mueve el ítem hacia abajo cuando está en hover
          transition: "all 0.1s ease", // Transición más rápida para el hover
        },
      }}
    >
      <ProSidebar collapsed={isCollapsed}>
        <Menu iconShape="square">
          {/* ICONO DE MENÚ Y LOGOTIPO */}
          <MenuItem
            onClick={() => setIsCollapsed(!isCollapsed)}
            icon={isCollapsed ? <MenuOutlinedIcon /> : undefined}
            style={{
              margin: "10px 0 20px 5px",
              color: colors.grey[100],
            }}
          >
            {!isCollapsed && (
              <Box
                display="flex"
                justifyContent="space-between"
                alignItems="center"
                ml="15px"
              >
                <img
                  variant="100px"
                  width={40}
                  height={40}
                  src={Logo}
                  alt="logo"
                />
                <Typography variant="h5" color={colors.grey[100]}>
                  inventario-PRO
                </Typography>

                <IconButton onClick={() => setIsCollapsed(!isCollapsed)}>
                  <MenuOutlinedIcon />
                </IconButton>
              </Box>
            )}
          </MenuItem>

          {!isCollapsed && (
            <Box mb="5px">
              <Box display="flex" justifyContent="center" alignItems="center">
                <img
                  alt="profile-user"
                  width={80}
                  height={0}
                  src={Perfil}
                  style={{ cursor: "pointer", borderRadius: "50%" }}
                />
              </Box>
              <Box textAlign="center">
                <Typography
                  variant="h3"
                  color={colors.grey[100]}
                  fontWeight="bold"
                  sx={{ m: "5px 0 0 0" }}
                >
                  Jeferson
                </Typography>
                <Typography variant="h5" color={colors.primary[100]}>
                  Administrador
                </Typography>
              </Box>
            </Box>
          )}

          <Box
            display="flex"
            flexDirection="column"
            paddingLeft={isCollapsed ? "10%" : "10%"}
            gap={isCollapsed ? "20px" : "0px"}
          >
            <Item
              title="Dashboard"
              to="/dashboard"
              icon={<HomeOutlinedIcon />}
              selected={selected}
              setSelected={setSelected}
            />

            <Typography
              variant="h6"
              color={colors.grey[300]}
              sx={{
                m: "15px 0 5px 20px",
                display: isCollapsed ? "none" : "block",
              }}
            >
              Inventarios
            </Typography>
            <Item
              title="Gestion de inventario"
              to="/dashboard/Inventario"
              icon={<WarehouseIcon />}
              selected={selected}
              setSelected={setSelected}
            />
            <Item
              title="Agregar productos"
              to="/dashboard/Agregar"
              icon={<AddIcon />}
              selected={selected}
              setSelected={setSelected}
            />
            <Item
              title="Informe de Inventarios"
              to="/dashboard/Informe/Informe"
              icon={<AssessmentIcon />}
              selected={selected}
              setSelected={setSelected}
            />
            <Item
              title="Productos favoritos"
              to="/dashboard/Favoritos/Favoritos"
              icon={<FavoriteBorderOutlinedIcon />}
              selected={selected}
              setSelected={setSelected}
            />

            <Typography
              variant="h6"
              color={colors.grey[300]}
              sx={{
                m: "15px 0 5px 20px",
                display: isCollapsed ? "none" : "block",
              }}
            >
              movimientos
            </Typography>
            <Item
              title="Historial de movimiento"
              to="/dashboard/Historial/Historial"
              icon={<HistoryOutlinedIcon />}
              selected={selected}
              setSelected={setSelected}
            />
            <Item
              title="Controll de stock"
              to="/dashboard/Stock/Stock"
              icon={<StorageOutlinedIcon />}
              selected={selected}
              setSelected={setSelected}
            />
            <Item
              title="Provedores"
              to="/dashboard/Provedores/Provedores"
              icon={<StorefrontOutlinedIcon />}
              selected={selected}
              setSelected={setSelected}
            />

            <Typography
              variant="h6"
              color={colors.grey[300]}
              sx={{
                m: "15px 0 5px 20px",
                display: isCollapsed ? "none" : "block",
              }}
            >
              Gráficos
            </Typography>
            <Item
              title="Gráfico de Barras"
              to="/dashboard/BarChart"
              icon={<BarChartOutlinedIcon />}
              selected={selected}
              setSelected={setSelected}
            />
            <Item
              title="Gráfico Circular"
              to="/dashboard/PieChart"
              icon={<PieChartOutlineOutlinedIcon />}
              selected={selected}
              setSelected={setSelected}
            />
            <Item
              title="Gráfico de líneas"
              to="/dashboard/LineChart"
              icon={<TimelineOutlinedIcon />}
              selected={selected}
              setSelected={setSelected}
            />
            <Item
              title="Carta Geográfica"
              to="/dashboard/GeographyChart"
              icon={<MapOutlinedIcon />}
              selected={selected}
              setSelected={setSelected}
            />
          </Box>
        </Menu>
      </ProSidebar>
    </Box>
  );
};

export default Sidebar;
