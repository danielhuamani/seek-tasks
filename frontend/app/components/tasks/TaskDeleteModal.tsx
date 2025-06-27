import React from 'react';
import { Dialog, DialogTitle, DialogContent, DialogActions, Button, Typography } from '@mui/material';

interface TaskDeleteModalProps {
  open: boolean;
  taskTitle?: string;
  onClose: () => void;
  onConfirm: () => void;
  loading?: boolean;
}

const TaskDeleteModal: React.FC<TaskDeleteModalProps> = ({ open, taskTitle, onClose, onConfirm, loading }) => {
  return (
    <Dialog open={open} onClose={onClose} maxWidth="xs" fullWidth>
      <DialogTitle>Eliminar tarea</DialogTitle>
      <DialogContent>
        <Typography>
          ¿Estás seguro que deseas eliminar la tarea
          {taskTitle ? <b> "{taskTitle}"</b> : ''}?
          Esta acción no se puede deshacer.
        </Typography>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} disabled={loading}>Cancelar</Button>
        <Button onClick={onConfirm} color="error" variant="contained" disabled={loading}>
          {loading ? 'Eliminando...' : 'Eliminar'}
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default TaskDeleteModal;
