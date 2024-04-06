"use client";

import useSearchQuery from "@/hooks/use-search-query-params";
import { useGetNotes } from "@/services/client/react-query/note-query";
import NotFoundNotes from "./not-found-notes";
import Note from "./note";
import NoteSkeleton from "./note-skeleton";

const ActiveNotes = () => {
  const { query } = useSearchQuery("notes");

  const { data: activeNotes, isSuccess: isSuccessGetNotes, isLoading: isLoadingGetNotes } = useGetNotes(query);

  console.log("GET VALUE: Active", activeNotes);

  return (
    <div className="grid gap-2">
      {isLoadingGetNotes && <NoteSkeleton />}
      {isSuccessGetNotes && activeNotes.length === 0 && <NotFoundNotes />}
      {isSuccessGetNotes &&
        activeNotes.map((note, index: number) => {
          return <Note key={index + 1} {...note} />;
        })}
    </div>
  );
};

export default ActiveNotes;
