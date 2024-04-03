export type LoginUserRequest = {
  email: string;
  password: string;
};

export type LoginUserResponse = {
  name: string;
  token: string | null;
  email: string;
};

export type RegisterUserRequest = {
  name: string;
  email: string;
  password: string;
};

export type RegisterUserResponse = {
  name: string;
  email: string;
};
