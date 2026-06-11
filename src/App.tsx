import { useState, useEffect } from 'react';
import { TaskForm } from './components/TaskForm';
import type { Task } from './types/task.types';
import { TaskItem } from './components/TaskItem/TaskItem';

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

  return (
    // 'min-h-screen bg-gray-50' asegura que el fondo ocupe toda la pantalla
    <div className="min-h-screen bg-gray-50 py-8 px-4">
      {/* 'max-w-2xl mx-auto' centra el contenido y limita el ancho */}
      <main className="max-w-2xl mx-auto bg-white p-8 rounded-2xl shadow-sm border border-gray-200">

        <h1 className="text-3xl font-bold text-gray-900 mb-8 text-center">
          Task Master
        </h1>

        <TaskForm onAddTask={addTask} />

        <ul className="mt-8 space-y-2">
          {tasks.map((task) => (
            <TaskItem key={task.id} task={task} onDelete={deleteTask}
              onToggle={() => toggleTaskCompletion(task.id)} />
          ))}
        </ul>

      </main>
    </div>
  );
}

export default App;