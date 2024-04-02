import { z, ZodType } from "zod";

export const LOGIN: ZodType = z.object({
  email: z.string().email(),
  password: z.string().min(1),
});
