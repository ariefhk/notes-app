import { MutateOptions, UseMutationOptions, useMutation } from "@tanstack/react-query";
import { RegisterUserResponse, RegisterUserRequest } from "@/services/model/user-model";
import { ApiError } from "next/dist/server/api-utils";
import { clientApiInstance } from "../client-api-instance";

export type ApiServiceErr = any;
export type MutationOpt<Response, TVariables = unknown> = UseMutationOptions<Response, ApiServiceErr, TVariables, unknown>;

export const registation = async (data: RegisterUserRequest) => {
  return typeof data === "undefined"
    ? Promise.reject(new ApiError(400, "Input not Valid!"))
    : clientApiInstance.post("/register", data).then((response) => response.data.data);
};

export const useRegistation = (opt?: MutationOpt<RegisterUserResponse>) => {
  return useMutation({
    mutationKey: ["register_user"],
    mutationFn: async (data: RegisterUserRequest) => {
      const response = await clientApiInstance.post("/register", data);
      // console.log(response);

      return response.data.data;
    },
    ...opt,
  });
};
