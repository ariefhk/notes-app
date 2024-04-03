import { LoginUserRequest, LoginUserResponse, RegisterUserRequest, RegisterUserResponse } from "@/services/model/user-model";
import { LOGIN, REGISTER } from "@/services/validation/user-validation";
import { APIError } from "@/services/error/api-error";
import { makeJwt } from "@/services/util/jwt";
import bcrypt from "bcrypt";
import prisma from "@/db/connection";

export const login = async (request: LoginUserRequest): Promise<LoginUserResponse> => {
  const validation = LOGIN.safeParse(request);

  if (!validation.success) {
    const { errors } = validation.error;

    throw new APIError(400, "Bad Request", errors);
  }

  const { email, password } = validation.data;

  // get exist user
  const existedUser = await prisma.user.findUnique({
    where: {
      email,
    },
  });

  if (!existedUser) {
    throw new APIError(404, "User Not Found!");
  }

  const checkPassword = await bcrypt.compare(password, existedUser.password);

  if (!checkPassword) {
    throw new APIError(404, "Incorrect email or password");
  }

  // creating jwt token
  const token = await makeJwt(
    {
      name: existedUser.name,
      email: existedUser.email,
    },
    "6h"
  );

  return prisma.user.update({
    where: {
      email: existedUser.email,
    },
    data: {
      token,
    },
    select: {
      name: true,
      email: true,
      token: true,
    },
  });
};

export const register = async (request: RegisterUserRequest): Promise<RegisterUserResponse> => {
  const validation = REGISTER.safeParse(request);

  if (!validation.success) {
    const { errors } = validation.error;

    throw new APIError(400, "Bad Request", errors);
  }

  const { name, email, password } = validation.data;

  const existedUser = await prisma.user.findUnique({
    where: {
      email,
    },
  });

  if (existedUser) {
    throw new APIError(404, "User already exist!");
  }

  // encypt password
  const encryptedPassword = await bcrypt.hash(password, 10);

  // creating new user
  return prisma.user.create({
    data: {
      name,
      email,
      password: encryptedPassword,
    },
    select: {
      name: true,
      email: true,
    },
  });
};
