import { z } from "zod";
// import { GetUserBodySchema } from "./get-user.dto"

export const AddUserBodySchema = z.object({
  name: z.string().min(1, "Name is required"),
  email: z.string().email("Invalid Email").min(1, "Email is required"),
  password: z.string().min(6, "Password is required")
});

export type AddUserBodyDto = z.infer<typeof AddUserBodySchema>;
