"use client";

import { Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";
import { FaPowerOff } from "react-icons/fa6";
import { Button } from "@/components/ui/button";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { signOut } from "next-auth/react";
import { useToast } from "../ui/use-toast";
import Link from "next/link";

const Navbar = () => {
  const { setTheme } = useTheme();
  const { toast } = useToast();

  const handleLogout = () => {
    signOut();
    toast({
      title: "Sukses Logout!",
      description: "Selamat, Anda berhasil Log out!",
    });
  };

  return (
    <nav className="container  border-b">
      <div className="flex px-1 items-center justify-between py-3 ">
        <Link href={"/"} className="text-lg font-semibold ">
          Aplikasi Catatan{" "}
        </Link>
        <article className="flex items-center gap-3">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" size="icon">
                <Sun className="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
                <Moon className="absolute h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
                <span className="sr-only">Toggle theme</span>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem onClick={() => setTheme("light")}>Light</DropdownMenuItem>
              <DropdownMenuItem onClick={() => setTheme("dark")}>Dark</DropdownMenuItem>
              <DropdownMenuItem onClick={() => setTheme("system")}>System</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
          <Button
            variant="outline"
            size="icon"
            onClick={(e) => {
              e.stopPropagation();
              handleLogout();
            }}
          >
            <FaPowerOff className="h-[1.2rem] w-[1.2rem] " />
          </Button>
        </article>
      </div>
    </nav>
  );
};

export default Navbar;
