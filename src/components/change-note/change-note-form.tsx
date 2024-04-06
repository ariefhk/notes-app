"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { NoteValidation } from "@/services/validation/note-validation";
import { z } from "zod";
import { useForm } from "react-hook-form";
import ErrorMessage from "@/components/common/error-message";
import { AiOutlineLoading3Quarters } from "react-icons/ai";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { useCreateNote } from "@/services/client/react-query/note-query";
import { useToast } from "@/components/ui/use-toast";
import { AxiosError } from "axios";
import { useRouter } from "next/navigation";
import { useQueryClient } from "@tanstack/react-query";
import { useGetNote } from "@/services/client/react-query/note-query";
import { useCallback, useEffect } from "react";

// omitting email because it will checked on server by session
const UpdateNoteSchema = z.object({
  title: z.string().min(1, { message: "Judul harus diisi!" }),
  note: z.string().min(1, { message: "Catatan harus diisi!" }),
  isArchive: z.enum(["true", "false"], { required_error: "Harus pilih salah satu!" }),
});
type ChangeNoteSchema = z.infer<typeof UpdateNoteSchema>;

const isArchiveHelper = (isArchive: boolean) => {
  if (!isArchive) {
    return "false";
  }
  return "true";
};

const ChangeNoteForm = ({ id }: { id: number }) => {
  const queryClient = useQueryClient();
  const { toast } = useToast();
  const router = useRouter();
  const {
    watch,
    setValue,
    reset,
    handleSubmit,
    register,
    formState: { isSubmitting, errors },
  } = useForm<ChangeNoteSchema>({
    mode: "onChange",
    resolver: zodResolver(UpdateNoteSchema),
    defaultValues: {
      title: "",
      note: "",
      isArchive: "false",
    },
  });

  // const { onChange, ...registerIsArchive } = register("isArchive");

  const { data: note, isLoading: isLoadingGetNote, isSuccess: isSuccessGetNote } = useGetNote(id);

  // console.log(note);

  useEffect(() => {
    if (isSuccessGetNote) {
      note.title && setValue("title", note.title, { shouldValidate: true });
      note.note && setValue("note", note.note, { shouldValidate: true });
      if (!note.isArchive) {
        setValue("isArchive", "false", { shouldValidate: true });
      } else {
        setValue("isArchive", "true", { shouldValidate: true });
      }
    }
  }, [isSuccessGetNote, setValue, note?.title, note?.note, note?.isArchive]);

  const getWatchData = useCallback(() => {
    if (isLoadingGetNote) {
      return true;
    }
    if (isSubmitting) {
      return true;
    }
    if (isSuccessGetNote) {
      const isErrorTitle = errors.title?.message;
      const isErrorTodo = errors.title?.message;
      const isOldTitle = watch("title") === note.title && !errors.title?.message;
      const isOldTodo = watch("note") === note.note && !errors.note?.message;
      const isOldIsArchive = watch("isArchive") === isArchiveHelper(note.isArchive);

      if (isErrorTitle || isErrorTodo) {
        return true;
      }

      return isOldTitle && isOldTodo && isOldIsArchive;
    }

    return false;
  }, [
    isLoadingGetNote,
    isSubmitting,
    isSuccessGetNote,
    note?.title,
    note?.note,
    note?.isArchive,
    watch,
    errors.title?.message,
    errors.note?.message,
  ]);

  const onChangeNote = async (values: ChangeNoteSchema) => {
    console.log(values);
  };

  return (
    <form className="space-y-5" onSubmit={handleSubmit(onChangeNote)}>
      <div className="grid gap-2">
        <Label>Judul</Label>
        <Input {...register("title")} placeholder={isLoadingGetNote ? "Sedang memuat data ..." : ""} />
        <ErrorMessage errorMessage={errors.title?.message} />
      </div>
      <div className="grid gap-2">
        <Label>Note</Label>
        <Textarea {...register("note")} placeholder={isLoadingGetNote ? "Sedang memuat data ..." : ""} />
        <ErrorMessage errorMessage={errors.note?.message} />
      </div>
      <div className="grid gap-2">
        <div className="flex gap-10 justify-center">
          <div className="flex flex-col gap-y-1">
            <Label>Sudah</Label>
            <Input type="radio" id="archive-note" value={"true"} {...register("isArchive")} />
          </div>
          <div className="flex flex-col gap-y-1">
            <Label>Belum</Label>
            <Input type="radio" id="archive-note" value={"false"} {...register("isArchive")} />
          </div>
        </div>
        <ErrorMessage errorMessage={errors.isArchive?.message} />
      </div>
      <Button disabled={getWatchData()} type="submit" className="w-full">
        {(isSubmitting || isLoadingGetNote) && <AiOutlineLoading3Quarters className="mr-2 h-4 w-4 animate-spin" />}
        {isLoadingGetNote ? "Sedang memuat data..." : "Ubah Note"}
      </Button>
    </form>
  );
};

export default ChangeNoteForm;
