import React, { useState, useEffect } from "react";
import {
  Box,
  Button,
  TextField,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Typography,
  IconButton,
} from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import AddIcon from "@mui/icons-material/Add";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import axios from "axios";

const Proveedores = () => {
  const [proveedores, setProveedores] = useState([]);
  const [openDialog, setOpenDialog] = useState(false);
  const [nuevoProveedor, setNuevoProveedor] = useState({
    name: "", // Cambié 'nombre' a 'name'
    phone: "", // Cambié 'telefono' a 'phone'
    email: "",
  });
  const [editingProveedor, setEditingProveedor] = useState(null);

  useEffect(() => {
    // Cargar los proveedores desde el backend
    axios
      .get("https://jsonplaceholder.typicode.com/users")
      .then((response) => {
        setProveedores(response.data);
      })
      .catch((error) => {
        console.error("Error al obtener proveedores", error);
      });
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNuevoProveedor({
      ...nuevoProveedor,
      [name]: value,
    });
  };

  const handleAddProveedor = () => {
    // Agregar el nuevo proveedor a la base de datos (puedes hacer un POST al backend)
    if (nuevoProveedor.name && nuevoProveedor.phone && nuevoProveedor.email) {
      axios
        .post("https://jsonplaceholder.typicode.com/users", nuevoProveedor)
        .then((response) => {
          setProveedores([...proveedores, response.data]); // Añadimos el proveedor agregado desde el servidor
          setOpenDialog(false);
          setNuevoProveedor({ name: "", phone: "", email: "" });
        })
        .catch((error) => {
          console.error("Error al agregar proveedor", error);
        });
    }
  };

  const handleUpdateProveedor = () => {
    // Actualizar el proveedor en la base de datos (puedes hacer un PUT al backend)
    if (nuevoProveedor.name && nuevoProveedor.phone && nuevoProveedor.email) {
      axios
        .put(
          `https://jsonplaceholder.typicode.com/users/${editingProveedor}`,
          nuevoProveedor
        )
        .then((response) => {
          setProveedores(
            proveedores.map((prov) =>
              prov.id === editingProveedor ? response.data : prov
            )
          );
          setOpenDialog(false);
          setNuevoProveedor({ name: "", phone: "", email: "" });
          setEditingProveedor(null); // Resetear el estado de edición
        })
        .catch((error) => {
          console.error("Error al actualizar proveedor", error);
        });
    }
  };

  const handleEditProveedor = (id) => {
    // Obtener el proveedor para editarlo
    const proveedor = proveedores.find((prov) => prov.id === id);
    setNuevoProveedor({
      name: proveedor.name, // Cambié 'nombre' a 'name'
      phone: proveedor.phone, // Cambié 'telefono' a 'phone'
      email: proveedor.email,
    });
    setEditingProveedor(id); // Guardamos el id del proveedor a editar
    setOpenDialog(true);
  };

  const handleDeleteProveedor = (id) => {
    // Eliminar proveedor
    axios
      .delete(`https://jsonplaceholder.typicode.com/users/${id}`)
      .then(() => {
        setProveedores(proveedores.filter((prov) => prov.id !== id));
      })
      .catch((error) => {
        console.error("Error al eliminar proveedor", error);
      });
  };

  return (
    <Box m="20px">
      <Typography variant="h4" gutterBottom>
        Proveedores
      </Typography>

      {/* Tabla de Proveedores */}
      <div style={{ height: 400, width: "100%" }}>
        <DataGrid
          rows={proveedores}
          columns={[
            { field: "id", headerName: "ID", width: 90 },
            { field: "name", headerName: "Nombre", width: 200 }, // Cambié 'nombre' a 'name'
            { field: "phone", headerName: "Teléfono", width: 180 }, // Cambié 'telefono' a 'phone'
            { field: "email", headerName: "Correo Electrónico", width: 250 },
            {
              field: "acciones",
              headerName: "Acciones",
              width: 150,
              renderCell: (params) => (
                <>
                  <IconButton
                    onClick={() => handleEditProveedor(params.row.id)}
                  >
                    <EditIcon />
                  </IconButton>
                  <IconButton
                    onClick={() => handleDeleteProveedor(params.row.id)}
                  >
                    <DeleteIcon />
                  </IconButton>
                </>
              ),
            },
          ]}
          pageSize={5}
        />
      </div>

      {/* Botón para abrir el formulario de agregar proveedor */}
      <Button
        variant="contained"
        color="primary"
        startIcon={<AddIcon />}
        onClick={() => setOpenDialog(true)}
      >
        Agregar Proveedor
      </Button>

      {/* Diálogo para agregar/editar proveedor */}
      <Dialog open={openDialog} onClose={() => setOpenDialog(false)}>
        <DialogTitle>
          {editingProveedor ? "Editar Proveedor" : "Agregar Proveedor"}
        </DialogTitle>
        <DialogContent>
          <TextField
            label="Nombre"
            fullWidth
            margin="normal"
            name="name" // Cambié 'nombre' a 'name'
            value={nuevoProveedor.name}
            onChange={handleInputChange}
          />
          <TextField
            label="Teléfono"
            fullWidth
            margin="normal"
            name="phone" // Cambié 'telefono' a 'phone'
            value={nuevoProveedor.phone}
            onChange={handleInputChange}
          />
          <TextField
            label="Correo Electrónico"
            fullWidth
            margin="normal"
            name="email"
            value={nuevoProveedor.email}
            onChange={handleInputChange}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenDialog(false)} color="secondary">
            Cancelar
          </Button>
          <Button
            onClick={
              editingProveedor ? handleUpdateProveedor : handleAddProveedor
            }
            color="primary"
          >
            {editingProveedor ? "Actualizar" : "Agregar"}
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default Proveedores;
