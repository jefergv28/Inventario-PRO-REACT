import { useState } from "react";
import {
  Box,
  Button,
  TextField,
  List,
  ListItem,
  ListItemText,
  Typography,
  IconButton,
  useTheme,
  Divider,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import Header from "../../Header"; // Asegúrate de que el componente Header esté bien importado

import { tokens } from "../../../../theme";

const Inventory = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const [products, setProducts] = useState([
    { id: "1", name: "Product A", quantity: 10 },
    { id: "2", name: "Product B", quantity: 25 },
    { id: "3", name: "Product C", quantity: 5 },
  ]);
  const [newProduct, setNewProduct] = useState({ name: "", quantity: "" });

  const handleAddProduct = () => {
    if (newProduct.name && newProduct.quantity) {
      const newProductObj = {
        id: `${products.length + 1}`,
        name: newProduct.name,
        quantity: parseInt(newProduct.quantity),
      };
      setProducts([...products, newProductObj]);
      setNewProduct({ name: "", quantity: "" });
    }
  };

  const handleEditProduct = (id) => {
    const productToEdit = products.find((product) => product.id === id);
    const updatedName = prompt("Edit product name", productToEdit.name);
    const updatedQuantity = prompt(
      "Edit product quantity",
      productToEdit.quantity
    );

    if (updatedName && updatedQuantity) {
      setProducts(
        products.map((product) =>
          product.id === id
            ? {
                ...product,
                name: updatedName,
                quantity: parseInt(updatedQuantity),
              }
            : product
        )
      );
    }
  };

  const handleDeleteProduct = (id) => {
    setProducts(products.filter((product) => product.id !== id));
  };

  return (
    <Box m="20px">
      <Header
        title="Inventory Management"
        subtitle="Manage your stock of products"
      />

      <Box display="flex" flexDirection="column" alignItems="flex-start">
        {/* Add New Product */}
        <Box display="flex" mb="20px">
          <TextField
            label="Product Name"
            variant="outlined"
            value={newProduct.name}
            onChange={(e) =>
              setNewProduct({ ...newProduct, name: e.target.value })
            }
            sx={{ mr: 2 }}
          />
          <TextField
            label="Quantity"
            type="number"
            variant="outlined"
            value={newProduct.quantity}
            onChange={(e) =>
              setNewProduct({ ...newProduct, quantity: e.target.value })
            }
            sx={{ mr: 2 }}
          />
          <Button
            onClick={handleAddProduct}
            variant="contained"
            color="primary"
            sx={{ height: "100%" }}
          >
            Add Product
          </Button>
        </Box>

        {/* Product List */}
        <Box flex="1 1 100%" mt="10px">
          <List>
            {products.map((product) => (
              <ListItem
                key={product.id}
                sx={{
                  backgroundColor: colors.primary[400],
                  margin: "10px 0",
                  borderRadius: "4px",
                }}
              >
                <ListItemText
                  primary={product.name}
                  secondary={`Quantity: ${product.quantity}`}
                />
                <IconButton
                  edge="end"
                  onClick={() => handleEditProduct(product.id)}
                  sx={{ mr: 2 }}
                >
                  <EditIcon />
                </IconButton>
                <IconButton
                  edge="end"
                  onClick={() => handleDeleteProduct(product.id)}
                >
                  <DeleteIcon />
                </IconButton>
              </ListItem>
            ))}
          </List>
        </Box>
      </Box>
    </Box>
  );
};

export default Inventory;
