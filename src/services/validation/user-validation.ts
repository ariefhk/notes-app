import { z, ZodType } from "zod";

export const LOGIN: ZodType = z.object({
  email: z.string().email(),
  password: z.string().min(1),
});

export const REGISTER: ZodType = z.object({
  name: z.string().min(1),
  email: z.string().email(),
  password: z.string().min(1),
});
