import React, { useState } from "react";
import { Box, Typography, useTheme, TextField, Button } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import { tokens } from "../../../../theme";
import { mockDataInventario } from "../../data/mockData";
import Header from "../../Header";

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

  const columns = [
    { field: "id", headerName: "ID Producto", flex: 1 },
    { field: "name", headerName: "Nombre del Producto", flex: 1 },
    { field: "category", headerName: "Categoría", flex: 1 },
    { field: "stock", headerName: "Cantidad en Stock", flex: 1 },
    { field: "price", headerName: "Precio Unitario", flex: 1 },
    { field: "totalValue", headerName: "Valor Total", flex: 1 },
    { field: "lastEntry", headerName: "Fecha Último Ingreso", flex: 1 },
    { field: "status", headerName: "Estado", flex: 1 },
  ];

  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setFilters((prevFilters) => ({
      ...prevFilters,
      [name]: value,
    }));
  };

  const handleApplyFilters = () => {
    // Aquí podrías filtrar los datos antes de pasarlos a la tabla
    console.log(filters);
  };

  return (
    <Box m="20px">
      <Header
        title="Informes de Inventario"
        subtitle="Generación de informes detallados del inventario"
      />
      {/* Filtros */}
      <Box mb="20px">
        <TextField
          label="Fecha de Inicio"
          type="date"
          name="startDate"
          value={filters.startDate}
          onChange={handleFilterChange}
          sx={{ mr: 2 }}
          InputLabelProps={{ shrink: true }}
        />
        <TextField
          label="Fecha de Fin"
          type="date"
          name="endDate"
          value={filters.endDate}
          onChange={handleFilterChange}
          sx={{ mr: 2 }}
          InputLabelProps={{ shrink: true }}
        />
        <TextField
          label="Categoría"
          name="category"
          value={filters.category}
          onChange={handleFilterChange}
          sx={{ mr: 2 }}
        />
        <TextField
          label="Nombre del Producto"
          name="productName"
          value={filters.productName}
          onChange={handleFilterChange}
          sx={{ mr: 2 }}
        />
        <TextField
          label="Estado"
          name="status"
          value={filters.status}
          onChange={handleFilterChange}
          sx={{ mr: 2 }}
        />
        <Button variant="contained" onClick={handleApplyFilters}>
          Aplicar Filtros
        </Button>
      </Box>

      {/* Tabla de Informe de Inventario */}
      <Box
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
        <DataGrid
          rows={mockDataInventario}
          columns={columns}
          checkboxSelection
        />
      </Box>

      {/* Opcional: Gráficos y Análisis */}
      {/* Aquí puedes agregar los gráficos que mencionamos antes */}
    </Box>
  );
};

export default InformesInventario;
