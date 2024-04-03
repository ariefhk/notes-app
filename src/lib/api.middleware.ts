import { APIError } from "@/services/error/api-error";
import { NextResponse, NextRequest } from "next/server";
import { ResponseError } from "./api.response";

export const apiMiddleware =
  (...handlers: Function[]) =>
  async (req: NextRequest, res: NextResponse) => {
    try {
      for (const handler of handlers) {
        await handler(req, res);
      }
    } catch (error) {
      if (error instanceof APIError) {
        return ResponseError({
          message: error.message,
          status: error.code,
          data: !!error?.errorData ? error.errorData : null,
        });
      } else {
        return ResponseError({
          message: "Server Error!",
          status: 500,
          data: null,
        });
      }
    }
  };
