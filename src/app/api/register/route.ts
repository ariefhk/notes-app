import { Response, ResponseError } from "@/lib/api.response";
import { register } from "@/services/service/user.service";
import { NextRequest } from "next/server";
import { apiMiddleware } from "@/lib/api.middleware";
import { APIError } from "@/services/error/api-error";

export const POST = async (req: NextRequest) => {
  try {
    const payload = await req.json();

    const data = await register(payload);

    return Response({
      message: "Berhasil Registrasi!",
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

// export const POST = apiMiddleware(registerRoute);
