import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { TaskSchema } from '../../schemas/task.schema';
import type { TaskFormData } from '../../schemas/task.schema';
import { Button } from '../ui/Button';

interface TaskFormProps {
  onAddTask: (data: TaskFormData) => void;
}

export const TaskForm = ({ onAddTask }: TaskFormProps) => {
  // Initialize useForm with Zod resolver for automatic validation
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors }
  } = useForm<TaskFormData>({
    resolver: zodResolver(TaskSchema)
  });

  const onSubmit = (data: TaskFormData) => {
    onAddTask(data);
    reset(); // Clear the form after successful submission
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4 border-b border-gray-100 pb-8">
      {/* Title Field */}
      <div className="flex flex-col gap-1.5">
        <label className="text-sm font-medium text-gray-700" htmlFor="title">Title</label>
        <input
          {...register("title")}
          id="title"
          placeholder="What needs to be done?"
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none transition-all"
        />
        {/* Validation error for title */}
        {errors.title && <p className="text-sm text-red-500">{errors.title.message}</p>}
      </div>

      {/* Description Field */}
      <div className="flex flex-col gap-1.5">
        <label className="text-sm font-medium text-gray-700" htmlFor="description">Description</label>
        <textarea
          {...register("description")}
          id="description"
          placeholder="Add details (optional)"
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none transition-all"
        />
        {/* Validation error for description */}
        {errors.description && <p className="text-sm text-red-500">{errors.description.message}</p>}
      </div>

      <Button type="submit" className="w-full">
        Create Task
      </Button>
    </form>
  );
};