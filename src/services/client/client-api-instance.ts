import { signOut } from "next-auth/react";
import axios from "axios";
import { toast } from "@/components/ui/use-toast";

const clientApiInstance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_BASE_URL,
});

// invalidate  global response while 401
clientApiInstance.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    if (error.response.status === 401) {
      toast({
        variant: "destructive",
        title: "Sesi Anda telah berakhir!",
        description: "Anda wajib login kembali!",
      });
      return signOut();
    }
    return Promise.reject(error);
  }
);

export { clientApiInstance };
