import axios from 'axios'
import { authStore } from '../auth/authStore'
import type { Task } from '../interfaces/task'
import { TASK_STATUS_LABELS } from '../interfaces/task'

const API_BASE = import.meta.env.VITE_API_URL

export const api = axios.create({
  baseURL: API_BASE,
})

api.interceptors.request.use((config) => {
  const token = authStore.getToken()
  if (token) {
    config.headers = config.headers || {}
    config.headers['Authorization'] = `Bearer ${token}`
  }
  return config
})

export async function fetchTasks(): Promise<Task[]> {
  const res = await api.get<Task[]>('/tasks')
  return res.data
}

export async function createTask(task: {
  title: string
  description: string
  status: keyof typeof TASK_STATUS_LABELS
}): Promise<Task> {
  const res = await api.post<Task>('/tasks', task)
  return res.data
}

export async function updateTask(
  id: string,
  data: {
    title: string
    description: string
    status: keyof typeof TASK_STATUS_LABELS
  }
): Promise<Task> {
  const res = await api.put<Task>(`/tasks/${id}`, data)
  return res.data
}

export async function deleteTask(id: string): Promise<boolean> {
  const res = await api.delete<boolean>(`/tasks/${id}`)
  return res.data
}
