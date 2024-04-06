import { Note } from "@prisma/client";

export type CreateNoteRequest = {
  title: string;
  note: string;
  isArchive: boolean;
  email: string;
};

export type SearchNotesRequest = {
  title?: string;
  email: string;
};

export type SearchArchivedNotesRequest = {
  title?: string;
  isArchive: boolean;
  email: string;
};

export type SearchNoteRequest = {
  id: number;
  email: string;
};

export type UpdateNoteRequest = {
  id: number;
  title: string;
  note: string;
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
    createdAt: note.createdAt,
    email,
  };
};

export type NoteResponse = ReturnType<typeof toNoteResponse>;
