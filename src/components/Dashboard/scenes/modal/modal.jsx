import React from "react";
import { Modal, Box, Typography, IconButton } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import { useTheme } from "@mui/material/styles";
import { tokens } from "../../../../theme";
import { Alert } from "@mui/material";

const ResponsiveModal = ({
  open,
  handleClose,
  children,
  title,
  alertMessage,
  alertSeverity,
}) => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  return (
    <Modal
      open={open}
      onClose={handleClose}
      aria-labelledby="modal-title"
      aria-describedby="modal-description"
    >
      <Box
        sx={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          backgroundColor: colors?.background?.default || colors.grey[900], // valor predeterminado en caso de que no exista 'background'
          borderRadius: "10px",
          borderRadius: "10px",
          padding: "20px",
          width: "90%", // 90% del ancho en pantallas pequeñas
          maxWidth: "500px", // Ancho máximo para pantallas grandes
        }}
      >
        <Box display="flex" justifyContent="space-between" alignItems="center">
          <Typography
            id="modal-title"
            variant="h6"
            component="h2"
            color={colors.primary[500]}
          >
            {title}
          </Typography>
          <IconButton onClick={handleClose} sx={{ color: colors.grey[500] }}>
            <CloseIcon />
          </IconButton>
        </Box>
        {/* Si alertMessage está presente, muestra la alerta */}
        {alertMessage && (
          <Alert severity={alertSeverity} sx={{ marginBottom: "10px" }}>
            {alertMessage}
          </Alert>
        )}
        <Box id="modal-description">
          {children} {/* Aquí se renderiza el contenido dinámico */}
        </Box>
      </Box>
    </Modal>
  );
};

export default ResponsiveModal;
