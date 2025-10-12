import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import bcrypt from "bcrypt";
import prisma from "@/lib/prisma"; // adjust path if needed

export const authOptions = {
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        identifier: { label: "Email or Username", type: "text" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        if (!credentials?.identifier || !credentials?.password) {
          throw new Error("Missing credentials");
        }

        // find user by email OR username
        const user = await prisma.user.findFirst({
          where: {
            OR: [
              { email: credentials.identifier },
              { userName: credentials.identifier },
            ],
          },
        });

        if (!user) {
          throw new Error("No user found with that email or username");
        }

        // verify password
        const isValid = await bcrypt.compare(credentials.password, user.passwordHash);
        if (!isValid) {
          throw new Error("Invalid password");
        }

        // return user object for JWT
        return {
          id: user.id,
          name: user.userName,
          email: user.email,
        };
      },
    }),
  ],

  pages: {
    signIn: "/auth/login",
  },

  session: {
    strategy: "jwt" as const,
  },

  callbacks: {
    async jwt({ token, user }: { token: any; user: any }) {
      if (user) {
        token.id = user.id;
        token.name = user.name;
      }
      return token;
    },
    async session({ session, token }: { session: any; token: any }) {
      if (token?.id) {
        session.user.id = token.id;
      }
      return session;
    },
  },

  debug: true,
};

const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };
