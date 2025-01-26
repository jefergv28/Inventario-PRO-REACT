import {
  Box,
  Button,
  Modal,
  TextField,
  MenuItem,
  Select,
  InputLabel,
  FormControl,
  Typography,
  IconButton,
  Checkbox,
  FormControlLabel,
} from "@mui/material";
import { DataGrid, GridToolbar } from "@mui/x-data-grid";
import { tokens } from "../../../../theme";
import { useTheme } from "@mui/material";
import { useState, useEffect } from "react";
import Header from "../../Header";
import { mockDataProductos } from "../../data/mockData";
import { Add, Edit, Delete } from "@mui/icons-material";
import { Favorite } from "@mui/icons-material";
import FavoriteProductsPage from "../Favoritos/Favoritos";

const Lista = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  const [open, setOpen] = useState(false);
  const [localProducts, setLocalProducts] = useState([]);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [products, setProducts] = useState(mockDataProductos);
  const [formData, setFormData] = useState({
    name: "",
    price: "",
    category: "",
    provider: "",
    stock: "",
    isFavorite: "",
  });

  const [selectAll, setSelectAll] = useState(false); // Estado para seleccionar todo
  const [selectedProducts, setSelectedProducts] = useState([]); // Productos seleccionados

  const categories = ["Electronics", "Furniture", "Clothing"];
  const providers = ["Provider 1", "Provider 2", "Provider 3"];

  const columns = [
    {
      field: "select",
      headerName: "",
      renderHeader: () => (
        <Checkbox
          checked={selectAll}
          onChange={handleSelectAll}
          color="default"
          sx={{
            color: colors.grey[300], // Cambia el color del checkbox en el encabezado
            "&.Mui-checked": {
              color: colors.grey[100], // Color cuando ESTÁ seleccionado (checked)
            },
          }}
        />
      ),
      renderCell: (params) => (
        <Checkbox
          checked={params.row.selected || false}
          onChange={(e) => handleSelectProduct(e, params.row.id)}
          sx={{
            color: colors.grey[300], // Cambia el color del checkbox en el encabezado
            "&.Mui-checked": {
              color: colors.grey[100], // Color cuando ESTÁ seleccionado (checked)
            },
          }}
        />
      ),
      width: 100,
    },
    { field: "id", headerName: "ID", flex: 0.5 },
    { field: "name", headerName: "Nombre de producto", flex: 1 },
    {
      field: "isFavorite",
      headerName: "Favoritos",
      flex: 0.3,
      renderCell: (params) => (
        <IconButton
          onClick={() => handleFavorite(params.row.id)}
          sx={{ color: params.row.isFavorite ? "red" : "gray" }} // Cambia el color si está marcado como favorito
        >
          <Favorite />
        </IconButton>
      ),
    },
    { field: "category", headerName: "Categoría", flex: 1 },
    { field: "price", headerName: "Precio", flex: 1 },
    { field: "provider", headerName: "Proveedor", flex: 1 },
    { field: "stock", headerName: "Cantidad", flex: 0.5 },
    {
      field: "actions",
      headerName: "Acciones",
      flex: 0.5,
      renderCell: (params) => (
        <Box display="flex" justifyContent="space-between" alignItems="center">
          <IconButton
            onClick={() => handleEdit(params.row)}
            sx={{ color: colors.primary[300] }}
          >
            <Edit />
          </IconButton>
          <IconButton onClick={() => handleDelete(params.row.id)} color="error">
            <Delete />
          </IconButton>
          <IconButton
            onClick={() => handleFavorite(params.row.id)}
            sx={{ color: params.row.isFavorite ? "red" : "gray" }} // Cambia el color si está marcado como favorito
          >
            <Favorite />
          </IconButton>
        </Box>
      ),
    },
  ];

  // Función para manejar el cambio de estado del favorito
  const handleFavorite = (productId) => {
    const updatedProducts = products.map((product) =>
      product.id === productId
        ? { ...product, isFavorite: !product.isFavorite } // Cambia el estado de favorito
        : product
    );
    setProducts(updatedProducts);

    // Guarda los productos actualizados en LocalStorage
    localStorage.setItem("products", JSON.stringify(updatedProducts));
  };

  const handleSelectAll = (e) => {
    setSelectAll(e.target.checked);
    setProducts((prevProducts) =>
      prevProducts.map((product) => {
        const selected = e.target.checked;
        return {
          ...product,
          selected,
        };
      })
    );
    if (e.target.checked) {
      setSelectedProducts(products.map((product) => product.id));
    } else {
      setSelectedProducts([]);
    }
  };

  const handleSelectProduct = (e, productId) => {
    const updatedProducts = products.map((product) =>
      product.id === productId
        ? { ...product, selected: e.target.checked }
        : product
    );
    setProducts(updatedProducts);
    setSelectedProducts((prevSelected) => {
      if (e.target.checked) {
        return [...prevSelected, productId];
      } else {
        return prevSelected.filter((id) => id !== productId);
      }
    });
  };

  const handleOpen = () => {
    setFormData({
      name: "",
      price: "",
      category: "",
      provider: "",
      stock: "",
    });
    setSelectedProduct(null);
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSaveProduct = () => {
    if (selectedProduct) {
      const updatedProducts = products.map((product) =>
        product.id === selectedProduct.id
          ? { ...product, ...formData }
          : product
      );
      setProducts(updatedProducts);
    } else {
      const newProduct = {
        id: products.length + 1,
        ...formData,
      };
      setProducts([...products, newProduct]);
    }
    setSelectedProduct(null);
    handleClose();
  };

  const handleEdit = (product) => {
    setSelectedProduct(product);
    setFormData({
      name: product.name,
      price: product.price,
      category: product.category,
      provider: product.provider,
      stock: product.stock,
    });
    setOpen(true);
  };

  const handleDelete = (id) => {
    setProducts(products.filter((product) => product.id !== id));
    setSelectedProducts((prev) => prev.filter((productId) => productId !== id));
  };

  const handleBulkDelete = () => {
    setProducts(
      products.filter((product) => !selectedProducts.includes(product.id))
    );
    setSelectedProducts([]);
  };

  useEffect(() => {
    // Guardar en LocalStorage cada vez que se actualicen los productos
    localStorage.setItem("products", JSON.stringify(products));
  }, [products]);
  useEffect(() => {
    try {
      const storedProducts = JSON.parse(localStorage.getItem("products"));
      if (Array.isArray(storedProducts)) {
        setProducts(storedProducts);
      }
    } catch (error) {
      console.error("Error al cargar productos desde LocalStorage:", error);
    }
  }, []);

  return (
    <Box m="10px">
      <Header
        title="Gestión de productos"
        subtitle="Gestiona tus productos aquí"
      />
      <Box
        display="flex"
        justifyContent="space-between"
        alignItems="center"
        mb={2}
      >
        <Typography variant="h5">Lista de productos</Typography>
        <Box sx={{ display: "flex", gap: 2 }}>
          {selectedProducts.length > 0 && (
            <>
              <Button
                variant="contained"
                startIcon={<Delete />}
                onClick={handleBulkDelete}
                sx={{
                  backgroundColor: colors.redAccent[600],
                  color: "#fff",
                  "&:hover": {
                    backgroundColor: colors.redAccent[700],
                  },
                }}
              ></Button>
            </>
          )}
          <Button
            variant="contained"
            startIcon={<Add />}
            onClick={handleOpen}
            sx={{
              backgroundColor: colors.primary[100],
              color: "#fff",
              "&:hover": {
                backgroundColor: colors.blueAccent[600],
              },
            }}
          >
            Agregar producto
          </Button>
        </Box>
      </Box>
      <Box
        m="10px 0 0 0"
        height="75vh"
        width="100%"
        sx={{
          "& .MuiDataGrid-root": { border: "none" },
          "& .MuiDataGrid-cell": { borderBottom: "none" },
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
          rows={products}
          columns={columns}
          components={{ Toolbar: GridToolbar }}
        />
      </Box>

      <Modal open={open} onClose={handleClose}>
        <Box
          sx={{
            backgroundColor: colors.primary[500],
            padding: "20px",
            width: "400px",
            margin: "auto",
            marginTop: "100px",
            borderRadius: "8px",
          }}
        >
          <Typography variant="h6" mb={2}>
            {selectedProduct ? "Editar producto" : "Agregar producto"}
          </Typography>
          <TextField
            fullWidth
            label="Nombre del producto"
            name="name"
            value={formData.name}
            onChange={handleInputChange}
            sx={{
              mb: 2,
              "& .MuiOutlinedInput-root": {
                backgroundColor: "transparent", // Fondo del input

                "&.Mui-focused fieldset": {
                  borderColor: colors.primary[100], // Color del borde cuando está en foco
                },
              },
              "& .MuiInputLabel-root": {
                color: "gray", // Color del label por defecto
                "&.Mui-focused": {
                  color: colors.primary[100], // Color del label cuando está en foco
                },
              },
            }}
          />
          <TextField
            fullWidth
            label="Precio"
            name="price"
            type="number"
            value={formData.price}
            onChange={handleInputChange}
            sx={{
              mb: 2,
              "& .MuiOutlinedInput-root": {
                backgroundColor: "transparent", // Fondo del input

                "&.Mui-focused fieldset": {
                  borderColor: colors.primary[100], // Color del borde cuando está en foco
                },
              },
              "& .MuiInputLabel-root": {
                color: "gray", // Color del label por defecto
                "&.Mui-focused": {
                  color: colors.primary[100], // Color del label cuando está en foco
                },
              },
            }}
          />
          <FormControl fullWidth sx={{ mb: 2 }}>
            <InputLabel>Categoría</InputLabel>
            <Select
              name="category"
              value={formData.category}
              onChange={handleInputChange}
            >
              {categories.map((category, index) => (
                <MenuItem key={index} value={category}>
                  {category}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
          <FormControl fullWidth sx={{ mb: 2 }}>
            <InputLabel>Proveedor</InputLabel>
            <Select
              name="provider"
              value={formData.provider}
              onChange={handleInputChange}
            >
              {providers.map((provider, index) => (
                <MenuItem key={index} value={provider}>
                  {provider}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
          <TextField
            fullWidth
            label="Stock"
            name="stock"
            type="number"
            value={formData.stock}
            onChange={handleInputChange}
            sx={{
              mb: 2,
              "& .MuiOutlinedInput-root": {
                backgroundColor: "transparent", // Fondo del input

                "&.Mui-focused fieldset": {
                  borderColor: colors.primary[100], // Color del borde cuando está en foco
                },
              },
              "& .MuiInputLabel-root": {
                color: "gray", // Color del label por defecto
                "&.Mui-focused": {
                  color: colors.primary[100], // Color del label cuando está en foco
                },
              },
            }}
          />
          <Box display="flex" justifyContent="space-between">
            <Button onClick={handleClose}>Cancelar</Button>
            <Button onClick={handleSaveProduct} variant="contained">
              {selectedProduct ? "Actualizar" : "Guardar"}
            </Button>
          </Box>
        </Box>
      </Modal>
    </Box>
  );
};

export default Lista;
