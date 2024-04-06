import { z } from "zod";

export class NoteValidation {
  static readonly CREATE = z.object({
    title: z.string().min(1, { message: "Judul harus diisi!" }),
    note: z.string().min(1, { message: "Catatan harus diisi!" }),
    isArchive: z.boolean().default(false),
    email: z.string().min(1, { message: "Judul harus diisi!" }),
  });

  static readonly UPDATE = z.object({
    id: z.number({ required_error: "Id catatan Harus Ada!" }),
    title: z.string().min(1, { message: "Judul harus diisi!" }),
    note: z.string().min(1, { message: "Catatan harus diisi!" }),
    isArchive: z.boolean().default(false),
    email: z.string().min(1, { message: "Judul harus diisi!" }),
  });

  static readonly SEARCHMANY = z.object({
    title: z.string().optional(),
    email: z.string().min(1, { message: "Judul harus diisi!" }),
  });

  static readonly SEARCHARCHIVEDMANY = z.object({
    title: z.string().optional(),
    isArchive: z.boolean(),
    email: z.string().min(1, { message: "Judul harus diisi!" }),
  });

  static readonly SEARCH = z.object({
    id: z.number({ required_error: "Id catatan Harus Ada!" }),
    email: z.string().min(1, { message: "Judul harus diisi!" }),
  });

  static readonly DELETE = z.object({
    id: z.number({ required_error: "Id catatan Harus Ada!" }),
    email: z.string().min(1, { message: "Judul harus diisi!" }),
  });
}
