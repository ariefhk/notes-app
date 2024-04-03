import { Response, ResponseError } from "@/lib/api.response";
import { login } from "@/services/server/user/user.service";
import { NextRequest, NextResponse } from "next/server";
import { apiMiddleware } from "@/lib/api.middleware";
import { APIError } from "@/services/error/api-error";

export const POST = async (req: NextRequest) => {
  try {
    const payload = await req.json();
    const data = await login(payload);

    return Response({
      message: "Berhasil Login!",
      status: 200,
      data,
    });
  } catch (error) {
    if (error instanceof APIError) {
      return ResponseError({
        message: error.message,
        status: error.code,
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

// export const POST = apiMiddleware(loginRoute);
