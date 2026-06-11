import type { Task } from '../../types/task.types';
import { Button } from '../ui/Button';

interface TaskItemProps {
  task: Task;
  onDelete: (id: string) => void;
  onToggle: () => void;
}

export const TaskItem = ({ task, onDelete, onToggle }: TaskItemProps) => {
  return (
    <li className="flex justify-between items-center p-4 border-b border-gray-100 hover:bg-gray-50 transition-colors">
      <div 
        onClick={onToggle} 
        className="cursor-pointer flex flex-col flex-grow"
      >
        {/* Usamos template literals para aplicar clases condicionales */}
        <span className={`font-semibold ${task.completed ? 'line-through text-gray-400' : 'text-gray-800'}`}>
          {task.title}
        </span>
        {task.description && (
          <p className={`text-sm mt-1 ${task.completed ? 'text-gray-300' : 'text-gray-500'}`}>
            {task.description}
          </p>
        )}
      </div>
      
      <Button variant="danger" onClick={() => onDelete(task.id)} className="ml-4">
        Delete
      </Button>
    </li>
  );
};