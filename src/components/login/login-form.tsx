"use client";

import React from "react";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { LOGIN } from "@/services/validation/user-validation";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { cn } from "@/lib/utils";
import ErrorMessage from "../common/error-message";
import { signIn } from "next-auth/react";
import { useToast } from "@/components/ui/use-toast";
import { useRouter } from "next/navigation";
import { AiOutlineLoading3Quarters } from "react-icons/ai";

type LoginSchema = z.infer<typeof LOGIN>;

const LoginForm = () => {
  const router = useRouter();
  const { toast } = useToast();
  const {
    reset,
    register,
    handleSubmit,
    formState: { isSubmitting, errors },
  } = useForm<LoginSchema>({
    resolver: zodResolver(LOGIN),
    mode: "onChange",
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onLogin = async (values: LoginSchema) => {
    const response = await signIn("login", {
      redirect: false,
      email: values.email,
      password: values.password,
    });

    if (!response?.error) {
      reset();
      toast({
        title: "Berhasil Login!",
        description: "Selamat, Anda berhasil Log In!",
      });
      router.push("/");
    } else if (response?.error) {
      toast({
        variant: "destructive",
        title: "Gagal Login!",
        description: response?.error,
      });
    }
  };

  return (
    <form className="space-y-5" onSubmit={handleSubmit(onLogin)}>
      <div className="grid gap-2">
        <Label>Email</Label>
        <Input {...register("email")} />
        <ErrorMessage errorMessage={errors.email?.message} />
      </div>
      <div className="grid gap-2">
        <Label>Password</Label>
        <Input {...register("password")} />
        <ErrorMessage errorMessage={errors.password?.message} />
      </div>
      <Button disabled={isSubmitting} type="submit" className="w-full">
        {isSubmitting && <AiOutlineLoading3Quarters className="mr-2 h-4 w-4 animate-spin" />} Masuk
      </Button>
    </form>
  );
};

export default LoginForm;
