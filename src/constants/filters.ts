export const FILTER_OPTIONS = {
  ALL: 'all',
  ACTIVE: 'active',
  COMPLETED: 'completed',
} as const; // 'as const' hace que los valores sean literales inmutables

// Creamos un tipo basado en esos valores
export type FilterType = typeof FILTER_OPTIONS[keyof typeof FILTER_OPTIONS];