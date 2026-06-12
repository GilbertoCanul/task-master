import { useState, useEffect } from 'react';
import { TaskForm } from './components/TaskForm';
import type { Task } from './types/task.types';
import { TaskItem } from './components/TaskItem/TaskItem';
import { Button } from './components/ui/Button';
import { FILTER_OPTIONS, type FilterType } from './constants/filters';

function App() {
  // 1. Lazy Initializer: Lee del storage al arrancar (Sincrónico)
  const [tasks, setTasks] = useState<Task[]>(() => {
    const savedTasks = localStorage.getItem('tasks');
    try {
      return savedTasks ? JSON.parse(savedTasks) : [];
    } catch (e) {
      return []; // Por si los datos en el storage están corruptos
    }
  });

  // Save tasks to LocalStorage whenever they change
  useEffect(() => {
    localStorage.setItem('tasks', JSON.stringify(tasks));
  }, [tasks]);

  const addTask = (data: Omit<Task, 'id' | 'completed'>) => {
    const newTask: Task = {
      ...data,
      id: crypto.randomUUID(), // Standard industry way to create unique IDs
      completed: false,
    };
    setTasks((prev) => [...prev, newTask]);
  };

  const deleteTask = (id: string) => {
    // We filter the array creating a NEW one without the deleted task
    setTasks((prev) => prev.filter((task) => task.id !== id));
  };

  const toggleTaskCompletion = (id: string) => {
    setTasks((prev) =>
      prev.map((task) =>
        task.id === id ? { ...task, completed: !task.completed } : task
      )
    );
  };

  const [filter, setFilter] = useState<FilterType>('all');

  const filteredTasks = tasks.filter((task) => {
    const filterMap = {
      [FILTER_OPTIONS.ALL]: true,
      [FILTER_OPTIONS.ACTIVE]: !task.completed,
      [FILTER_OPTIONS.COMPLETED]: task.completed,
    };

    return filterMap[filter];
  });

  return (
    // 'min-h-screen bg-gray-50' asegura que el fondo ocupe toda la pantalla
    <div className="min-h-screen bg-gray-50 py-8 px-4">
      { }
      <main className="max-w-2xl mx-auto bg-white p-8 rounded-2xl shadow-sm border border-gray-200">

        <h1 className="text-3xl font-bold text-gray-900 mb-8 text-center">
          Task Master
        </h1>

        <div className="flex gap-2 mb-6 justify-center">
          {Object.values(FILTER_OPTIONS).map((f) => (
            <Button
              key={f}
              onClick={() => setFilter(f)}
              // Aquí inyectamos el estilo dinámico según si es el filtro activo o no
              className={
                filter === f
                  ? 'bg-blue-600 text-white'
                  : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
              }
            >
              {f.charAt(0).toUpperCase() + f.slice(1)} {/* Capitalizamos el texto */}
            </Button>
          ))}
        </div>

        <TaskForm onAddTask={addTask} />

        <ul className="mt-8 space-y-2">
          {filteredTasks.map((task) => (
            <TaskItem key={task.id} task={task} onDelete={deleteTask} onToggle={() => toggleTaskCompletion(task.id)} />
          ))}
        </ul>

      </main>
    </div>
  );
}

export default App;