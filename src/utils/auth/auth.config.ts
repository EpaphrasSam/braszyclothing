import type { NextAuthConfig } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { User } from "@prisma/client";
import prisma from "../prisma";
import { passwordValidator } from "../../helpers/bcryptValidator";

async function validateUser(
  email: string,
  password: string
): Promise<User | null> {
  const user = await prisma.user.findUnique({
    where: {
      email,
    },
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
export default {
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "text" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials): Promise<User | null> {
        if (
          !credentials ||
          typeof credentials.email !== "string" ||
          typeof credentials.password !== "string"
        ) {
          throw Error("Invalid credentials");
        }
        try {
          const user = await validateUser(
            credentials.email,
            credentials.password
          );
          if (!user) {
            throw new Error("Invalid credentials");
          }
          return user;
        } catch (error) {
          throw new Error("Invalid credentials");
        }
      },
    }),
  ],
} satisfies NextAuthConfig;
