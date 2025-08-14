import { z } from "zod";

export const ManageTaskBodySchema = z.object({
  title: z.string().min(1, "Title is required"),
  content: z.string().optional(),
  category: z.string().min(1, "Category is required"),
  priority: z.number().min(1, "Priority is required"),
  deadline: z.date().optional()
});

export type ManageTaskBodyDto = z.infer<typeof ManageTaskBodySchema>;