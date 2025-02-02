import React, { useState } from "react";
import {
  Box,
  Button,
  Typography,
  TextField,
  IconButton,
  Tooltip,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  DialogContentText,
} from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import { useTheme } from "@mui/material/styles";
import { tokens } from "../../../../theme";

const ControlStock = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  // Estado para productos en stock
  const [productos, setProductos] = useState([
    {
      id: 1,
      nombre: "Producto A",
      categoria: "Categoría 1",
      cantidad: 20,
      precio: 10,
    },
    {
      id: 2,
      nombre: "Producto B",
      categoria: "Categoría 2",
      cantidad: 50,
      precio: 15,
    },
    {
      id: 3,
      nombre: "Producto C",
      categoria: "Categoría 3",
      cantidad: 10,
      precio: 25,
    },
  ]);

  const [busqueda, setBusqueda] = useState("");
  const [productoSeleccionado, setProductoSeleccionado] = useState(null);
  const [cantidad, setCantidad] = useState(0);
  const [openDialog, setOpenDialog] = useState(false);

  // Función para agregar stock a un producto
  const agregarStock = () => {
    if (productoSeleccionado && cantidad > 0) {
      const newProductos = productos.map((producto) =>
        producto.id === productoSeleccionado.id
          ? { ...producto, cantidad: producto.cantidad + cantidad }
          : producto
      );
      setProductos(newProductos);
      setCantidad(0);
      setProductoSeleccionado(null);
      setOpenDialog(false); // Cerrar el dialogo después de agregar stock
    }
  };

  // Función para editar un producto
  const editarProducto = () => {
    if (productoSeleccionado && cantidad >= 0) {
      const newProductos = productos.map((producto) =>
        producto.id === productoSeleccionado.id
          ? { ...producto, cantidad: cantidad }
          : producto
      );
      setProductos(newProductos);
      setCantidad(0);
      setProductoSeleccionado(null);
      setOpenDialog(false); // Cerrar el dialogo después de editar el stock
    }
  };

  // Función para eliminar un producto
  const eliminarProducto = (id) => {
    setProductos(productos.filter((producto) => producto.id !== id));
  };

  const productosFiltrados = productos.filter((producto) =>
    producto.nombre.toLowerCase().includes(busqueda.toLowerCase())
  );

  return (
    <Box m="20px">
      <Typography variant="h4" gutterBottom>
        Control de Stock
      </Typography>

      {/* Filtro de búsqueda */}
      <Box display="flex" mb={2}>
        <TextField
          label="Buscar Producto"
          variant="outlined"
          value={busqueda}
          onChange={(e) => setBusqueda(e.target.value)}
          sx={{
            "& .MuiOutlinedInput-root": {
              "&.Mui-focused fieldset": {
                borderColor: colors.primary[100],
              },
            },
          }}
        />
      </Box>

      {/* Tabla de productos */}
      <Box sx={{ height: 400, width: "100%" }}>
        <DataGrid
          rows={productosFiltrados}
          columns={[
            { field: "id", headerName: "ID", width: 90 },
            { field: "nombre", headerName: "Nombre", width: 150 },
            { field: "categoria", headerName: "Categoría", width: 150 },
            {
              field: "cantidad",
              headerName: "Cantidad Disponible",
              width: 180,
            },
            { field: "precio", headerName: "Precio", width: 150 },
            {
              field: "acciones",
              headerName: "Acciones",
              width: 180,
              renderCell: (params) => (
                <Box>
                  <Tooltip title="Editar">
                    <IconButton
                      onClick={() => {
                        setProductoSeleccionado(params.row);
                        setCantidad(params.row.cantidad); // Mostrar cantidad actual para edición
                        setOpenDialog(true);
                      }}
                      sx={{ color: colors.blueAccent[100] }}
                    >
                      <EditIcon />
                    </IconButton>
                  </Tooltip>
                  <Tooltip title="Eliminar">
                    <IconButton
                      onClick={() => eliminarProducto(params.row.id)}
                      sx={{ color: colors.redAccent[100] }}
                    >
                      <DeleteIcon />
                    </IconButton>
                  </Tooltip>
                </Box>
              ),
            },
          ]}
          pageSize={5}
          rowsPerPageOptions={[5, 10, 25]}
          pagination
        />
      </Box>

      {/* Botón para abrir el diálogo */}
      <Box mt={2} display="flex" justifyContent="center">
        <Button
          variant="contained"
          color="primary"
          onClick={() => {
            setProductoSeleccionado(null); // Para que no haya producto seleccionado
            setCantidad(0); // Reiniciar cantidad
            setOpenDialog(true);
          }}
        >
          Añadir Stock
        </Button>
      </Box>

      {/* Diálogo para añadir o editar stock */}
      <Dialog open={openDialog} onClose={() => setOpenDialog(false)}>
        <DialogTitle>
          {productoSeleccionado ? "Editar Stock" : "Añadir Stock"}
        </DialogTitle>
        <DialogContent>
          <DialogContentText>
            {productoSeleccionado
              ? "Modifica la cantidad del producto seleccionado."
              : "Selecciona un producto y añade cantidad."}
          </DialogContentText>

          {/* Selección del Producto */}
          <FormControl fullWidth margin="normal">
            <InputLabel>Selecciona un Producto</InputLabel>
            <Select
              value={productoSeleccionado ? productoSeleccionado.id : ""}
              onChange={(e) => {
                const producto = productos.find((p) => p.id === e.target.value);
                setProductoSeleccionado(producto);
                setCantidad(producto?.cantidad || 0); // Cargar cantidad del producto seleccionado
              }}
              label="Selecciona un Producto"
              disabled={productoSeleccionado !== null} // Desactivar si ya se ha seleccionado un producto
            >
              {productos.map((producto) => (
                <MenuItem key={producto.id} value={producto.id}>
                  {producto.nombre}
                </MenuItem>
              ))}
            </Select>
          </FormControl>

          {/* Ingreso de cantidad */}
          <TextField
            label="Cantidad"
            variant="outlined"
            type="number"
            value={cantidad}
            onChange={(e) => setCantidad(Number(e.target.value))}
            fullWidth
            margin="normal"
          />
        </DialogContent>

        <DialogActions>
          <Button onClick={() => setOpenDialog(false)} color="secondary">
            Cancelar
          </Button>
          <Button
            onClick={productoSeleccionado ? editarProducto : agregarStock}
            color="primary"
          >
            {productoSeleccionado ? "Guardar Cambios" : "Añadir Stock"}
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default ControlStock;
