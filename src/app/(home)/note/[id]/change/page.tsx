import ChangeNoteForm from "@/components/change-note/change-note-form";

type Props = {
  params: {
    id: string;
  };
};

const ChangeNotePage = ({ params: { id } }: Props) => {
  return (
    <div className="pt-8 space-y-6">
      <h1 className="text-xl font-bold">Ubah Note</h1>
      <ChangeNoteForm id={Number(id)} />
    </div>
  );
};

export default ChangeNotePage;
