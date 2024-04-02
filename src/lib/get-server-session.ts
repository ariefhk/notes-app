import { getServerSession } from "next-auth/next";
import { authOptions } from "./auth-option";

export async function getNextAuthSession() {
  const session = await getServerSession(authOptions);

  return session?.user;
}
