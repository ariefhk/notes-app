"use client";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import ActiveNotes from "./active-notes";
import CompletedNotes from "./completed-notes";
import { useState } from "react";
import useSearchQuery from "@/hooks/use-search-query-params";

const NoteList = () => {
  const { handleDeleteQuery, query } = useSearchQuery("notes");
  const [changeTab, setChangeTab] = useState<string>("active-notes");

  return (
    <div className=" flex flex-col flex-grow overflow-y-hidden">
      <h1>Catatan</h1>
      <Tabs
        className="flex flex-col gap-y-2 flex-grow overflow-y-hidden"
        value={changeTab}
        onValueChange={(valueState) => {
          // if tab changed and and there is a query search it will be deleted
          if (valueState !== changeTab && !!query) {
            handleDeleteQuery();
          }
          setChangeTab(valueState);
        }}
      >
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="active-notes">Aktif</TabsTrigger>
          <TabsTrigger value="completed-notes">Selesai</TabsTrigger>
        </TabsList>

        {changeTab === "active-notes" && (
          <div className="flex flex-col flex-grow overflow-y-auto pr-2">
            <ActiveNotes />
          </div>
        )}
        {changeTab === "completed-notes" && (
          <div className="flex flex-col flex-grow overflow-y-auto pr-2">
            <CompletedNotes />
          </div>
        )}
      </Tabs>
    </div>
  );
};

export default NoteList;
