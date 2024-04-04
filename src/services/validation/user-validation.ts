import { JWTPayload } from "jose";
import { z } from "zod";

export const LOGIN = z.object({
  email: z.string().email({ message: "Format Email harus benar!" }),
  password: z.string().min(5, { message: "Minimum password 5 Karakter!" }),
});

export const REGISTER = z.object({
  name: z.string().min(1, { message: "Nama tidak bole kosong!" }),
  email: z.string().email({ message: "Format Email harus benar!" }),
  password: z.string().min(5, { message: "Minimum password 5 Karakter!" }),
});

export class UserValidation {
  static readonly GETUSER = z.string().optional();
}

export interface IJWTPayload extends JWTPayload {
  name: string;
  email: string;
}
