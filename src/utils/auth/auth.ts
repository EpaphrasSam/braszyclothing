import NextAuth from "next-auth";
import { PrismaAdapter } from "@auth/prisma-adapter";
import CredentialsProvider from "next-auth/providers/credentials";
import { User } from "@prisma/client";
import prisma from "../prisma";
import { passwordValidator } from "../../helpers/bcryptValidator";
import authConfig from "./auth.config";

async function validateUser(
  email: string,
  password: string
): Promise<User | null> {
  const user = await prisma.user.findUnique({
    where: { email },
  });

  if (!user || !user.password) {
    throw new Error("Invalid credentials");
  }

  const isCorrectPassword = await passwordValidator(password, user.password);
  if (!isCorrectPassword) {
    throw new Error("Invalid credentials");
  }

  return user;
}

export const { handlers, auth, signIn, signOut } = NextAuth({
  adapter: PrismaAdapter(prisma),
  ...authConfig,
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "text" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials, req): Promise<User | null> {
        const body = await req?.json?.();
        const { fetchUserByEmail } = body ?? {};
        if (
          fetchUserByEmail &&
          credentials?.email &&
          typeof credentials.email === "string"
        ) {
          const user = await prisma.user.findUnique({
            where: { email: credentials.email },
          });
          if (!user) throw new Error("Invalid credentials");
          return user;
        }
        if (
          !credentials ||
          typeof credentials.email !== "string" ||
          typeof credentials.password !== "string"
        ) {
          throw new Error("Invalid credentials");
        }
        try {
          const user = await validateUser(
            credentials.email,
            credentials.password
          );
          if (!user) throw new Error("Invalid credentials");
          return user;
        } catch {
          throw new Error("Invalid credentials");
        }
      },
    }),
  ],
  debug: process.env.NODE_ENV === "development",
  session: {
    strategy: "jwt",
  },
});
