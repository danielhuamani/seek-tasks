import React, { useState } from "react";
import { Box, Button, TextField, Typography, Paper } from "@mui/material";
import { NavLink } from "react-router";
import { loginApi } from "../services/auth";
import { useAuth } from "../auth/AuthContext";
import { useNavigate } from "react-router";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);
    if (!email || !password) {
      setError("Usuario y contraseña requeridos");
      setLoading(false);
      return;
    }
    try {
      const data = await loginApi(email, password);
      if (data && data.token) {
        login(data.token);
        navigate("/", { replace: true });
      }
      setLoading(false);
    } catch (err: any) {
      setError(err.message || "Error de autenticación");
      setLoading(false);
    }
  }


  return (
    <Box display="flex" justifyContent="center" alignItems="center" minHeight="100vh" bgcolor="#f5f5f5">
      <Paper elevation={3} sx={{ p: 4, minWidth: 320 }}>
        <Typography variant="h5" mb={2} align="center">
          Iniciar Sesión
        </Typography>
        <form onSubmit={handleSubmit}>
          <TextField
            label="Email"
            variant="outlined"
            type="email"
            fullWidth
            margin="normal"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            autoFocus
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
            <Typography color="error" variant="body2" mb={1}>
              {error}
            </Typography>
          )}
          <Button type="submit" variant="contained" color="primary" fullWidth sx={{ mt: 2 }} disabled={loading}>
            {loading ? "Entrando..." : "Entrar"}
          </Button>
        </form>
          <Typography align="center" mt={2}>
            ¿No tienes cuenta?{' '}
            <NavLink to="/register" style={{ color: '#1976d2', textDecoration: 'none', fontWeight: 500 }}>
              Regístrate
            </NavLink>
          </Typography>
        </Paper>
      </Box>
    );
}
