import { z } from 'zod';

// Define the validation schema for a Task
export const TaskSchema = z.object({
  title: z
    .string()
    .min(3, { message: "Title must be at least 3 characters long" })
    .max(50, { message: "Title cannot exceed 50 characters" }),
  description: z
    .string()
    .max(200, { message: "Description cannot exceed 200 characters" })
    .optional(),
});

// Export the inferred type for TypeScript usage
export type TaskFormData = z.infer<typeof TaskSchema>;