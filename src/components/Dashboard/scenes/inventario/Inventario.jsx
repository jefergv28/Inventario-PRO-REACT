import {
  Box,
  Typography,
  useTheme,
  Button,
  TextField,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  IconButton,
} from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import { tokens } from "../../../../theme";
import { useState } from "react";
import Header from "../../Header";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import VisibilityIcon from "@mui/icons-material/Visibility";
import ResponsiveModal from "../modal/modal"; // Asegúrate de importar el modal

const Inventario = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  // Estado para manejar los inventarios y productos
  const [inventarios, setInventarios] = useState([
    {
      id: 1,
      name: "Inventario 1",
      type: "General",
      date: "2025-01-23",
      productos: ["Producto A", "Producto B"],
    },
    {
      id: 2,
      name: "Inventario 2",
      type: "Semanal",
      date: "2025-01-20",
      productos: ["Producto C"],
    },
  ]);

  const [openModal, setOpenModal] = useState(false);
  const [modalContent, setModalContent] = useState("crear"); // "crear", "editar" o "ver"
  const [nuevoInventario, setNuevoInventario] = useState({
    name: "",
    type: "General",
    date: new Date().toISOString().split("T")[0],
  });
  const [selectedInventario, setSelectedInventario] = useState(null);

  // Columnas de la tabla de inventarios
  const columns = [
    { field: "id", headerName: "ID", width: 200 },
    { field: "name", headerName: "Nombre", width: 350 },
    { field: "type", headerName: "Tipo", width: 350 },
    { field: "date", headerName: "Fecha de Creación", width: 330 },
    {
      field: "actions",
      headerName: "Acciones",
      width: 280,
      renderCell: ({ row }) => (
        <Box display="flex" justifyContent="space-between" width="130px">
          <IconButton
            color="primary"
            onClick={() => handleVerInventarios(row.id)}
          >
            <VisibilityIcon />
          </IconButton>
          <IconButton
            color="secondary"
            onClick={() => handleEliminarInventario(row.id)}
          >
            <DeleteIcon />
          </IconButton>
          <IconButton
            color="default"
            onClick={() => handleEditarInventario(row.id)}
          >
            <EditIcon />
          </IconButton>
        </Box>
      ),
    },
  ];

  // Manejo de abrir/cerrar modal
  const handleOpenModal = (modo, inventario = null) => {
    setModalMode(modo);

    if (modo === "editar" && inventario) {
      setNuevoInventario(inventario); // Cargar datos del inventario
    } else if (modo === "ver" && inventario) {
      setNuevoInventario(inventario); // Cargar datos del inventario solo para visualización
    } else {
      setNuevoInventario({
        name: "",
        type: "General",
        date: new Date().toISOString().split("T")[0],
        products: [], // Asegurarse de que no hay productos en el modo "crear"
      }); // Reiniciar el estado para crear
    }

    setOpenModal(true); // Abrir el modal
  };

  const handleCloseModal = () => {
    setOpenModal(false);
    setNuevoInventario({
      name: "",
      type: "General",
      date: new Date().toISOString().split("T")[0],
    });
    setSelectedInventario(null);
  };

  // Crear nuevo inventario
  const handleCrearInventario = () => {
    if (nuevoInventario.name === "" || nuevoInventario.type === "") {
      alert("Por favor, complete todos los campos.");
      return; // Evitar crear inventario si faltan campos
    }

    if (nuevoInventario.id) {
      // Si hay un ID, actualizamos el inventario existente
      const updatedInventarios = inventarios.map((inventario) =>
        inventario.id === nuevoInventario.id
          ? { ...nuevoInventario }
          : inventario
      );
      setInventarios(updatedInventarios);
    } else {
      // Si no hay un ID, creamos uno nuevo
      setInventarios([
        ...inventarios,
        { id: inventarios.length + 1, ...nuevoInventario, productos: [] },
      ]);
    }
    setNuevoInventario({
      name: "",
      type: "General",
      date: new Date().toISOString().split("T")[0],
    }); // Reiniciar formulario
    handleCloseModal(); // Cerrar modal
  };

  // Ver los productos de un inventario aquí va la lógica para mostrar los productos desde
  // la interfaz de agregar producto
  const handleVerInventarios = (id) => {
    const inventario = inventarios.find((item) => item.id === id);
    setSelectedInventario(inventario);
    handleOpenModal("ver");
  };

  // Eliminar un inventario
  const handleEliminarInventario = (id) => {
    const newInventarios = inventarios.filter((item) => item.id !== id);
    setInventarios(newInventarios);
  };

  // Editar un inventario
  const handleEditarInventario = (id) => {
    const inventario = inventarios.find((item) => item.id === id);
    handleOpenModal("editar", inventario);
  };

  const [modalMode, setModalMode] = useState(""); // 'crear', 'editar', 'ver'

  const inputStyles = (theme) => ({
    input: { color: colors.grey[100] },
    "& .MuiOutlinedInput-root": {
      "& fieldset": {
        borderColor:
          theme.palette.mode === "dark" ? colors.grey[700] : colors.grey[500],
      },
      "&:hover fieldset": {
        borderColor:
          theme.palette.mode === "dark"
            ? colors.primary[400]
            : colors.primary[300],
      },
      "&.Mui-focused fieldset": {
        borderColor:
          theme.palette.mode === "dark"
            ? colors.primary[200]
            : colors.primary[100],
      },
    },
    "& .MuiInputLabel-root": {
      color:
        theme.palette.mode === "dark" ? colors.grey[100] : colors.grey[100],
      fontSize: "16px",
      transition: "all 0.3s ease",
    },
    "& .MuiInputLabel-root.Mui-focused": {
      color:
        theme.palette.mode === "dark"
          ? colors.primary[100]
          : colors.primary[100],
      fontSize: "14px",
    },
  });

  return (
    <Box m="10px">
      <Header
        title="Gestión de Inventarios"
        subtitle="Administrar los inventarios"
      />
      <Button
        variant="contained"
        onClick={() => handleOpenModal("crear")}
        sx={{
          marginBottom: "10px",
          backgroundColor: colors.primary[100],
          fontSize: "18px",
          color: "#fff",
          "&:hover": {
            backgroundColor: colors.blueAccent[600],
          },
        }}
      >
        Crear Inventario
      </Button>

      <Box
        m="0"
        height="75vh"
        sx={{
          "& .MuiDataGrid-root": {
            border: "none",
          },
          "& .MuiDataGrid-cell": {
            borderBottom: "none",
          },
          "& .MuiDataGrid-columnHeaders": {
            backgroundColor: colors.blueAccent[700],
            borderBottom: "none",
          },
          "& .MuiDataGrid-virtualScroller": {
            backgroundColor: colors.primary[400],
          },
          "& .MuiDataGrid-footerContainer": {
            borderTop: "none",
            backgroundColor: colors.blueAccent[700],
          },
        }}
      >
        <DataGrid rows={inventarios} columns={columns} />
      </Box>

      {/* Modal dinámico */}
      <ResponsiveModal
        open={openModal}
        handleClose={handleCloseModal}
        title={
          modalMode === "crear"
            ? "Crear Inventario"
            : modalMode === "editar"
            ? "Editar Inventario"
            : "Productos del Inventario"
        }
      >
        {modalMode === "crear" || modalMode === "editar" ? (
          <>
            <TextField
              label="Nombre del Inventario"
              variant="outlined"
              value={nuevoInventario.name}
              onChange={(e) =>
                setNuevoInventario({ ...nuevoInventario, name: e.target.value })
              }
              margin="normal"
              sx={inputStyles(theme)}
            />

            <FormControl fullWidth margin="normal">
              <InputLabel
                sx={{ color: colors.grey[100], fontSize: "16px" }}
              ></InputLabel>
              <Select
                value={nuevoInventario.type}
                onChange={(e) =>
                  setNuevoInventario({
                    ...nuevoInventario,
                    type: e.target.value,
                  })
                }
                sx={{
                  color: colors.grey[100],
                  "& .MuiOutlinedInput-root": {
                    "& fieldset": {
                      borderColor: colors.grey[900],
                    },
                    "&:hover fieldset": {
                      borderColor: colors.primary[100],
                    },
                    "&.Mui-focused fieldset": {
                      borderColor: colors.primary[100],
                    },
                  },
                  "& .MuiInputLabel-root": {
                    color: colors.grey[100],
                  },
                }}
              >
                <MenuItem value="General">General</MenuItem>
                <MenuItem value="Semanal">Semanal</MenuItem>
                <MenuItem value="Mensual">Mensual</MenuItem>
              </Select>
            </FormControl>

            <TextField
              label="Fecha de Creación"
              type="date"
              value={nuevoInventario.date}
              onChange={(e) =>
                setNuevoInventario({ ...nuevoInventario, date: e.target.value })
              }
              sx={{
                width: "100%",
                marginTop: "20px",
                input: { color: colors.grey[100] },
                "& .MuiOutlinedInput-root": {
                  "& fieldset": {
                    borderColor: colors.grey[900],
                  },
                  "&:hover fieldset": {
                    borderColor: colors.primary[100],
                  },
                  "&.Mui-focused fieldset": {
                    borderColor: colors.primary[100],
                  },
                },
              }}
            />
            <Button
              onClick={handleCrearInventario}
              variant="contained"
              sx={{
                marginTop: "20px",
                backgroundColor: colors.primary[100],
                "&:hover": {
                  backgroundColor: colors.primary[300],
                },
              }}
            >
              {modalMode === "crear" ? "Crear" : "Actualizar"}
            </Button>
          </>
        ) : (
          <Box>
            <Typography variant="h6">Productos de Inventario</Typography>
            <Box mt="20px">
              <ul>
                {selectedInventario?.productos.map((producto, index) => (
                  <li key={index}>{producto}</li>
                ))}
              </ul>
            </Box>
          </Box>
        )}
      </ResponsiveModal>
    </Box>
  );
};

export default Inventario;
