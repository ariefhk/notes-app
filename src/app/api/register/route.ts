import { Response } from "@/lib/api.response";
import { register } from "@/services/server/user/user.service";
import { NextRequest } from "next/server";
import { apiMiddleware } from "@/lib/api.middleware";

const registerRoute = async (req: NextRequest) => {
  const payload = await req.json();
  const data = await register(payload);

  return Response({
    message: "Berhasil Registrasi!",
    status: 200,
    data,
  });
};

export const POST = apiMiddleware(registerRoute);
