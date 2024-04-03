import { APIError } from "@/services/error/api-error";
import { NextResponse, NextRequest } from "next/server";
import { Response, ResponseError } from "./api.response";

export const apiMiddleware = (handler: Function) => async (req: NextRequest, res: NextResponse) => {
  try {
    // for (const handler of handlers) {
    //   await handler(req, res);
    // }
    return handler(req, res);
  } catch (error) {
    if (error instanceof APIError) {
      return Response({
        message: error.message,
        status: error.code,
      });
    } else {
      return Response({
        message: "Server Error!",
        status: 500,
        data: null,
      });
    }
  }
};
