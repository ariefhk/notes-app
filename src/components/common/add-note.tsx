import Link from "next/link";
import { Button } from "../ui/button";
import { cn } from "@/lib/utils";
import { IoAdd } from "react-icons/io5";

type Props = {
  className?: string;
};

const AddNoteButton = ({ className }: Props) => {
  return (
    <Button className={className} asChild>
      <Link href={"/note/add"}>
        <IoAdd className="h-8 w-8" />
      </Link>
    </Button>
  );
};

export default AddNoteButton;
