import React, { useState, useEffect } from 'react';
import { Dialog, DialogTitle, DialogContent, DialogActions, Button, TextField, MenuItem } from '@mui/material';
import { TASK_STATUS_LABELS } from '../../interfaces/task';

interface Task {
  id: string;
  title: string;
  description: string;
  status: keyof typeof TASK_STATUS_LABELS;
}

interface TaskUpdateModalProps {
  open: boolean;
  task: Task | null;
  onClose: () => void;
  onUpdate: (updatedTask: Task) => void;
}

import { updateTask } from '../../services/tasks';

const TaskUpdateModal: React.FC<TaskUpdateModalProps> = ({ open, task, onClose, onUpdate }) => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [status, setStatus] = useState<keyof typeof TASK_STATUS_LABELS>('');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (task) {
      setTitle(task.title);
      setDescription(task.description);
      setStatus(task.status);
    }
  }, [task]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!task) return;
    onUpdate({
      id: task.id,
      title,
      description,
      status,
    });
    onClose();
  };

  return (
    <Dialog open={open} onClose={onClose} fullWidth maxWidth="sm">
      <DialogTitle>Editar Tarea</DialogTitle>
      <form onSubmit={handleSubmit}>
        <DialogContent>
          <TextField
            label="Título"
            value={title}
            onChange={e => setTitle(e.target.value)}
            required
            fullWidth
            margin="normal"
          />
          <TextField
            label="Descripción"
            value={description}
            onChange={e => setDescription(e.target.value)}
            multiline
            minRows={2}
            fullWidth
            margin="normal"
          />
          <TextField
            select
            label="Estado"
            value={status}
            onChange={e => setStatus(e.target.value as keyof typeof TASK_STATUS_LABELS)}
            fullWidth
            margin="normal"
          >
            {Object.entries(TASK_STATUS_LABELS).map(([key, label]) => (
              <MenuItem key={key} value={key}>{label}</MenuItem>
            ))}
          </TextField>
        </DialogContent>
        <DialogActions>
          <Button onClick={onClose}>Cancelar</Button>
          <Button type="submit" variant="contained" color="primary">Actualizar</Button>
        </DialogActions>
      </form>
    </Dialog>
  );
};

export default TaskUpdateModal;
