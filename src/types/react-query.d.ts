import { AxiosError } from "axios";
import { UseMutationOptions, UseQueryOptions } from "@tanstack/react-query";

export type ApiServiceErr = any;
export type MutationOpt<Response, TVariables = unknown> = UseMutationOptions<Response, ApiServiceErr, TVariables, unknown>;
export type QueryOpt<Response, TVariables = unknown> = UseQueryOptions<Response, ApiServiceErr, TVariables, any[]>;

declare module "@tanstack/react-query" {
  interface Register {
    defaultError: AxiosError;
  }
}
