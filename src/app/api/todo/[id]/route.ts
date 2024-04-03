import { NextRequest } from "next/server";
import { Response } from "@/lib/api.response";
import { apiMiddleware } from "@/lib/api.middleware";

type Params = {
  params: {
    id: string;
  };
};

const getTodoRoute = async (request: NextRequest, { params }: Params) => {
  return Response({
    message: "Berhasil Get Todo!",
    status: 200,
    data: `HEHE ${params.id}`,
  });
};

export const GET = apiMiddleware(getTodoRoute);
