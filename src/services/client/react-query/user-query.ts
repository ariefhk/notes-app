import { RegisterUserResponse, RegisterUserRequest } from "@/services/model/user-model";
import { ApiError } from "next/dist/server/api-utils";
import { clientApiInstance } from "../client-api-instance";

import { useMutation } from "@tanstack/react-query";
import { MutationOpt } from "@/types/react-query";

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

      return response.data.data;
    },
    ...opt,
  });
};
