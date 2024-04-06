"use client";

import { useState } from "react";
import { useDeleteNote, useUpdateNote } from "@/services/client/react-query/note-query";
import { useToast } from "../ui/use-toast";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { reformatDate } from "@/lib/reformatDate";
import Link from "next/link";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { formatDotString } from "@/lib/formatDotString";
import { AxiosError } from "axios";
import { useQueryClient } from "@tanstack/react-query";
import { AiOutlineLoading3Quarters } from "react-icons/ai";

type Props = {
  id: number;
  title: string;
  note: string;
  createdAt: Date;
  isArchived?: boolean;
};

const Note = ({ id, title, createdAt, note, isArchived }: Props) => {
  const queryClient = useQueryClient();
  const { toast } = useToast();
  const [openDialogDelete, setOpenDialogDelete] = useState(false);
  const [openDialogDone, setOpenDialogDone] = useState(false);

  const { mutateAsync: updateNote, isPending: isLoadingUpdateNote } = useUpdateNote({
    onSuccess: (data) => {
      toast({
        title: "Berhasil Mengupdate Note!",
        description: `Note ${title} masuk note yang Selesai!`,
      });
      setOpenDialogDone(false);
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ["get_notes"] });
    },
  });
  const { mutateAsync: deleteNote, isPending: isLoadingDeleteNote } = useDeleteNote({
    onSuccess: (data) => {
      toast({
        title: "Berhasil Hapus Note!",
        description: "Selamat, Anda berhasil Menghapus Note!",
      });
      setOpenDialogDelete(false);
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ["get_notes"] });
    },
  });

  const onDeleteNote = async () => {
    try {
      await deleteNote({ id });
    } catch (error) {
      if (error instanceof AxiosError) {
        // console.log("ERROR DELETE NOTE: ", error);
        toast({
          variant: "destructive",
          title: "Gagal menghapus Note!",
          description: error?.response?.data?.message,
        });
      }
    }
  };

  const onSetArchivedNote = async () => {
    try {
      await updateNote({ id, note, title, isArchive: true });
    } catch (error) {
      if (error instanceof AxiosError) {
        console.log("ERROR UPDATE NOTE: ", error);
        toast({
          variant: "destructive",
          title: "Gagal mengupdate Note!",
          description: error?.response?.data?.message,
        });
      }
    }
  };

  return (
    <Card>
      <CardHeader className="pb-3">
        <CardTitle>{formatDotString(title, 20)}</CardTitle>
        <CardDescription>{reformatDate(createdAt, "id")}</CardDescription>
      </CardHeader>
      <CardContent className="mt-0">
        <p>{note}</p>
      </CardContent>
      <CardFooter className="flex gap-2 justify-end">
        {!isArchived && (
          <Button asChild>
            <Link href={`/note/${id}/change`}>Ubah Note</Link>
          </Button>
        )}
        {!isArchived && (
          <Dialog open={openDialogDone} onOpenChange={setOpenDialogDone}>
            <DialogTrigger asChild>
              <Button variant={"secondary"}>Selesai</Button>
            </DialogTrigger>
            <DialogContent className="max-w-[360px] gap-y-10 sm:max-w-[400px]">
              <DialogHeader className="text-left">
                <DialogTitle>Selesaikan Note</DialogTitle>
                <DialogDescription>Apakah kamu yakin menyelesaikan note ini?</DialogDescription>
              </DialogHeader>
              <DialogFooter className=" flex-row justify-end gap-3">
                <Button disabled={isLoadingUpdateNote} onClick={onSetArchivedNote}>
                  {isLoadingUpdateNote && <AiOutlineLoading3Quarters className="mr-2 h-4 w-4 animate-spin" />}
                  {isLoadingUpdateNote ? "Sedang Mengupdate..." : "Yakin Selesain"}
                </Button>
                <DialogClose asChild>
                  <Button type="button" variant="secondary">
                    Close
                  </Button>
                </DialogClose>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        )}
        <Dialog open={openDialogDelete} onOpenChange={setOpenDialogDelete}>
          <DialogTrigger asChild>
            <Button variant={"destructive"}>Hapus</Button>
          </DialogTrigger>
          <DialogContent className="max-w-[360px] gap-y-10 sm:max-w-[400px]">
            <DialogHeader className="text-left">
              <DialogTitle>Hapus Note</DialogTitle>
              <DialogDescription>Apakah kamu yakin menghapus note ini?</DialogDescription>
            </DialogHeader>
            <DialogFooter className=" flex-row justify-end gap-3">
              <Button disabled={isLoadingDeleteNote} onClick={onDeleteNote}>
                {isLoadingDeleteNote && <AiOutlineLoading3Quarters className="mr-2 h-4 w-4 animate-spin" />}{" "}
                {isLoadingDeleteNote ? "Sedang Menghapus..." : "Yakin Hapus"}
              </Button>
              <DialogClose asChild>
                <Button type="button" variant="secondary">
                  Close
                </Button>
              </DialogClose>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </CardFooter>
    </Card>
  );
};

export default Note;
