import { z } from "zod";

export const GetUserBodySchema = z.object({
  email: z.email("Invalid Email").min(1, "Email is required"),
  password: z.string().min(6, "Password is required")
});

export type GetUserBodyDto = z.infer<typeof GetUserBodySchema>;