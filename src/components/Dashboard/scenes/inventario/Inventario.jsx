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
import ResponsiveModal from "../modal/modal";
import DialogTitle from "@mui/material/DialogTitle";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import AddIcon from "@mui/icons-material/Add"; // Importa el ícono "Add"

const Inventario = () => {
  const [alertMessage, setAlertMessage] = useState("");
  const [alertSeverity, setAlertSeverity] = useState(""); // 'error', 'success', etc.
  const [formErrors, setFormErrors] = useState({
    name: "",
    type: "",
    date: "",
  });

  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

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
  const [modalContent, setModalContent] = useState("crear");
  const [nuevoInventario, setNuevoInventario] = useState({
    name: "",
    type: "General",
    date: new Date().toISOString().split("T")[0],
  });
  const [selectedInventario, setSelectedInventario] = useState(null);

  const columns = [
    { field: "id", headerName: "ID", width: 200 },
    { field: "name", headerName: "Nombre", flex: 2 },
    { field: "type", headerName: "Tipo", flex: 1 },
    { field: "date", headerName: "Fecha de Creación", width: 200 },
    { field: "number", headerName: "Cantidad de productos", width: 200 },
    {
      field: "actions",
      headerName: "Acciones",
      width: 200,
      renderCell: ({ row }) => (
        <Box display="flex" justifyContent="space-between" width="70px">
          <IconButton
            sx={{
              color: colors.blueAccent[100],
              "&:hover": {
                color: colors.blueAccent[200],
              },
            }}
            onClick={() => handleVerInventarios(row.id)}
          >
            <VisibilityIcon />
          </IconButton>
          <IconButton
            sx={{
              color: colors.redAccent[500],
              "&:hover": {
                color: colors.redAccent[600],
              },
            }}
            onClick={() => handleEliminarInventario(row.id)}
          >
            <DeleteIcon />
          </IconButton>
          <IconButton
            sx={{
              color: colors.primary[200],
              "&:hover": {
                color: colors.primary[300],
              },
            }}
            onClick={() => handleEditarInventario(row.id)}
          >
            <EditIcon />
          </IconButton>
        </Box>
      ),
    },
  ];

  const handleOpenModal = (modo, inventario = null) => {
    setModalMode(modo);

    if (modo === "editar" && inventario) {
      setNuevoInventario(inventario);
    } else if (modo === "ver" && inventario) {
      setNuevoInventario(inventario);
    } else {
      setNuevoInventario({
        name: "",
        type: "General",
        date: new Date().toISOString().split("T")[0],
      });
    }

    setOpenModal(true);
  };

  const handleCloseModal = () => {
    setOpenModal(false);
    setNuevoInventario({
      name: "",
      type: "General",
      date: new Date().toISOString().split("T")[0],
    });
    setSelectedInventario(null);
    setFormErrors({ name: "", type: "", date: "" });
  };

  const validateForm = () => {
    let errors = {};
    if (!nuevoInventario.name) {
      errors.name = "El nombre del inventario es obligatorio";
    }
    if (!nuevoInventario.type) {
      errors.type = "El tipo de inventario es obligatorio";
    }
    if (!nuevoInventario.date) {
      errors.date = "La fecha de creación es obligatoria";
    } else {
      const today = new Date();
      const inputDate = new Date(nuevoInventario.date);

      if (inputDate > today) {
        errors.date = "La fecha de creación no puede ser en el futuro";
      }
    }
    setFormErrors(errors);
    return Object.keys(errors).length === 0; // Retorna true si no hay errores
  };

  const handleCrearInventario = () => {
    if (!validateForm()) {
      return;
    }

    if (nuevoInventario.id) {
      const updatedInventarios = inventarios.map((inventario) =>
        inventario.id === nuevoInventario.id
          ? { ...nuevoInventario }
          : inventario
      );
      setInventarios(updatedInventarios);
    } else {
      setInventarios([
        ...inventarios,
        { id: inventarios.length + 1, ...nuevoInventario, productos: [] },
      ]);
    }

    setNuevoInventario({
      name: "",
      type: "General",
      date: new Date().toISOString().split("T")[0],
    });
    handleCloseModal();
  };

  const handleVerInventarios = (id) => {
    const inventario = inventarios.find((item) => item.id === id);
    setSelectedInventario(inventario);
    handleOpenModal("ver");
  };

  const handleEliminarInventario = (id) => {
    const newInventarios = inventarios.filter((item) => item.id !== id);
    setInventarios(newInventarios);
  };

  const handleEditarInventario = (id) => {
    const inventario = inventarios.find((item) => item.id === id);
    handleOpenModal("editar", inventario);
  };

  const [modalMode, setModalMode] = useState("");

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
        startIcon={<AddIcon />}
      >
        Crear Inventario
      </Button>

      <Box m="0" height="75vh">
        <DataGrid rows={inventarios} columns={columns} />
      </Box>

      {/* Modal dinámico */}
      <ResponsiveModal
        open={openModal}
        handleClose={handleCloseModal}
        title={
          <DialogTitle
            sx={{
              color:
                modalMode === "crear"
                  ? colors.primary[100]
                  : modalMode === "editar"
                  ? colors.primary[100]
                  : colors.grey[100],
              fontSize:
                modalMode === "crear"
                  ? "1.5rem"
                  : modalMode === "editar"
                  ? "1.25rem"
                  : "1rem",
            }}
          >
            {modalMode === "crear"
              ? "Crear Inventario"
              : modalMode === "editar"
              ? "Editar Inventario"
              : "Productos del Inventario"}
          </DialogTitle>
        }
      >
        {/* Mostrar mensaje de alerta si hay algún error */}
        {alertMessage && (
          <Typography
            variant="body1"
            color={alertSeverity === "error" ? "red" : "green"}
          >
            {alertMessage}
          </Typography>
        )}

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
              fullWidth
              error={!!formErrors.name}
              helperText={formErrors.name}
            />

            <FormControl fullWidth margin="normal" sx={inputStyles(theme)}>
              <InputLabel id="type-select">Tipo de Inventario</InputLabel>
              <Select
                labelId="type-select"
                value={nuevoInventario.type}
                label="Tipo de Inventario"
                onChange={(e) =>
                  setNuevoInventario({
                    ...nuevoInventario,
                    type: e.target.value,
                  })
                }
                error={!!formErrors.type}
              >
                <MenuItem value="General">General</MenuItem>
                <MenuItem value="Semanal">Semanal</MenuItem>
                <MenuItem value="Semanal">Diario</MenuItem>
              </Select>
              {formErrors.type && (
                <Typography color="red" variant="body2" sx={{ mt: 1 }}>
                  {formErrors.type}
                </Typography>
              )}
            </FormControl>
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <DatePicker />
            </LocalizationProvider>
            <Button
              onClick={handleCrearInventario}
              variant="contained"
              color="primary"
              sx={{
                marginTop: "10px",
                backgroundColor: colors.primary[100],
                marginLeft: "20px",
              }}
            >
              {modalMode === "crear" ? "Crear Inventario" : "Guardar Cambios"}
            </Button>
          </>
        ) : modalMode === "ver" ? (
          <Typography variant="body1">
            Nombre del Inventario: {nuevoInventario.name}
            <br />
            Tipo: {nuevoInventario.type}
            <br />
            Fecha de Creación: {nuevoInventario.date}
          </Typography>
        ) : null}
      </ResponsiveModal>
    </Box>
  );
};

export default Inventario;
