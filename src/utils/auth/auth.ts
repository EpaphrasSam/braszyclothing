import NextAuth from "next-auth";
import { PrismaAdapter } from "@auth/prisma-adapter";
import prisma from "../prisma";
import authConfig from "./auth.config";

export const { handlers, auth, signIn, signOut } = NextAuth({
  adapter: PrismaAdapter(prisma),
  ...authConfig,
  callbacks: {
    async jwt({ token, user }: any) {
      if (user) {
        token.id = user.id;
        token.admin = user.admin;
        token.contact = user.contact;
        token.name = user.name;
      }
      return token;
    },
    async session({ session, token }: any) {
      if (token) {
        session.user.id = token.id;
        session.user.admin = token.admin;
        session.user.contact = token.contact;
        session.user.name = token.name;
      }
      // if (token) {
      //   const user = await prisma.user.findUnique({
      //     where: { id: token.id },
      //   });

      //   if (user) {
      //     session.user.id = user.id;
      //     session.user.admin = user.admin;
      //     session.user.contact = user.contact;
      //     session.user.name = user.name;
      //   } else {
      //     signOut();
      //   }
      // }
      return session;
    },
  },
  debug: process.env.NODE_ENV === "development",
  session: {
    strategy: "jwt",
  },
  pages: {
    signIn: "/login",
    // error: "/login",
  },
});
