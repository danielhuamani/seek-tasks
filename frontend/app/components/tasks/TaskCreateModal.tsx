import React, { useState } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  TextField,
  MenuItem,
  Stack,
} from "@mui/material";
import { TASK_STATUS_LABELS } from "../../interfaces/task";

interface TaskCreateModalProps {
  open: boolean;
  onClose: () => void;
  onCreate: (task: { title: string; description: string; status: keyof typeof TASK_STATUS_LABELS }) => void;
}

export default function TaskCreateModal({ open, onClose, onCreate }: TaskCreateModalProps) {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [status, setStatus] = useState<keyof typeof TASK_STATUS_LABELS>("todo");
  const [loading, setLoading] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    onCreate({ title, description, status });
    setLoading(false);
    setTitle("");
    setDescription("");
    setStatus("todo");
    onClose();
  };

  return (
    <Dialog open={open} onClose={onClose} maxWidth="xs" fullWidth>
      <DialogTitle>Nueva Tarea</DialogTitle>
      <form onSubmit={handleSubmit}>
        <DialogContent>
          <Stack spacing={2}>
            <TextField
              autoFocus
              label="Título"
              value={title}
              onChange={e => setTitle(e.target.value)}
              required
              fullWidth
            />
            <TextField
              label="Descripción"
              value={description}
              onChange={e => setDescription(e.target.value)}
              multiline
              minRows={2}
              fullWidth
            />
            <TextField
              select
              label="Estado"
              value={status}
              onChange={e => setStatus(e.target.value as keyof typeof TASK_STATUS_LABELS)}
              fullWidth
            >
              {Object.entries(TASK_STATUS_LABELS).map(([key, label]) => (
                <MenuItem key={key} value={key}>{label}</MenuItem>
              ))}
            </TextField>
          </Stack>
        </DialogContent>
        <DialogActions>
          <Button onClick={onClose} color="secondary">Cancelar</Button>
          <Button type="submit" variant="contained" disabled={loading}>Crear</Button>
        </DialogActions>
      </form>
    </Dialog>
  );
}
