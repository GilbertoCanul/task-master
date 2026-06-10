interface TaskItemProps {
  task: { id: number; text: string };
  onDelete: (id: number) => void;
}

export function TaskItem({ task, onDelete }: TaskItemProps) {
  return (
    <li>
      {task.text}
      <button onClick={() => onDelete(task.id)}>Eliminar</button>
    </li>
  );
}