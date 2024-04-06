import { useQuery, useMutation, UseQueryOptions } from "@tanstack/react-query";
import { DeleteNoteRequest, NoteResponse, UpdateNoteRequest } from "@/services/model/note-model";
import { AxiosError } from "axios";
import { clientApiInstance } from "../client-api-instance";
import { CreateNoteRequest } from "@/services/model/note-model";
import { MutationOpt } from "@/types/react-query";

export const useGetNotes = (
  notes?: string,
  isArchive?: boolean,
  queryOpt?: Omit<UseQueryOptions<NoteResponse[]>, "queryKey" | "queryFn">
) => {
  return useQuery<NoteResponse[], AxiosError>({
    queryKey: ["get_notes", notes, isArchive],
    queryFn: async () => {
      let response;
      if (!!notes && !!isArchive) {
        response = await clientApiInstance.get(`/note?searchNote=${notes}&isArchive=${isArchive}`);
      } else if (!!notes && !isArchive) {
        response = await clientApiInstance.get(`/note?searchNote=${notes}`);
      } else if (!notes && !!isArchive) {
        response = await clientApiInstance.get(`/note?isArchive=${isArchive}`);
      } else {
        response = await clientApiInstance.get("/note");
      }
      return response.data.data;
    },
    ...queryOpt,
  });
};

export const useGetNote = (idNote?: number, queryOpt?: Omit<UseQueryOptions<NoteResponse>, "queryKey" | "queryFn">) => {
  return useQuery<NoteResponse, AxiosError>({
    queryKey: ["get_note", idNote],
    queryFn: async () => {
      const response = await clientApiInstance.get(`/note/${idNote}`);
      return response.data.data;
    },
    enabled: !!idNote,
    ...queryOpt,
  });
};

type CreateNoteForm = Omit<CreateNoteRequest, "email">;

export const useCreateNote = (opt?: MutationOpt<NoteResponse>) => {
  return useMutation({
    mutationKey: ["create_note"],
    mutationFn: async (data: CreateNoteForm) => {
      const response = await clientApiInstance.post("/note", data);
      return response.data.data;
    },
    ...opt,
  });
};

type DeleteNoteForm = Omit<DeleteNoteRequest, "email">;

export const useDeleteNote = (opt?: MutationOpt<null>) => {
  return useMutation({
    mutationKey: ["delete_note"],
    mutationFn: async (data: DeleteNoteForm) => {
      const response = await clientApiInstance.delete(`/note/${data.id}`);
      return response.data.data;
    },
    ...opt,
  });
};

type UpdateNoteForm = Omit<UpdateNoteRequest, "email">;

export const useUpdateNote = (opt?: MutationOpt<NoteResponse>) => {
  return useMutation({
    mutationKey: ["update_note"],
    mutationFn: async (data: UpdateNoteForm) => {
      const response = await clientApiInstance.put(`/note/${data.id}`, data);
      return response.data.data;
    },
    ...opt,
  });
};
