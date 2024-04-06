import { NextRequest } from "next/server";
import { Response, ResponseError } from "@/lib/api.response";
import { apiMiddleware } from "@/lib/api.middleware";
import { APIError } from "@/services/error/api-error";
import { getNextAuthSession } from "@/lib/get-server-session";
import { getUser } from "@/services/service/user.service";
import { deleteNote, getNote, updateNote } from "@/services/service/note.service";

type Params = {
  params: {
    id: string;
  };
};

export const GET = async (request: NextRequest, { params }: Params) => {
  try {
    const session = await getNextAuthSession();
    const user = await getUser(session?.token);
    const { id } = params;

    const note = await getNote({
      id: Number(id),
      email: user.email,
    });

    return Response({
      message: "Sukses Get Note",
      status: 200,
      data: note,
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

export const PUT = async (request: NextRequest, { params }: Params) => {
  try {
    const session = await getNextAuthSession();
    const user = await getUser(session?.token);
    const { id } = params;
    const payload = await request.json();

    const note = await updateNote({
      id: Number(id),
      email: user.email,
      title: payload.title,
      note: payload.note,
      isArchive: payload.isArchive,
    });

    return Response({
      message: "Sukses Update Note",
      status: 200,
      data: note,
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

export const DELETE = async (request: NextRequest, { params }: Params) => {
  try {
    const session = await getNextAuthSession();
    const user = await getUser(session?.token);
    const { id } = params;

    await deleteNote({
      id: Number(id),
      email: user.email,
    });

    return Response({
      message: "Sukses Delete Note",
      status: 200,
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
