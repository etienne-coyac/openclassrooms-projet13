import * as z from "zod";

export const userSchema = z.object({
  email: z.string().email(),
  firstName: z.string(),
  lastName: z.string(),
  id: z.string()
});
export const userCreateSchema = userSchema.extend({
  password: z.string()
});
