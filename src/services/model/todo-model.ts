import { Note } from "@prisma/client";

export type CreateNoteRequest = {
  title: string;
  todo: string;
  isArchive: boolean;
  email: string;
};

export type SearchNoteRequest = {
  title: string;
  password: string;
};

export type UpdateNoteRequest = {
  id: number;
  title: string;
  todo: string;
  isArchive: boolean;
  email: string;
};

export type DeleteNoteRequest = {
  id: number;
  email: string;
};

export const toNoteResponse = (note: Note, email: string) => {
  return {
    id: note.id,
    title: note.title,
    note: note.note,
    isArchive: note.isArchive,
    email,
  };
};
