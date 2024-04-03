import { GetServerSidePropsContext, NextApiRequest, NextApiResponse } from "next";
import { NextAuthOptions, getServerSession } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { AxiosError } from "axios";
import { clientApiInstance } from "@/services/client/client-api-instance";

const authOptions: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      id: "login",
      name: "Credentials",
      credentials: {
        email: {
          label: "Email",
          type: "text",
          placeholder: "user@gmail.com",
        },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        try {
          const response = await clientApiInstance.post("/login", {
            email: credentials?.email,
            password: credentials?.password,
          });

          console.log(" RESPONSE: ", response.data.data);

          const userData = {
            id: String(+new Date()), // protect user id
            name: response?.data.data?.name,
            email: response?.data.data?.email,
            token: response?.data.data?.token,
          };

          return userData;
        } catch (error) {
          if (error instanceof AxiosError) {
            // console.log("AXIOS ERR IN AUTH OPTIONS: ", error.response?.data?.message);
            throw new Error(error?.response?.data?.message);
          }
          throw error;
        }
      },
    }),
  ],
  session: {
    strategy: "jwt",
    maxAge: 60 * 60 * 24 * 30, // 30 days
  },
  callbacks: {
    // jwt: async ({ token, user, account }) => {
    //   if (account && account.access_token) {
    //     // set access_token to the token payload
    //     token.accessToken = account.access_token;
    //   }
    //   return token;
    // },
    // redirect: async ({ url, baseUrl }) => {
    //   return baseUrl;
    // },
    // session: async ({ session, token, user }) => {
    //   // If we want to make the accessToken available in components, then we have to explicitly forward it here.
    //   return { ...session, token: token.accessToken };
    // },

    async jwt({ token, user }) {
      return { ...token, ...user };
    },

    async session({ session, token }) {
      session.user = token;
      return session;
    },
  },
  // pages: {
  //   signIn: "/login",
  // },

  secret: process.env.NEXTAUTH_SECRET,
};

function auth( // <-- use this function to access the jwt from React components
  ...args: [GetServerSidePropsContext["req"], GetServerSidePropsContext["res"]] | [NextApiRequest, NextApiResponse] | []
) {
  return getServerSession(...args, authOptions);
}

export { authOptions, auth };
