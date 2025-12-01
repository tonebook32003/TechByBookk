import type { NextAuthConfig } from "next-auth";
import GoogleProvider from "next-auth/providers/google";

export const authOptions: NextAuthConfig = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID || "",
      clientSecret: process.env.GOOGLE_CLIENT_SECRET || "",
    }),
  ],
  callbacks: {
    async signIn({ user, account, profile }) {
      // You can add custom logic here to handle user sign-in
      // For example, check if user exists in your database
      return true;
    },
    async session({ session, token }) {
      // You can add custom data to the session here
      if (session.user) {
        session.user.id = token.sub || "";
      }
      return session;
    },
    async jwt({ token, user, account }) {
      // Persist the OAuth access_token to the token right after signin
      if (account) {
        token.accessToken = account.access_token;
      }
      if (user) {
        token.id = user.id;
      }
      return token;
    },
  },
  pages: {
    signIn: "/", // Custom sign-in page (optional)
  },
  secret: process.env.NEXTAUTH_SECRET,
};
