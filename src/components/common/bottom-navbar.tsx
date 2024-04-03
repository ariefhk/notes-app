"use client";

import {
  RiHonourFill,
  RiHonourLine,
  RiHome2Fill,
  RiHome2Line,
  RiArchive2Line,
  RiArchive2Fill,
  RiInformationFill,
  RiInformationLine,
} from "react-icons/ri";

import { cn } from "@/lib/utils";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { memo } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

const navLinks = [
  { name: "Home", href: "/", iconActive: RiHome2Fill, icon: RiHome2Line },
  { name: "Archive", href: "/archive", iconActive: RiArchive2Fill, icon: RiArchive2Line },
  // {
  //   name: "Tentang",
  //   href: "/about",
  //   iconActive: RiInformationFill,
  //   icon: RiInformationLine,
  // },
  { name: "Profil", href: "/profile", iconActive: RiHonourFill, icon: RiHonourLine },
];

const BottonNavbar = memo(function BottonNavbar() {
  const pathname = usePathname();

  return (
    <section className="fixed bottom-0 z-30 flex h-[60px] w-full items-center justify-between  border-t dark:bg-background max-w-[500px] container">
      {navLinks.map((link) => {
        const LinkIcon = link.icon;
        const LinkIconActive = link.iconActive;
        const linkName = link.name;
        const linkHref = link.href;

        switch (linkName) {
          case "Home":
            return (
              <Link key={1} href={linkHref} className="flex flex-col items-center">
                {pathname === linkHref ? (
                  <LinkIconActive className={cn("h-7 w-7 text-primary")} />
                ) : (
                  <LinkIcon className={cn("h-7 w-7 text-[#8A8A8A]")} />
                )}
                <span
                  className={cn("text-[10px] font-[400] leading-[14px] text-[#8A8A8A]", {
                    " text-primary": pathname === linkHref,
                  })}
                >
                  {linkName}
                </span>
              </Link>
            );

          case "Archive":
            return (
              <Link key={2} href={linkHref} className="flex flex-col items-center">
                {pathname === linkHref || pathname.split("/")[1] === "pelatihan" ? (
                  <LinkIconActive className={cn("h-7 w-7 text-primary")} />
                ) : (
                  <LinkIcon className={cn("h-7 w-7 text-[#8A8A8A]")} />
                )}
                <span
                  className={cn(
                    "text-[10px] font-[400] leading-[14px] text-[#8A8A8A]",
                    {
                      " text-primary": pathname === linkHref,
                    },
                    {
                      " text-primary": pathname === linkHref,
                    }
                  )}
                >
                  {linkName}
                </span>
              </Link>
            );

          case "Tentang":
            return (
              <Link key={3} href={linkHref} className="flex flex-col items-center">
                {pathname === linkHref ? (
                  <LinkIconActive className={cn("h-7 w-7 text-primary")} />
                ) : (
                  <LinkIcon className={cn("h-7 w-7 text-[#8A8A8A]")} />
                )}
                <span
                  className={cn("text-[10px] font-[400] leading-[14px] text-[#8A8A8A]", {
                    " text-primary": pathname === linkHref,
                  })}
                >
                  {linkName}
                </span>
              </Link>
            );

          case "Profil":
            return (
              <Link key={4} href={linkHref} className="flex flex-col items-center justify-center">
                <Avatar className="h-7 w-7">
                  <AvatarImage src="https://github.com/shadcn.png" />
                  <AvatarFallback>AR</AvatarFallback>
                </Avatar>
                <span
                  className={cn("text-[10px] font-[400] leading-[14px] text-[#8A8A8A]", {
                    " text-primary": pathname === linkHref,
                  })}
                >
                  Arief
                </span>
              </Link>
            );
        }
      })}
    </section>
  );
});

export default BottonNavbar;
