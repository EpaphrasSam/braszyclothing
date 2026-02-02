import type { NextAuthConfig } from "next-auth";

export default {
  providers: [],
  pages: {
    signIn: "/login",
  },
  callbacks: {
    async jwt({ token, user }: { token: any; user?: any }) {
      if (user) {
        token.id = user.id;
        token.admin = user.admin;
        token.contact = user.contact;
        token.name = user.name;
      }
      return token;
    },
    async session({ session, token }: { session: any; token: any }) {
      if (token) {
        session.user.id = token.id;
        session.user.admin = token.admin;
        session.user.contact = token.contact;
        session.user.name = token.name;
      }
      return session;
    },
  },
} satisfies NextAuthConfig;
