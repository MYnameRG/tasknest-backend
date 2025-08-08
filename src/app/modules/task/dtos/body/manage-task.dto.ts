import { z } from "zod";

export const ManageTaskBodySchema = z.object({
  title: z.string().min(1, "Title is required"),
  description: z.string().optional(),
});

export type ManageTaskBodyDto = z.infer<typeof ManageTaskBodySchema>;