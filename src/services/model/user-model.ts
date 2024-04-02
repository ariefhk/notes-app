import { User } from "@prisma/client";

export type LoginUserRequest = {
  email: string;
  password: string;
};
