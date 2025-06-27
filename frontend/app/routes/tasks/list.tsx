import React, { useEffect, useState } from "react";
import { Box, Typography, Paper, CircularProgress, Chip, Button, Avatar, Stack, IconButton, Tooltip } from "@mui/material";
import { Add as AddIcon, Edit as EditIcon, Delete as DeleteIcon } from "@mui/icons-material";
import { fetchTasks, createTask, deleteTask, updateTask } from "../../services/tasks";
import type { Task } from "../../interfaces/task";
import { TASK_STATUS_LABELS } from "../../interfaces/task";
import TaskCreateModal from "../../components/tasks/TaskCreateModal";
import TaskUpdateModal from "../../components/tasks/TaskUpdateModal";
import TaskDeleteModal from "../../components/tasks/TaskDeleteModal";

export default function Home() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [openCreate, setOpenCreate] = useState(false);
  const [openUpdate, setOpenUpdate] = useState(false);
  const [selectedTask, setSelectedTask] = useState<Task | null>(null);
  const [openDelete, setOpenDelete] = useState(false);
  const [loadingDelete, setLoadingDelete] = useState(false);

  const handleOpenCreate = () => setOpenCreate(true);
  const handleCloseCreate = () => setOpenCreate(false);
  const handleCreateTask = (task: { title: string; description: string; status: keyof typeof TASK_STATUS_LABELS }) => {
    createTask(task)
      .then(newTask => setTasks(prev => [newTask, ...prev]))
      .catch(err => console.error('Error creating task:', err))
      .finally(() => handleCloseCreate());
  };
  const handleOpenUpdate = (task: Task) => {
    setSelectedTask(task);
    setOpenUpdate(true);
  };
  const handleCloseUpdate = () => {
    setOpenUpdate(false);
    setSelectedTask(null);
  };
  const handleUpdateTask = (data: { id: string; title: string; description: string; status: keyof typeof TASK_STATUS_LABELS }) => {
    updateTask(data.id, data)
      .then(newTask => setTasks(prev => prev.map(t => t.id === newTask.id ? newTask : t)))
      .catch(err => console.error('Error updating task:', err));
  };

  const handleOpenDelete = (task: Task) => {
    setSelectedTask(task);
    setOpenDelete(true);
  };

  const handleCloseDelete = () => {
    setOpenDelete(false);
    setSelectedTask(null);
  };

  const handleConfirmDelete = async () => {
    if (!selectedTask) return;
    setLoadingDelete(true);
    try {
      const ok = await deleteTask(selectedTask.id);
      if (ok) {
        setTasks(prev => prev.filter(t => t.id !== selectedTask.id));
      }
      setOpenDelete(false);
      setSelectedTask(null);
    } catch (err) {
      console.error('Error deleting task:', err);
    } finally {
      setLoadingDelete(false);
    }
  };

  const getInitial = (title: string) => title ? title[0].toUpperCase() : '?';
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string>("");

  useEffect(() => {
    let cancelled = false;
    setLoading(true);
    setError("");
    fetchTasks()
      .then((data: Task[]) => {
        if (!cancelled) setTasks(data);
      })
      .catch((err: any) => {
        if (!cancelled) setError(err?.response?.data?.detail || "Error cargando tareas");
      })
      .finally(() => {
        if (!cancelled) setLoading(false);
      });
  }, []);

  if (loading) return <Box display="flex" justifyContent="center" alignItems="center" minHeight="50vh"><CircularProgress /></Box>;
  if (error) return <Typography color="error" align="center">{error}</Typography>;

  const columns: Array<{ key: keyof typeof TASK_STATUS_LABELS; label: string; color: 'default' | 'warning' | 'success' }> = [
    { key: 'todo', label: TASK_STATUS_LABELS['todo'], color: 'default' },
    { key: 'in_progress', label: TASK_STATUS_LABELS['in_progress'], color: 'warning' },
    { key: 'done', label: TASK_STATUS_LABELS['done'], color: 'success' },
  ];
  const grouped: Record<keyof typeof TASK_STATUS_LABELS, Task[]> = {
    todo: tasks.filter(t => t.status === 'todo'),
    in_progress: tasks.filter(t => t.status === 'in_progress'),
    done: tasks.filter(t => t.status === 'done'),
  };


  return (
    <Box maxWidth={1200} mx="auto" mt={4}>
      <Stack direction="row" justifyContent="space-between" alignItems="center" mb={2}>
        <Typography variant="h4">Tablero de Tareas</Typography>
        <Button variant="contained" startIcon={<AddIcon />} sx={{ borderRadius: 2 }} onClick={handleOpenCreate}>
          Nueva Tarea
        </Button>
        <TaskCreateModal open={openCreate} onClose={handleCloseCreate} onCreate={handleCreateTask} />
      </Stack>
      <Box display="flex" gap={3} justifyContent="center">
        {columns.map(col => (
          <Box key={col.key} flex={1}>
            <Paper sx={{ p: 2, minHeight: 420, boxShadow: 6, borderRadius: 3 }}>
              <Stack direction="row" alignItems="center" justifyContent="center" mb={2} gap={1}>
                <Chip label={col.label} color={col.color} size="medium" sx={{ fontWeight: 600, fontSize: 16 }} />
              </Stack>
              {(Array.isArray(grouped[col.key]) && grouped[col.key].length === 0) ? (
                <Typography align="center" color="text.secondary">Sin tareas</Typography>
              ) : (
                (Array.isArray(grouped[col.key]) ? grouped[col.key] : []).map(task => (
                  <Paper key={task.id} sx={{ mb: 2, p: 2, display: 'flex', alignItems: 'center', gap: 2, boxShadow: 2, borderRadius: 2 }} elevation={2}>
                    <Avatar sx={{ bgcolor: '#1976d2', mr: 2 }}>{getInitial(task.title)}</Avatar>
                    <Box flex={1} minWidth={0}>
                      <Typography variant="subtitle1" fontWeight={600} noWrap>{task.title}</Typography>
                      <Typography variant="body2" color="text.secondary" mb={0.5} noWrap>{task.description}</Typography>
                      <Typography variant="caption" color="text.secondary">Creado: {task.created_at}</Typography>
                    </Box>
                    <Chip label={TASK_STATUS_LABELS[task.status]} color={col.color} size="small" sx={{ mx: 1 }} />
                    <Tooltip title="Editar">
                      <IconButton onClick={() => handleOpenUpdate(task)}>
                        <EditIcon fontSize="small" />
                      </IconButton>
                    </Tooltip>
                    <Tooltip title="Eliminar">
                      <IconButton size="small" color="error" onClick={() => handleOpenDelete(task)}>
                        <DeleteIcon fontSize="small" />
                      </IconButton>
                    </Tooltip>
                  </Paper>
                ))
              )}
            </Paper>
          </Box>
        ))}
      </Box>
    <TaskUpdateModal
      open={openUpdate}
      task={selectedTask}
      onClose={handleCloseUpdate}
      onUpdate={handleUpdateTask}
    />
    <TaskDeleteModal
      open={openDelete}
      taskTitle={selectedTask?.title}
      onClose={handleCloseDelete}
      onConfirm={handleConfirmDelete}
      loading={loadingDelete}
    />
    </Box>
  );
}
