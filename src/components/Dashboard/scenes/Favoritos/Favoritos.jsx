import React from "react";
import {
  Box,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
  Paper,
} from "@mui/material";
import { mockDataInventario } from "../../data/mockData"; // Asegúrate de que los datos están importados correctamente.
import { tokens } from "../../../../theme";
import { useContext } from "react";
import { useTheme } from "@mui/material/styles"; // Agregar esta importación

const FavoriteProductsPage = ({ products = mockDataInventario }) => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  console.log("Colores del tema:", colors); // Depuración para ver los colores

  // Filtrar productos favoritos
  const favoriteProducts = products.filter((product) => product.isFavorite);

  console.log("Productos favoritos:", favoriteProducts); // Verifica qué productos están siendo filtrados

  return (
    <Box m={2}>
      <Typography variant="h4" gutterBottom>
        Productos Favoritos
      </Typography>

      {/* Tabla de productos favoritos */}
      <TableContainer
        component={Paper}
        sx={{ maxHeight: 400, backgroundColor: colors.blueAccent[700] }}
      >
        <Table aria-label="productos favoritos">
          <TableHead>
            <TableRow>
              <TableCell>ID</TableCell>
              <TableCell>Nombre del Producto</TableCell>
              <TableCell>Categoría</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {favoriteProducts.length > 0 ? (
              favoriteProducts.map((product) => (
                <TableRow
                  key={product.id}
                  sx={{
                    backgroundColor: colors.primary[600],
                    "&:hover": {
                      backgroundColor: colors.grey[600],
                      cursor: "pointer",
                    },
                  }}
                >
                  <TableCell>{product.id}</TableCell>
                  <TableCell>{product.nombreProducto}</TableCell>
                  <TableCell>{product.categoria}</TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={3}>
                  <Typography
                    variant="body1"
                    color="textSecondary"
                    align="center"
                  >
                    No hay productos favoritos.
                  </Typography>
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
};

export default FavoriteProductsPage;
