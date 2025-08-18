import { z } from "zod";

export const ManageTaskBodySchema = z.object({
  title: z.string().min(1, "Title is required"),
  content: z.string().optional(),
  category: z.string().optional(),
  priority: z.number().optional(),
  deadline: z.string().nullish().optional()
});

export type ManageTaskBodyDto = z.infer<typeof ManageTaskBodySchema>;