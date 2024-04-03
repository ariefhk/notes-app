import { Response } from "@/lib/api.response";
import { login } from "@/services/server/user/user.service";
import { NextRequest } from "next/server";
import { apiMiddleware } from "@/lib/api.middleware";

const loginRoute = async (req: NextRequest) => {
  const payload = await req.json();
  const data = await login(payload);

  return Response({
    message: "Berhasil Login!",
    status: 200,
    data,
  });
};

export const POST = apiMiddleware(loginRoute);
