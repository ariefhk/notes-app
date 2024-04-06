import { Response, ResponseError } from "@/lib/api.response";
import { getNextAuthSession } from "@/lib/get-server-session";
import { APIError } from "@/services/error/api-error";
import { createNote, getArchiveNotes, getNotes } from "@/services/service/note.service";
import { getUser } from "@/services/service/user.service";
import { NextRequest } from "next/server";

export const GET = async (request: NextRequest) => {
  try {
    const session = await getNextAuthSession();
    const user = await getUser(session?.token);
    const searchTodo = request.nextUrl.searchParams.get("searchNote") || undefined;
    const isArchive = request.nextUrl.searchParams.get("isArchive") || undefined;
    // console.log("query: ", searchTodo);

    let notes;

    if (!isArchive) {
      notes = await getNotes({
        title: searchTodo,
        email: user.email,
      });
    } else {
      notes = await getArchiveNotes({
        title: searchTodo,
        isArchive: true,
        email: user.email,
      });
    }

    return Response({
      message: "Sukses Get All Notes",
      status: 200,
      data: notes,
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

export const POST = async (request: NextRequest) => {
  try {
    const session = await getNextAuthSession();
    const user = await getUser(session?.token);
    const payload = await request.json();

    const notes = await createNote({
      email: user.email,
      title: payload.title,
      note: payload.note,
      isArchive: payload.isArchive,
    });

    return Response({
      message: "Sukses Create Note",
      status: 200,
      data: notes,
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
        data: error,
      });
    }
  }
};
