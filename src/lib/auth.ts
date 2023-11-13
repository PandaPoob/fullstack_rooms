import { PrismaAdapter } from "@next-auth/prisma-adapter";
import { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { db } from "./prisma-client";
import { compare } from "bcrypt";

export const authOptions: NextAuthOptions = {
  adapter: PrismaAdapter(db),
  secret: process.env.NEXTAUTH_SECRET,
  session: {
    strategy: "jwt", //already set by default
  },
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "text", placeholder: "jsmith@mail.com" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials, req) {
        if (!credentials?.email || !credentials?.password) {
          throw new Error("Please fill out required fields");
        }

        //check email
        const existingUser = await db.user.findUnique({
          where: { email: credentials?.email },
        });

        if (!existingUser) {
          throw new Error("Invalid credentials");
        }
        //check password
        const passwordMatch = await compare(
          credentials.password,
          existingUser.password
        );

        if (!passwordMatch) {
          throw new Error("Invalid credentials");
        }

        //check if email is verified
        if (!existingUser.email_verified_at) {
          throw new Error("Email not verified");
        }
        return {
          id: existingUser.id,
          email: existingUser.email,
          first_name: existingUser.first_name,
          last_name: existingUser.last_name,
        };
      },
    }),
  ],
  callbacks: {
    //authorize function sends value into jwt
    async jwt({ token, session, trigger, user }) {
      if (trigger === "update" && session) {
        if (session.first_name) {
          token.first_name = session.first_name;
        }

        if (session.last_name) {
          token.last_name = session.last_name;
        }
      }

      if (user) {
        return {
          ...token,
          id: user.id,
          first_name: user.first_name,
          last_name: user.last_name,
        };
      }
      return token;
    },
    //jwt function sends value into session
    async session({ session, user, token }) {
      //console.log("session", token, user);

      return {
        ...session,
        user: {
          ...session.user,
          id: token.id,
          first_name: token.first_name,
          last_name: token.last_name,
        },
        token,
      };
    },
  },
  pages: {
    signIn: "/",
    signOut: "/login",
  },
};
