"use client";

import useSearchQuery from "@/hooks/use-search-query-params";
import { useGetNotes } from "@/services/client/react-query/note-query";
import NotFoundNotes from "./not-found-notes";
import NoteSkeleton from "./note-skeleton";
import Note from "./note";

const CompletedNotes = () => {
  const { query } = useSearchQuery("notes");

  const {
    data: archivedNotes,
    isSuccess: isSuccessGetArchivedNotes,
    isLoading: isLoadingGetArchivedNotes,
  } = useGetNotes(query, true);

  console.log("GET VALUE: Completed", archivedNotes);

  return (
    <div className="grid gap-2 pt-[-10px]">
      {isLoadingGetArchivedNotes && <NoteSkeleton />}
      {isSuccessGetArchivedNotes && archivedNotes.length === 0 && <NotFoundNotes />}
      {isSuccessGetArchivedNotes &&
        archivedNotes.map((note, index: number) => {
          return <Note key={index + 1} {...note} isArchived />;
        })}
    </div>
  );
};

export default CompletedNotes;
