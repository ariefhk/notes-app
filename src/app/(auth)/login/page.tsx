import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Login",
};

import DarkModeToggle from "@/components/common/dark-mode-toggle";
import LoginForm from "@/components/login/login-form";
import Link from "next/link";

const LoginPage = () => {
  return (
    <section className="mx-auto   h-screen max-w-[500px] overflow-x-hidden overflow-y-hidden flex flex-col">
      <div className="relative max-w-[500px]">
        <DarkModeToggle className="absolute right-8 top-8" />
      </div>
      <div className="container pt-20 space-y-6">
        <h1 className="text-2xl font-bold">Login</h1>
        <LoginForm />
      </div>

      <div className=" container max-w-[500px] flex justify-center  fixed bottom-16 ">
        <span>Belum punya Akun?</span>
        <Link href={"/register"} className="pl-2 font-bold">
          Daftar di sini
        </Link>
      </div>
    </section>
  );
};

export default LoginPage;
