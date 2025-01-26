import React, { useState } from "react";
import {
  Box,
  Typography,
  useTheme,
  TextField,
  Button,
  Select,
  MenuItem,
  InputLabel,
  FormControl,
} from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import { tokens } from "../../../../theme";
import { mockDataInventario } from "../../data/mockData";
import Header from "../../Header";
import * as XLSX from "xlsx";
import jsPDF from "jspdf";
import html2pdf from "html2pdf.js";
import "jspdf-autotable";

const InformesInventario = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  const [filters, setFilters] = useState({
    startDate: "",
    endDate: "",
    category: "",
    productName: "",
    status: "",
  });

  const categories = [
    ...new Set(mockDataInventario.map((item) => item.categoria)),
  ];
  const productNames = [
    ...new Set(mockDataInventario.map((item) => item.nombreProducto)),
  ];

  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setFilters((prevFilters) => ({
      ...prevFilters,
      [name]: value,
    }));
  };

  const handleApplyFilters = () => {
    console.log(filters);
  };

  // Función para limpiar los filtros
  const handleClearFilters = () => {
    setFilters({
      startDate: "",
      endDate: "",
      category: "",
      productName: "",
      status: "",
    });
  };

  // Filtrar los datos basados en los filtros seleccionados
  const filteredData = mockDataInventario.filter((item) => {
    // Filtrar por fecha de inicio
    const startDateValid = filters.startDate
      ? new Date(item.fechaUltimoIngreso) >= new Date(filters.startDate)
      : true;
    // Filtrar por fecha de fin
    const endDateValid = filters.endDate
      ? new Date(item.fechaUltimoIngreso) <= new Date(filters.endDate)
      : true;
    // Filtrar por categoría
    const categoryValid = filters.category
      ? item.categoria === filters.category
      : true;
    // Filtrar por nombre de producto
    const productNameValid = filters.productName
      ? item.nombreProducto === filters.productName
      : true;
    // Filtrar por estado
    const statusValid = filters.status ? item.estado === filters.status : true;

    // Si todos los filtros son válidos, se incluye el elemento
    return (
      startDateValid &&
      endDateValid &&
      categoryValid &&
      productNameValid &&
      statusValid
    );
  });

  const columns = [
    { field: "id", headerName: "ID Producto", flex: 1 },
    { field: "nombreProducto", headerName: "Nombre del Producto", flex: 1 },
    { field: "categoria", headerName: "Categoría", flex: 1 },
    { field: "cantidadStock", headerName: "Cantidad en Stock", flex: 1 },
    { field: "precioUnitario", headerName: "Precio Unitario", flex: 1 },
    { field: "valorTotal", headerName: "Valor Total", flex: 1 },
    {
      field: "fechaUltimoIngreso",
      headerName: "Fecha Último Ingreso",
      flex: 1,
    },
    { field: "estado", headerName: "Estado", flex: 1 },
  ];

  // Función para exportar a Excel
  const exportToExcel = () => {
    const ws = XLSX.utils.json_to_sheet(filteredData);
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, "Inventario");
    XLSX.writeFile(wb, "inventario.xlsx");
  };

  // Función para exportar a PDF
  const exportToPDF = () => {
    const doc = new jsPDF();
    doc.text("Informe de Inventario", 20, 10);

    const data = filteredData.map((item) => [
      item.id,
      item.nombreProducto,
      item.categoria,
      item.cantidadStock,
      item.precioUnitario,
      item.valorTotal,
      item.fechaUltimoIngreso,
      item.estado,
    ]);

    doc.autoTable({
      head: [
        [
          "ID Producto",
          "Nombre Producto",
          "Categoría",
          "Cantidad en Stock",
          "Precio Unitario",
          "Valor Total",
          "Fecha Último Ingreso",
          "Estado",
        ],
      ],
      body: data,
    });

    doc.save("inventario.pdf");
  };

  return (
    <Box m="10px">
      <Header
        title="Informes de Inventario"
        subtitle="Generación de informes detallados del inventario"
      />
      <Box mb="10px" display="flex" flexWrap="wrap" gap="16px">
        {/* Fecha de Inicio */}
        <TextField
          label="Fecha de Inicio"
          type="date"
          name="startDate"
          value={filters.startDate}
          onChange={handleFilterChange}
          InputLabelProps={{ shrink: true }}
          sx={{
            "& input": {
              color: colors.primary[100], // Color del texto
            },
            "& .MuiOutlinedInput-root": {
              "& fieldset": {
                borderColor: colors.primary[400], // Color del borde normal
              },
              "&:hover fieldset": {
                borderColor: colors.blueAccent[300], // Color del borde al pasar el mouse
              },
              "&.Mui-focused fieldset": {
                borderColor: colors.greenAccent[300], // Color del borde al hacer focus
              },
            },
            "& .MuiInputLabel-root": {
              color: colors.primary[100], // Color de la etiqueta
            },
            "& .Mui-focused .MuiInputLabel-root": {
              color: colors.greenAccent[300], // Color de la etiqueta al hacer focus
            },
          }}
        />
        {/* Fecha de Fin */}
        <TextField
          label="Fecha de Fin"
          type="date"
          name="endDate"
          value={filters.endDate}
          onChange={handleFilterChange}
          InputLabelProps={{ shrink: true }}
          sx={{
            "& input": {
              color: colors.primary[100], // Color del texto
            },
            "& .MuiOutlinedInput-root": {
              "& fieldset": {
                borderColor: colors.primary[400], // Color del borde normal
              },
              "&:hover fieldset": {
                borderColor: colors.blueAccent[300], // Color del borde al pasar el mouse
              },
              "&.Mui-focused fieldset": {
                borderColor: colors.greenAccent[300], // Color del borde al hacer focus
              },
            },
            "& .MuiInputLabel-root": {
              color: colors.primary[100], // Color de la etiqueta
            },
            "& .Mui-focused .MuiInputLabel-root": {
              color: colors.greenAccent[300], // Color de la etiqueta al hacer focus
            },
          }}
        />
        {/* Categoría */}
        <FormControl sx={{ minWidth: 200, position: "relative" }}>
          <InputLabel
            sx={{
              color: colors.primary[100], // Color del label
              transition: "transform 0.3s ease, color 0.3s ease", // Suaviza el movimiento
              transform: filters.category
                ? "translate(10px, -18px) scale(0.75)"
                : "translate(10px, -18px)", // Mueve el label arriba
              position: "absolute", // Para no tapar el borde
              zIndex: 1, // Asegura que el label esté por encima del borde
            }}
            shrink={filters.category !== ""} // Si hay valor o el campo está enfocado, el label se mueve arriba
          >
            Categoría
          </InputLabel>
          <Select
            name="category"
            value={filters.category}
            onChange={handleFilterChange}
            displayEmpty
            sx={{
              "& input": {
                color: colors.primary[100], // Color del texto
              },
              "& .MuiOutlinedInput-root": {
                "& fieldset": {
                  borderColor: colors.primary[400], // Color del borde normal
                  borderWidth: "2px", // Asegura que el borde tenga el tamaño adecuado
                },
                "&:hover fieldset": {
                  borderColor: colors.blueAccent[300], // Color del borde al pasar el mouse
                },
                "&.Mui-focused fieldset": {
                  borderColor: colors.greenAccent[300], // Color del borde al hacer foco
                },
              },
              "& .MuiInputLabel-root": {
                color: colors.primary[100], // Color de la etiqueta
              },
              "& .Mui-focused .MuiInputLabel-root": {
                color: colors.greenAccent[300], // Color del label al hacer foco
              },
            }}
          >
            <MenuItem value="">Todas</MenuItem>
            {categories.map((category) => (
              <MenuItem key={category} value={category}>
                {category}
              </MenuItem>
            ))}
          </Select>
        </FormControl>

        {/* Nombre del Producto */}
        <FormControl sx={{ minWidth: 200, position: "relative" }}>
          <InputLabel
            sx={{
              color: colors.primary[100], // Color del label
              transition: "transform 0.3s ease, color 0.3s ease", // Suaviza el movimiento
              transform: filters.productName
                ? "translate(10px, -18px) scale(0.75)"
                : "translate(10px, -18px) ", // Mueve el label arriba
              position: "absolute", // Para no tapar el borde
              zIndex: 1, // Asegura que el label esté por encima del borde
            }}
            shrink={filters.productName !== ""} // Si hay valor o el campo está enfocado, el label se mueve arriba
          >
            Nombre del Producto
          </InputLabel>
          <Select
            name="productName"
            value={filters.productName}
            onChange={handleFilterChange}
            displayEmpty
            sx={{
              color: colors.primary[100], // Color del texto
              "& .MuiOutlinedInput-root": {
                "& fieldset": {
                  borderColor: colors.primary[400], // Color del borde normal
                  borderWidth: "2px", // Asegura que el borde tenga el tamaño adecuado
                },
                "&:hover fieldset": {
                  borderColor: colors.blueAccent[300], // Color del borde al pasar el mouse
                },
                "&.Mui-focused fieldset": {
                  borderColor: colors.greenAccent[300], // Color del borde al hacer foco
                },
              },
              "& .MuiInputLabel-root": {
                color: colors.primary[100], // Color de la etiqueta
              },
              "& .Mui-focused .MuiInputLabel-root": {
                color: colors.greenAccent[300], // Color del label al hacer foco
              },
            }}
          >
            <MenuItem value="">Todos</MenuItem>
            {productNames.map((productName) => (
              <MenuItem key={productName} value={productName}>
                {productName}
              </MenuItem>
            ))}
          </Select>
        </FormControl>

        {/* Estado */}
        <FormControl sx={{ minWidth: 200, position: "relative" }}>
          <InputLabel
            sx={{
              color: colors.primary[100], // Color del label
              transition: "transform 0.3s ease, color 0.3s ease", // Suaviza el movimiento
              transform: filters.status
                ? "translate(10px, -18px) scale(0.75)"
                : "translate(10px, -18px)", // Mueve el label arriba
              position: "absolute", // Para no tapar el borde
              zIndex: 1, // Asegura que el label esté por encima del borde
            }}
            shrink={filters.status !== ""} // Si hay valor o el campo está enfocado, el label se mueve arriba
          >
            Estado
          </InputLabel>
          <Select
            name="status"
            value={filters.status}
            onChange={handleFilterChange}
            displayEmpty
            sx={{
              color: colors.primary[100], // Color del texto
              "& .MuiOutlinedInput-root": {
                "& fieldset": {
                  borderColor: colors.primary[400], // Color del borde normal
                  borderWidth: "2px", // Asegura que el borde tenga el tamaño adecuado
                },
                "&:hover fieldset": {
                  borderColor: colors.blueAccent[300], // Color del borde al pasar el mouse
                },
                "&.Mui-focused fieldset": {
                  borderColor: colors.greenAccent[300], // Color del borde al hacer foco
                },
              },
              "& .MuiInputLabel-root": {
                color: colors.primary[100], // Color de la etiqueta
              },
              "& .Mui-focused .MuiInputLabel-root": {
                color: colors.greenAccent[300], // Color del label al hacer foco
              },
            }}
          >
            <MenuItem value="">Todos</MenuItem>
            <MenuItem value="Disponible">Disponible</MenuItem>
            <MenuItem value="No disponible">No disponible</MenuItem>
          </Select>
        </FormControl>

        <Button
          variant="contained"
          onClick={handleApplyFilters}
          sx={{
            backgroundColor: colors.primary[100],
            "&:hover": { backgroundColor: colors.blueAccent[500] },
          }}
        >
          Aplicar Filtros
        </Button>
        <Button
          variant="outlined"
          onClick={handleClearFilters}
          sx={{
            backgroundColor: colors.primary[900],
            color: colors.primary[100],
            "&:hover": { backgroundColor: colors.redAccent[500] },
          }}
        >
          Limpiar Filtros
        </Button>
      </Box>

      {/* Botones para exportar */}
      <Box display="flex" justifyContent="flex-end" gap="10px" mb="20px">
        <Button
          variant="contained"
          onClick={exportToPDF}
          sx={{
            backgroundColor: colors.greenAccent[500],
            "&:hover": { backgroundColor: colors.greenAccent[700] },
          }}
        >
          Descargar PDF
        </Button>
        <Button
          variant="contained"
          onClick={exportToExcel}
          sx={{
            backgroundColor: colors.blueAccent[500],
            "&:hover": { backgroundColor: colors.blueAccent[700] },
          }}
        >
          Descargar Excel
        </Button>
      </Box>

      {/* Tabla */}
      <Box height="75vh">
        <DataGrid rows={filteredData} columns={columns} />
      </Box>
    </Box>
  );
};

export default InformesInventario;
