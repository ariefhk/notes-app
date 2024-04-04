import prisma from "@/db/connection";
import {
  CreateNoteRequest,
  SearchNoteRequest,
  DeleteNoteRequest,
  UpdateNoteRequest,
  toNoteResponse,
} from "@/services/model/todo-model";

import { NoteValidation } from "@/services/validation/note-validation";

export const createNote = async (request: CreateNoteRequest) => {
  // existed user
};
