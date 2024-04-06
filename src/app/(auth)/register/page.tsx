import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Daftar",
};

import DarkModeToggle from "@/components/common/dark-mode-toggle";
import RegisterForm from "@/components/register/register-form";
import Link from "next/link";

const RegisterPage = () => {
  return (
    <section className="mx-auto   h-screen max-w-[500px] overflow-x-hidden overflow-y-hidden flex flex-col">
      <div className="relative max-w-[500px]">
        <DarkModeToggle className="absolute right-8 top-8" />
      </div>
      <div className="container pt-20 space-y-6">
        <h1 className="text-2xl font-bold">Buat Akun</h1>
        <RegisterForm />
      </div>

      <div className=" container max-w-[500px] flex justify-center  fixed bottom-16 ">
        <span>Sudah punya Akun?</span>
        <Link href={"/login"} className="pl-2 font-bold">
          Masuk di sini
        </Link>
      </div>
    </section>
  );
};

export default RegisterPage;
