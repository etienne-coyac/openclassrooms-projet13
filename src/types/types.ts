import * as z from "zod";
import { userCreateSchema, userSchema } from "./schemas/schemas";

export type User = z.infer<typeof userSchema>;
export type UserCreate = z.infer<typeof userCreateSchema>;

export interface LoginPayload {
  email: string;
  password: string;
}

export interface UserUpdatePayload {
  firstName: string;
  lastName: string;
}
