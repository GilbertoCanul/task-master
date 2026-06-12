import { TaskForm } from './components/TaskForm';
import { TaskItem } from './components/TaskItem/TaskItem';
import { Button } from './components/ui/Button';
import { FILTER_OPTIONS } from './constants/filters';
import { useTaskFilter } from './hooks/useTaskFilter';
import { useTasks } from './hooks/useTasks';

function App() {
  const { tasks, addTask, deleteTask, toggleTaskCompletion } = useTasks(); // Hook 1
  const { filter, setFilter, filteredTasks } = useTaskFilter(tasks); // Hook 2

  return (
    // 'min-h-screen bg-gray-50' asegura que el fondo ocupe toda la pantalla
    <div className="min-h-screen bg-gray-50 py-8 px-4">
      <main className="max-w-2xl mx-auto bg-white p-8 rounded-2xl shadow-sm border border-gray-200">
        <h1 className="text-3xl font-bold text-gray-900 mb-8 text-center">Task Master</h1>

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
  );
}

export default App;