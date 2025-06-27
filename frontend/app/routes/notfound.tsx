import { Box, Typography } from '@mui/material';

export default function NotFound() {
  return (
    <Box display="flex" justifyContent="center" alignItems="center" minHeight="100vh">
      <Typography variant="h4" color="error" align="center">
        404 - Página no encontrada
      </Typography>
    </Box>
  );
}
