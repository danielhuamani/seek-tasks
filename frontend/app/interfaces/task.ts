export interface TaskStatusLabels {
  readonly todo: string
  readonly in_progress: string
  readonly done: string
}

export interface Task {
  id: string
  title: string
  description: string
  status: keyof TaskStatusLabels
  created_at: string
}

export const TASK_STATUS_LABELS: TaskStatusLabels = {
  todo: 'Por Hacer',
  in_progress: 'Haciendo',
  done: 'Hecho',
}
