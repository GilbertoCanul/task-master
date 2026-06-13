import { TaskForm } from './components/TaskForm';
import { TaskItem } from './components/TaskItem/TaskItem';
import { ThemeToggleButton } from './components/ThemeToggleButton';
import { Button } from './components/ui/Button';
import { FILTER_OPTIONS } from './constants/filters';
import { ThemeProvider } from './context/ThemeContext';
import { useTaskFilter } from './hooks/useTaskFilter';
import { useTasks } from './hooks/useTasks';

function App() {
  const { tasks, addTask, deleteTask, toggleTaskCompletion } = useTasks(); // Hook 1
  const { filter, setFilter, filteredTasks } = useTaskFilter(tasks); // Hook 2

  return (
    <ThemeProvider>
      <div className="min-h-screen bg-white dark:bg-gray-950 text-gray-900 dark:text-gray-100 transition-colors duration-300">

        <header className="p-4 flex justify-end">
          <ThemeToggleButton />
        </header>

        <main className="max-w-2xl mx-auto p-8 rounded-2xl">
          <h1 className="text-3xl font-bold text-center mb-8">Task Master</h1>

          {/* Componente de Filtros (podrías extraerlo a un componente también) */}
          <div className="flex gap-2 mb-6 justify-center">
            {Object.values(FILTER_OPTIONS).map((f) => (
              <Button
                key={f}
                onClick={() => setFilter(f)}
                className={filter === f ? 'bg-blue-600' : 'bg-gray-200'}>
                {f.charAt(0).toUpperCase() + f.slice(1)}
              </Button>
            ))}
          </div>

          <TaskForm onAddTask={addTask} />

          <ul className="mt-8 space-y-2">
            {filteredTasks.map((task) => (
              <TaskItem
                key={task.id}
                task={task}
                onDeleteTaskRequested={deleteTask}
                onToggleTaskCompletionRequested={toggleTaskCompletion} />
            ))}
          </ul>

        </main>
      </div>
    </ThemeProvider>
  );
}

export default App;