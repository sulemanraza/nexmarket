import NextAuth, { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import GoogleProvider from "next-auth/providers/google";
import dbConnect from "@/server/utils/db";
import User, { IUser } from "@/server/models/User";
import bcrypt from "bcryptjs";
// Extend the Session and JWT types to include custom properties
declare module "next-auth" {
  interface Session {
    user: {
      id: string;
      name?: string | null;
      email?: string | null;
      image?: string | null;
      role?: string;
      emailVerified?: boolean;
    };
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    id: string;
    role?: string;
    emailVerified?: boolean;
  }
}

export const authOptions: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        const { email, password } = credentials as {
          email: string;
          password: string;
        };

        await dbConnect();

        const user = await User.findOne({ email: email });

        if (!user) {
          throw new Error(
            JSON.stringify({
              email: "User with this email does not exist.",
            })
          );
        }
        const passwordMatches = bcrypt.compareSync(password, user.password);

        if (!passwordMatches) {
          throw new Error(
            JSON.stringify({
              password: "Password is incorrect.",
            })
          );
        }

        if (passwordMatches) {
          if (user.isBlocked) {
            throw new Error(
              JSON.stringify({
                email: "Your account has been blocked.",
              })
            );
          }
          user.lastLogin = new Date();
          await user.save();
          return user;
        } else {
          return null;
        }
      },
    }),
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID as string,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
    }),
  ],
  callbacks: {
    async signIn({ user, account, profile, email, credentials }) {
      if (!account) {
        throw new Error("Account is null.");
      }
      await dbConnect();

      if (account.provider === "google") {
        const existingUser = (await User.findOne({
          providerId: account.id,
        })) as IUser;

        if (existingUser) {
          if (existingUser.isBlocked) {
            throw new Error("Your account has been blocked.");
          }
          existingUser.lastLogin = new Date();
          await existingUser.save();
          return true;
        } else {
          const newUser = new User({
            name: user.name,
            email: user.email,
            provider: account.provider,
            providerId: account.id,
            emailVerified: true,
            lastLogin: new Date(),
          });
          await newUser.save();
          return true;
        }
      } else {
        if ((user as IUser).isBlocked) {
          throw new Error("Your account has been blocked.");
        }
        (user as IUser).lastLogin = new Date();
        await (user as IUser).save();
        return true;
      }
    },
    async jwt({ token, user, trigger, session }) {
      if (user) {
        token.id = (user as IUser).id;
        token.role = (user as IUser).role;
        token.emailVerified = (user as IUser).emailVerified;
      }

      if (trigger === "update" && session?.name) {
        token.name = session.name;

        await User.findOneAndUpdate(
          { _id: token.id },
          { name: session.name },
          { new: true }
        );
      }

      return token;
    },
    async session({ session, token, trigger }) {
      if (token) {
        session.user.id = token.id as string;
        session.user.role = token.role as string;
        session.user.emailVerified = token.emailVerified as boolean;
      }
      return session;
    },
  },
  pages: {
    signIn: "/auth/login",
    error: "/authError",
    verifyRequest: "/auth/verify-request",
  },
  events: {
    async createUser(message) {
      // Send verification email
    },
  },
  secret: process.env.NEXTAUTH_SECRET,
};
