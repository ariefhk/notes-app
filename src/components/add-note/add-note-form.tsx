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

// omitting email because it will checked on server by session
const AddNoteSchema = NoteValidation.CREATE.omit({ email: true });
type CreateNoteSchema = z.infer<typeof AddNoteSchema>;

const AddNoteForm = () => {
  const queryClient = useQueryClient();
  const { toast } = useToast();
  const router = useRouter();
  const {
    reset,
    handleSubmit,
    register,
    formState: { isSubmitting, errors },
  } = useForm<CreateNoteSchema>({
    mode: "onChange",
    resolver: zodResolver(AddNoteSchema),
    defaultValues: {
      isArchive: false,
      title: "",
      note: "",
    },
  });

  const { mutateAsync: createNote } = useCreateNote({
    onSuccess: (data) => {
      reset();
      // console.log("SUCCESS REGIS: ", data);
      toast({
        title: "Berhasil Tambah Note!",
        description: "Selamat, Anda berhasil Tambah Note!",
      });
      router.push("/");
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ["get_notes"] });
    },
  });

  const onAddNote = async (values: CreateNoteSchema) => {
    try {
      await createNote(values);
    } catch (error) {
      if (error instanceof AxiosError) {
        // console.log("ERROR REGIS: ", error);
        toast({
          variant: "destructive",
          title: "Gagal Menambahkan Note!",
          description: error?.response?.data?.message,
        });
      }
    }
  };

  return (
    <form className="space-y-5" onSubmit={handleSubmit(onAddNote)}>
      <div className="grid gap-2">
        <Label>Judul</Label>
        <Input {...register("title")} />
        <ErrorMessage errorMessage={errors.title?.message} />
      </div>
      <div className="grid gap-2">
        <Label>Note</Label>
        <Textarea {...register("note")} />
        <ErrorMessage errorMessage={errors.note?.message} />
      </div>
      <Button disabled={isSubmitting} type="submit" className="w-full">
        {isSubmitting && <AiOutlineLoading3Quarters className="mr-2 h-4 w-4 animate-spin" />} Tambah Note
      </Button>
    </form>
  );
};

export default AddNoteForm;
