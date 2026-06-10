import './App.css'
import { useEffect, useState } from 'react';
import { TaskItem } from './TaskItem';

// Definimos la estructura de nuestra Tarea
interface Task {
  id: number;
  text: string;
}

function App() {
  const [tasks, setTasks] = useState<Task[]>(() => {
    // Esta función solo se ejecuta en el primer renderizado
    const savedTasks = localStorage.getItem('my-tasks');
    return savedTasks ? JSON.parse(savedTasks) : [];
  });
  const [inputValue, setInputValue] = useState('');

  const addTask = () => {
    if (inputValue.trim() === '') return;

    // Creamos una nueva tarea
    const newTask: Task = { id: Date.now(), text: inputValue };

    // Actualizamos el estado (el spread operator ... nos ayuda a mantener lo anterior)
    setTasks([...tasks, newTask]);
    setInputValue(''); // Limpiamos el input
  };

  // Esta función va dentro de tu componente App, al mismo nivel que addTask
  const deleteTask = (id: number) => {
    // Creamos un nuevo arreglo excluyendo la tarea con el ID dado
    setTasks(tasks.filter((task) => task.id !== id));
  };

  // 1. Guardar cada vez que 'tasks' cambia
  useEffect(() => {
    localStorage.setItem('my-tasks', JSON.stringify(tasks));
  }, [tasks]);

  // 2. Cargar una sola vez al iniciar la App
  useEffect(() => {
    const savedTasks = localStorage.getItem('my-tasks');
    if (savedTasks) {
      setTasks(JSON.parse(savedTasks));
    }
  }, []);

  return (
    <div>
      <h1>Task Master</h1>
      <input
        value={inputValue}
        onChange={(e) => setInputValue(e.target.value)}
      />
      <button onClick={addTask}>Agregar</button>

      <ul>
        {tasks.map((task) => (
          <li key={task.id}>
            <TaskItem key={task.id} task={task} onDelete={deleteTask} />
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;