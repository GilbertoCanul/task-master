import { useState, useEffect } from 'react';
import type { Task } from '../types/task.types';

export const useTasks = () => {
  const [tasks, setTasks] = useState<Task[]>(() => {
    const savedTasks = localStorage.getItem('tasks');
    
    try {
      return savedTasks ? JSON.parse(savedTasks) : [];
    } catch { return []; }
  });

  useEffect(() => {
    localStorage.setItem('tasks', JSON.stringify(tasks));
  }, [tasks]);

  const addTask = (data: Omit<Task, 'id' | 'completed'>) => {
    const newTask: Task = { ...data, id: crypto.randomUUID(), completed: false };
    setTasks((prev) => [...prev, newTask]);
  };

  const deleteTask = (id: string) => setTasks((prev) => prev.filter((t) => t.id !== id));
  
  const toggleTaskCompletion = (id: string) => setTasks((prev) => 
    prev.map((t) => t.id === id ? { ...t, completed: !t.completed } : t)
  );

  return { tasks, addTask, deleteTask, toggleTaskCompletion };
};