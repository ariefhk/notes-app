"use client";

import useSearchQuery from "@/hooks/use-search-query-params";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import { cn } from "@/lib/utils";

type Props = {
  queryParams: string;
  className?: string;
};

const SerachQuery = ({ queryParams, className }: Props) => {
  const { handleSearchQuery, query } = useSearchQuery(queryParams);

  return (
    <div className={cn("grid gap-2 ", className)}>
      <Label>Cari Catatan</Label>
      <Input value={query} onChange={(e) => handleSearchQuery(e.currentTarget.value)} />
    </div>
  );
};

export default SerachQuery;
