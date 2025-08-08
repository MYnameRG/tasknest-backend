import { z } from "zod";

export const GetTaskParamsSchema = z.object({
  id: z.string().min(1, "Task ID is required"),
});

export type GetTaskParamsDto = z.infer<typeof GetTaskParamsSchema>;