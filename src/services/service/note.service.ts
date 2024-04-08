import prisma from "@/db/connection";
import {
  CreateNoteRequest,
  SearchNoteRequest,
  DeleteNoteRequest,
  UpdateNoteRequest,
  toNoteResponse,
  SearchNotesRequest,
  SearchArchivedNotesRequest,
} from "@/services/model/note-model";

import { NoteValidation } from "@/services/validation/note-validation";
import { APIError } from "../error/api-error";

export const createNote = async (request: CreateNoteRequest) => {
  // existed user
  const validation = NoteValidation.CREATE.safeParse(request);

  if (!validation.success) {
    const { errors } = validation.error;

    throw new APIError(400, "Bad Request", errors);
  }

  const { email, title, isArchive, note } = validation.data;

  const user = await prisma.user.findUnique({
    where: {
      email,
    },
  });

  if (!user) {
    throw new APIError(404, "User tidak ditemukan saat buat note");
  }

  const newNote = await prisma.note.create({
    data: {
      title,
      note,
      isArchive,
      userId: user?.id,
    },
  });

  return toNoteResponse(newNote, user.email);
};

export const getNotes = async (request: SearchNotesRequest) => {
  const validation = NoteValidation.SEARCHMANY.safeParse(request);

  if (!validation.success) {
    const { errors } = validation.error;

    throw new APIError(400, "Bad Request", errors);
  }

  let notes;

  const { email, title } = validation.data;

  if (!title) {
    notes = await prisma.note.findMany({
      where: {
        isArchive: false,
        user: {
          email: email,
        },
      },
      orderBy: {
        createdAt: "desc",
      },
      select: {
        id: true,
        title: true,
        note: true,
        user: {
          select: {
            email: true,
          },
        },
        createdAt: true,
      },
    });
  } else {
    notes = await prisma.note.findMany({
      where: {
        AND: [
          {
            isArchive: false,
            title: {
              contains: title,
              mode: "insensitive",
            },
          },
          {
            user: {
              email: email,
            },
          },
        ],
      },
      orderBy: {
        createdAt: "desc",
      },
      select: {
        id: true,
        title: true,
        note: true,
        user: {
          select: {
            email: true,
          },
        },
        createdAt: true,
      },
    });
  }

  return notes;
};

export const getArchiveNotes = async (request: SearchArchivedNotesRequest) => {
  const validation = NoteValidation.SEARCHARCHIVEDMANY.safeParse(request);

  if (!validation.success) {
    const { errors } = validation.error;

    throw new APIError(400, "Bad Request", errors);
  }

  let notes;

  const { email, title } = validation.data;

  if (!title) {
    notes = await prisma.note.findMany({
      where: {
        isArchive: true,
        user: {
          email: email,
        },
      },

      select: {
        id: true,
        title: true,
        note: true,
        user: {
          select: {
            email: true,
          },
        },
        createdAt: true,
      },
    });
  } else {
    notes = await prisma.note.findMany({
      where: {
        AND: [
          {
            isArchive: true,
            title: {
              contains: title,
              mode: "insensitive",
            },
          },
          {
            user: {
              email: email,
            },
          },
        ],
      },
      select: {
        id: true,
        title: true,
        note: true,
        user: {
          select: {
            email: true,
          },
        },
        createdAt: true,
      },
    });
  }

  return notes;
};

export const getNote = async (request: SearchNoteRequest) => {
  const validation = NoteValidation.SEARCH.safeParse(request);

  if (!validation.success) {
    const { errors } = validation.error;

    throw new APIError(400, "Bad Request", errors);
  }

  const { id, email } = validation.data;

  const existedNote = await prisma.note.findUnique({
    where: {
      id: id,
      user: {
        email,
      },
    },
  });

  if (!existedNote) {
    throw new APIError(404, "Note tidak ditemukan!");
  }

  return toNoteResponse(existedNote, email);
};

export const updateNote = async (request: UpdateNoteRequest) => {
  const validation = NoteValidation.UPDATE.safeParse(request);

  if (!validation.success) {
    const { errors } = validation.error;

    throw new APIError(400, "Bad Request", errors);
  }

  const { id, note, title, email, isArchive } = validation.data;

  const existedNote = await prisma.note.findUnique({
    where: {
      id,
      user: {
        email,
      },
    },
  });

  if (!existedNote) {
    throw new APIError(404, "Note tidak ditemukan!");
  }

  const updatedNote = await prisma.note.update({
    data: {
      title,
      note,
      isArchive,
    },
    where: {
      id,
      user: {
        email,
      },
    },
  });

  return toNoteResponse(updatedNote, email);
};

export const deleteNote = async (request: DeleteNoteRequest) => {
  const validation = NoteValidation.DELETE.safeParse(request);

  if (!validation.success) {
    const { errors } = validation.error;

    throw new APIError(400, "Bad Request", errors);
  }

  const { id, email } = validation.data;

  return prisma.note.delete({
    where: {
      id,
      user: {
        email,
      },
    },
  });
};
