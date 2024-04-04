"use client";

import useSearchQuery from "@/hooks/use-search-query-params";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

const ActiveNotes = () => {
  const { query } = useSearchQuery("notes");

  console.log("GET VALUE: Active", query);

  return (
    <div className="grid gap-2">
      {Array.from({ length: 5 }).map((_, index: number) => {
        return (
          <Card key={index}>
            <CardHeader>
              <CardTitle>Account</CardTitle>
              <CardDescription>Make changes to your active-notes here. Click save when youre done.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-2">
              <div className="space-y-1">
                <Label htmlFor="name">Name</Label>
                <Input id="name" defaultValue="Pedro Duarte" />
              </div>
              <div className="space-y-1">
                <Label htmlFor="username">Username</Label>
                <Input id="username" defaultValue="@peduarte" />
              </div>
            </CardContent>
            <CardFooter>
              <Button>Save changes</Button>
            </CardFooter>
          </Card>
        );
      })}
    </div>
  );
};

export default ActiveNotes;
