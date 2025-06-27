import axios from 'axios'

const API_BASE = import.meta.env.VITE_API_URL || 'http://localhost:8000'

export async function loginApi(email: string, password: string) {
  try {
    const res = await axios.post(`${API_BASE}/login`, { email, password })
    return res.data
  } catch (err: any) {
    throw new Error(err.response?.data?.detail || 'Credenciales inválidas')
  }
}

export async function registerApi(
  firstName: string,
  lastName: string,
  email: string,
  password: string
) {
  try {
    const res = await axios.post(`${API_BASE}/register`, {
      first_name: firstName,
      last_name: lastName,
      email,
      password,
    })
    return res.data
  } catch (err: any) {
    throw new Error(err.response?.data?.detail || 'Error al registrar usuario')
  }
}
