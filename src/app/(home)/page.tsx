import SearhQuery from "@/components/common/search-query";
import NoteList from "@/components/home/note-list";
import AddNoteButton from "@/components/common/add-button";

export default function Home() {
  return (
    <main className="space-y-4 px-1 flex flex-col flex-grow overflow-y-hidden relative">
      <SearhQuery queryParams="notes" className="mt-3" />
      <NoteList />
      <AddNoteButton className="absolute bottom-8 right-0 rounded-full p-0 h-12 w-12" />
    </main>
  );
}
