import CredentialsProvider from "next-auth/providers/credentials";
import prisma from "@/db";
import { compareSync } from "bcrypt-ts";

export const NEXT_AUTH_CONFIG = {
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "email", type: "text" },
        password: { label: "password", type: "password" },
      },
      async authorize(creds: any) {
        const isUser = await prisma.user.findUnique({
          where: { email: creds?.email },
        });

        if (!isUser) {
          return null;
        }

        const isPasswordValid = compareSync(creds.password, isUser.password);

        if (!isPasswordValid) {
          return null;
        }

        return {
          id: isUser.id.toString(),
          name: isUser.name,
          email: isUser.email,
          admin: isUser.admin,
        };
      },
    }),
  ],
  secret: process.env.NEXTAUTH_SECRET,
  callbacks: {
    jwt: async ({ user, token }: any) => {
      if (user) {
        token.uid = user.id;
        token.admin = user.admin;
      }
      return token;
    },
    session: ({ session, token }: any) => {
      if (session.user) {
        session.user.id = token.uid;
        session.user.admin = token.admin;
      }
      return session;
    },
  },
  pages: {
    signIn: "/signin",
  },
};
