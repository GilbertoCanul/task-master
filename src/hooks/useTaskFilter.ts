import { useState, useMemo } from 'react';
import { FILTER_OPTIONS } from '../constants/filters';
import type { FilterType } from '../constants/filters';
import type { Task } from '../types/task.types';

export const useTaskFilter = (tasks: Task[]) => {
  // 1. Estado para saber qué filtro está activo
  const [filter, setFilter] = useState<FilterType>(FILTER_OPTIONS.ALL);

  // 2. Lógica para filtrar las tareas
  // useMemo hace que este cálculo solo ocurra cuando 'tasks' o 'filter' cambian
  const filteredTasks = useMemo(() => {
    switch (filter) {
      case FILTER_OPTIONS.ACTIVE:
        return tasks.filter((task) => !task.completed);
        
      case FILTER_OPTIONS.COMPLETED:
        return tasks.filter((task) => task.completed);
        
      default: // FILTER_OPTIONS.ALL
        return tasks;
    }
  }, [tasks, filter]); // Dependencias: si una de estas cambia, el filtro se recalcula

  return { filter, setFilter, filteredTasks };
};