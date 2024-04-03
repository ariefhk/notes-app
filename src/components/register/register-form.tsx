"use client";

import React from "react";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { REGISTER } from "@/services/validation/user-validation";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { cn } from "@/lib/utils";
import ErrorMessage from "../common/error-message";
import { useToast } from "@/components/ui/use-toast";
import { useRouter } from "next/navigation";
import { AiOutlineLoading3Quarters } from "react-icons/ai";
import { useRegistation } from "@/services/client/react-query/use-todos-query";
import { ApiError } from "next/dist/server/api-utils";
import { AxiosError } from "axios";

type RegisterSchema = z.infer<typeof REGISTER>;

const RegisterForm = () => {
  const router = useRouter();
  const { toast } = useToast();
  const {
    reset,
    register,
    handleSubmit,
    formState: { isSubmitting, errors },
  } = useForm<RegisterSchema>({
    resolver: zodResolver(REGISTER),
    mode: "onChange",
    defaultValues: {
      name: "",
      email: "",
      password: "",
    },
  });

  const { mutateAsync: registerUser } = useRegistation({
    onSuccess: (data) => {
      reset();
      // console.log("SUCCESS REGIS: ", data);
      toast({
        title: "Berhasil Registrasi!",
        description: "Selamat, Anda berhasil Registrasi Akun!",
      });
      router.push("/login");
    },
  });

  const onRegister = async (values: RegisterSchema) => {
    try {
      await registerUser(values);
    } catch (error) {
      if (error instanceof AxiosError) {
        // console.log("ERROR REGIS: ", error);
        toast({
          variant: "destructive",
          title: "Gagal regitrasi!",
          description: error?.response?.data?.message,
        });
      }
    }
  };

  return (
    <form className="space-y-5" onSubmit={handleSubmit(onRegister)}>
      <div className="grid gap-2">
        <Label>Nama</Label>
        <Input {...register("name")} />
        <ErrorMessage errorMessage={errors.name?.message} />
      </div>
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
        {isSubmitting && <AiOutlineLoading3Quarters className="mr-2 h-4 w-4 animate-spin" />} Daftar
      </Button>
    </form>
  );
};

export default RegisterForm;
