import {
  Box,
  Button,
  Typography,
  List,
  ListItem,
  ListItemText,
  Paper,
} from "@mui/material";
import { tokens } from "../../../../theme";
import { useState } from "react";
import useMediaQuery from "@mui/material/useMediaQuery";
import Header from "../../Header";

const Movimientos = () => {
  const isNonMobile = useMediaQuery("(min-width:600px)");

  // Lista de movimientos (esto podría ser un array de objetos en tu estado)
  const [movimientos, setMovimientos] = useState([
    { id: 1, fecha: "2025-01-20", descripcion: "Movimiento 1" },
    { id: 2, fecha: "2025-01-21", descripcion: "Movimiento 2" },
    { id: 3, fecha: "2025-01-22", descripcion: "Movimiento 3" },
  ]);

  const handleEliminar = (id) => {
    setMovimientos(movimientos.filter((movimiento) => movimiento.id !== id));
  };

  return (
    <Box m="20px">
      <Header
        title="HISTORIAL DE MOVIMIENTOS"
        subtitle="Lista de movimientos realizados"
      />

      <Paper sx={{ padding: "20px", boxShadow: 3 }}>
        <Typography variant="h6" gutterBottom>
          Movimientos Registrados
        </Typography>

        <List>
          {movimientos.map((movimiento) => (
            <ListItem key={movimiento.id} sx={{ marginBottom: "10px" }}>
              <ListItemText
                primary={`Fecha: ${movimiento.fecha}`}
                secondary={`Descripción: ${movimiento.descripcion}`}
              />
              <Button
                variant="outlined"
                color="secondary"
                onClick={() => handleEliminar(movimiento.id)}
              >
                Eliminar
              </Button>
            </ListItem>
          ))}
        </List>

        <Box display="flex" justifyContent="center" mt="20px">
          <Button
            variant="contained"
            color="primary"
            onClick={() => console.log("Agregar movimiento")}
          >
            Agregar Movimiento
          </Button>
        </Box>
      </Paper>
    </Box>
  );
};

export default Movimientos;
