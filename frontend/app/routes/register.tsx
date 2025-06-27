import React, { useState } from "react";
import { Box, Button, TextField, Typography, Paper } from "@mui/material";
import { NavLink } from "react-router";
import { registerApi } from "../services/auth";
import { useNavigate } from "react-router";

export default function Register() {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);
    if (!firstName || !lastName || !email || !password) {
      setError("Todos los campos son obligatorios");
      setLoading(false);
      return;
    }
    try {
      await registerApi(firstName, lastName, email, password);
      setSuccessMessage("Registro exitoso. Redirigiendo al login...");
      setLoading(false);
      setTimeout(() => {
        navigate('/login', { replace: true });
      }, 1500);
    } catch (err: any) {
      setError(err.message || "Error al registrar usuario");
      setLoading(false);
    }
  };

  return (
    <Box display="flex" justifyContent="center" alignItems="center" minHeight="100vh" bgcolor="#f5f5f5">
      <Paper elevation={3} sx={{ p: 4, minWidth: 320 }}>
        <Typography variant="h5" mb={2} align="center">
          Registrarse
        </Typography>
        <form onSubmit={handleSubmit}>
          <TextField
            label="Nombre"
            variant="outlined"
            fullWidth
            margin="normal"
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
            autoFocus
          />
          <TextField
            label="Apellido"
            variant="outlined"
            fullWidth
            margin="normal"
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
          />
          <TextField
            label="Email"
            type="email"
            variant="outlined"
            fullWidth
            margin="normal"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <TextField
            label="Contraseña"
            type="password"
            variant="outlined"
            fullWidth
            margin="normal"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          {error && (
            <Typography color="error" align="center" mb={2}>
              {error}
            </Typography>
          )}
          {successMessage && (
            <Typography color="success.main" align="center" mb={2}>
              {successMessage}
            </Typography>
          )}
          <Button type="submit" variant="contained" color="primary" fullWidth sx={{ mt: 2 }} disabled={loading}>
            {loading ? "Registrando..." : "Registrarse"}
          </Button>
        </form>
        <Typography align="center" mt={2}>
            ¿tienes cuenta?{' '}
            <NavLink to="/login" style={{ color: '#1976d2', textDecoration: 'none', fontWeight: 500 }}>
              Login
            </NavLink>
          </Typography>
      </Paper>
    </Box>
  );
}
