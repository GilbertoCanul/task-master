import type { Task } from '../../types/task.types';
import { Button } from '../ui/Button';

interface TaskItemProps {
  task: Task;
  onDelete: (id: string) => void;
}

export const TaskItem = ({ task, onDelete }: TaskItemProps) => {
  return (
    <li className="flex justify-between items-center p-4 border-b border-gray-100 hover:bg-gray-50 transition-colors">
      <div className="flex flex-col">
        <span className="font-semibold text-gray-800">{task.title}</span>
        {task.description && (
          <p className="text-sm text-gray-500 mt-1">{task.description}</p>
        )}
      </div>
      
      <Button 
        variant="danger" 
        onClick={() => onDelete(task.id)} 
        className="text-sm"
      >
        Delete
      </Button>
    </li>
  );
};