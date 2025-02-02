import React, { useState, useEffect } from "react";
import {
  Box,
  Button,
  Typography,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  TextField,
  IconButton,
  Pagination,
  Tooltip,
} from "@mui/material";
import Header from "../../Header";
import useMediaQuery from "@mui/material/useMediaQuery";
import { tokens } from "../../../../theme";
import { useTheme } from "@mui/material/styles";
import { DataGrid } from "@mui/x-data-grid";
import VisibilityIcon from "@mui/icons-material/Visibility"; // Icono para ver detalles

// Para exportar a CSV
import Papa from "papaparse";

// Si deseas exportar a PDF, también puedes usar jsPDF
import jsPDF from "jspdf";

// Para el Dialog de detalles
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";

const Movimientos = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const isNonMobile = useMediaQuery("(min-width:600px)");

  // Estado para los movimientos (esto puede venir de una base de datos o API)
  const [movimientos, setMovimientos] = useState([
    {
      id: 1,
      fecha: "2025-01-20",
      tipo: "Entrada",
      producto: "Producto A",
      cantidad: 10,
      descripcion: "Movimiento 1",
    },
    {
      id: 2,
      fecha: "2025-01-21",
      tipo: "Salida",
      producto: "Producto B",
      cantidad: 5,
      descripcion: "Movimiento 2",
    },
    {
      id: 3,
      fecha: "2025-01-22",
      tipo: "Ajuste",
      producto: "Producto C",
      cantidad: 3,
      descripcion: "Movimiento 3",
    },
  ]);
  const [filtro, setFiltro] = useState(""); // Para filtrar por fecha o descripción
  const [page, setPage] = useState(1); // Para la paginación
  const rowsPerPage = 5; // Número de filas por página
  const [openDialog, setOpenDialog] = useState(false); // Estado para el Dialog
  const [movimientoSeleccionado, setMovimientoSeleccionado] = useState(null); // Estado para el movimiento seleccionado

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  // Filtro de los movimientos
  const movimientosFiltrados = movimientos.filter(
    (movimiento) =>
      movimiento.fecha.includes(filtro) ||
      movimiento.descripcion.toLowerCase().includes(filtro.toLowerCase())
  );

  // Simulación de la creación de nuevos movimientos (puedes reemplazarlo por un hook o API real)
  useEffect(() => {
    const interval = setInterval(() => {
      // Aquí simulamos la llegada de nuevos movimientos
      const nuevoMovimiento = {
        id: Date.now(),
        fecha: new Date().toISOString().slice(0, 10), // Fecha actual
        tipo: "Ajuste",
        producto: "Producto D",
        cantidad: Math.floor(Math.random() * 10) + 1, // Cantidad aleatoria
        descripcion: `Movimiento generado automáticamente`,
      };
      setMovimientos((prev) => [nuevoMovimiento, ...prev]); // Añadimos el nuevo movimiento al principio
    }, 5000); // Cada 5 segundos se agrega un nuevo movimiento

    // Limpiamos el intervalo al desmontar el componente
    return () => clearInterval(interval);
  }, []);

  // Función para exportar a CSV
  const handleExportCSV = () => {
    const csv = movimientosFiltrados.map((movimiento) => ({
      Fecha: movimiento.fecha,
      Tipo: movimiento.tipo,
      Producto: movimiento.producto,
      Cantidad: movimiento.cantidad,
      Descripción: movimiento.descripcion,
    }));
    const csvContent = Papa.unparse(csv);
    const blob = new Blob([csvContent], { type: "text/csv" });
    const link = document.createElement("a");
    link.href = URL.createObjectURL(blob);
    link.download = "movimientos.csv";
    link.click();
  };

  // Función para exportar a PDF
  const handleExportPDF = () => {
    const doc = new jsPDF();
    movimientosFiltrados.forEach((movimiento, index) => {
      doc.text(
        `${movimiento.fecha} - ${movimiento.tipo} - ${movimiento.producto}`,
        10,
        10 + index * 10
      );
    });
    doc.save("movimientos.pdf");
  };

  // Función para abrir el dialog con el detalle del movimiento
  const handleVerDetalle = (movimiento) => {
    setMovimientoSeleccionado(movimiento);
    setOpenDialog(true);
  };

  // Función para cerrar el dialog
  const handleCloseDialog = () => {
    setOpenDialog(false);
    setMovimientoSeleccionado(null);
  };

  return (
    <Box m="20px">
      <Header
        title="HISTORIAL DE MOVIMIENTOS"
        subtitle="Lista de movimientos realizados"
      />

      {/* Filtro de búsqueda */}
      <Box display="flex" justifyContent="space-between" mb={2}>
        <TextField
          label="Buscar por fecha o descripción"
          variant="outlined"
          value={filtro}
          onChange={(e) => setFiltro(e.target.value)}
          fullWidth
          sx={{
            "& .MuiOutlinedInput-root": {
              "&.Mui-focused fieldset": {
                borderColor: colors.primary[100], // Cambia el color del borde cuando esté enfocado
              },
            },
            "& .MuiInputLabel-root": {
              "&.Mui-focused": {
                color: colors.primary[100], // Cambia el color del label cuando esté enfocado
              },
            },
          }}
        />
        <Button
          variant="contained"
          onClick={() => setFiltro("")} // Para limpiar el filtro
          sx={{
            marginLeft: 2,
            backgroundColor: colors.primary[100], // Cambia el color de fondo
            color: "white", // Cambia el color del texto
            "&:hover": {
              backgroundColor: colors.primary[200], // Cambia el color de fondo cuando se pasa el cursor (hover)
            },
          }}
        >
          Limpiar Filtro
        </Button>
      </Box>

      {/* Botones de exportación */}
      <Box display="flex" justifyContent="space-between" mb={2}>
        <Button
          variant="contained"
          onClick={handleExportCSV}
          sx={{
            backgroundColor: colors.primary[100],
            color: "white",
            "&:hover": {
              backgroundColor: colors.primary[200],
            },
          }}
        >
          Exportar a CSV
        </Button>
        <Button
          variant="contained"
          onClick={handleExportPDF}
          sx={{
            backgroundColor: colors.primary[100],
            color: "white",
            "&:hover": {
              backgroundColor: colors.primary[200],
            },
          }}
        >
          Exportar a PDF
        </Button>
      </Box>

      {/* Tabla de movimientos usando DataGrid */}
      <Box sx={{ height: 400, width: "100%", overflowX: "auto" }}>
        <DataGrid
          rows={movimientosFiltrados}
          columns={[
            {
              field: "fecha",
              headerName: "Fecha",
              width: 150,
            },
            {
              field: "tipo",
              headerName: "Tipo",
              width: 150,
              renderCell: (params) => {
                let color = "";
                if (params.value === "Entrada") color = "green";
                else if (params.value === "Salida") color = "red";
                else color = "yellow";
                return <span style={{ color }}>{params.value}</span>;
              },
            },
            { field: "producto", headerName: "Producto", width: 150 },
            { field: "cantidad", headerName: "Cantidad", width: 150 },
            { field: "descripcion", headerName: "Descripción", width: 250 },
            {
              field: "acciones",
              headerName: "Acciones",
              width: 150,
              renderCell: (params) => (
                <Tooltip title="Ver detalles">
                  <IconButton
                    onClick={() => handleVerDetalle(params.row)} // Mostrar detalles en el dialog
                    sx={{
                      color: colors.blueAccent[100],
                      "&:hover": {
                        color: colors.blueAccent[500],
                      },
                    }}
                  >
                    <VisibilityIcon />
                  </IconButton>
                </Tooltip>
              ),
            },
          ]}
          pageSize={rowsPerPage}
          rowsPerPageOptions={[5, 10, 25]}
          pagination
        />
      </Box>

      {/* Paginación */}
      <Box display="flex" justifyContent="center" mt="20px">
        <Pagination
          count={Math.ceil(movimientosFiltrados.length / rowsPerPage)}
          page={page}
          onChange={handleChangePage}
          color="primary"
        />
      </Box>

      {/* Dialog para mostrar los detalles del movimiento */}
      <Dialog open={openDialog} onClose={handleCloseDialog}>
        <DialogTitle>Detalles del Movimiento</DialogTitle>
        <DialogContent>
          <DialogContentText>
            <strong>Fecha:</strong> {movimientoSeleccionado?.fecha}
            <br />
            <strong>Tipo:</strong> {movimientoSeleccionado?.tipo}
            <br />
            <strong>Producto:</strong> {movimientoSeleccionado?.producto}
            <br />
            <strong>Cantidad:</strong> {movimientoSeleccionado?.cantidad}
            <br />
            <strong>Descripción:</strong> {movimientoSeleccionado?.descripcion}
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDialog} color="primary">
            Cerrar
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default Movimientos;
