import { Prisma } from "@/lib/generated/prisma";
import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";

const handler = NextAuth({
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: {
          label: "Email",
          type: "email",
          placeholder: "test@example.com",
        },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials, req) {
        const { email, password } = credentials;

        // Check if email and password are provided  
        if (!email || !password) {
          return null;
        }

        // Check if user exists
        const user = await Prisma.user.findUnique({
          where: {
            email,
          },
        });
        if (!user) {
          return null;
        }

        // Check if password is correct
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
          return null;
        }
        return user;
      },
    }),
  ],
});

export { handler as GET, handler as POST };
