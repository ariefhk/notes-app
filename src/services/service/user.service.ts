import {
  GetUserRequest,
  LoginUserRequest,
  LoginUserResponse,
  RegisterUserRequest,
  RegisterUserResponse,
} from "@/services/model/user-model";
import { IJWTPayload, LOGIN, REGISTER } from "@/services/validation/user-validation";
import { APIError } from "@/services/error/api-error";
import { decodeJwt, makeJwt } from "@/services/util/jwt";
import bcrypt from "bcrypt";
import prisma from "@/db/connection";
import { JWTExpired } from "jose/errors";

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
    throw new APIError(404, "Akun tidak ditemukan!");
  }

  const checkPassword = await bcrypt.compare(password, existedUser.password);

  if (!checkPassword) {
    throw new APIError(404, "Kesalahan email atau password");
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
    throw new APIError(404, "User sudah ada!");
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

export const getUser = async (session: GetUserRequest) => {
  try {
    if (!session) {
      throw new APIError(401, "Sesi tidak ditemukan!");
    }

    const data = (await decodeJwt(session)) as IJWTPayload;

    const existedUser = await prisma.user.findUnique({
      where: {
        email: data.email,
      },
      select: {
        name: true,
        email: true,
      },
    });

    if (!existedUser) {
      throw new APIError(401, "User tidak ditemukan!");
    }

    return existedUser;
  } catch (error) {
    if (error instanceof JWTExpired) {
      throw new APIError(401, "Sesi telah berakhir Anda wajib login Ulang!");
    }
    throw error;
  }
};
