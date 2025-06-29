import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import axios from "axios";
import type { Session, User } from "next-auth";
import { JWT } from "next-auth/jwt";


export const {handlers, signIn, signOut, auth} = NextAuth(
  {
  providers: [
    CredentialsProvider({
      name: "Credentials",
      type: "credentials",
      credentials: {},
      async authorize(credentials) {
        const { email, password, language } = credentials as {
          email: string;
          password: string;
          language: string;
        };

        try {
          const res = await axios.post(
            `${process.env.NEXT_PUBLIC_API_URL}/auth/login`,
            { email, password },
            { headers: { "Accept-Language": language } }
          );

          const data = res.data;

          if (data?.status === 401) {
            throw new Error(data.detail);
          }

          if (res.status === 200 || res.status === 201) {
            const userDataRes = await axios.get(
              `${process.env.NEXT_PUBLIC_API_URL}/Users/GetFromAuth`,
              {
                headers: {
                  Authorization: `Bearer ${data.accessToken.token}`,
                  "Accept-Language": language,
                },
              }
            );

            const userData = userDataRes.data;

            // Return the user object along with the tokens

            const user: User = {
              id: userData.id,
              firstName: userData.firstName,
              lastName: userData.lastName,
              email: userData.email,
              userType: userData.userType,
              accessToken: data.accessToken,
              refreshToken: data.refreshToken,
            };

            return user;
          }

          return null;
        } catch (error: any) {
          const message =
            error.response?.data?.detail || error.message || "Server Error";
          throw new Error(message);
        }
      },
    })
  ],

  session: {
    strategy: "jwt",
    maxAge: 30 * 24 * 60 * 60, // 30 days
  },

  pages: {
    signIn: "/login",
    signOut:"/logout"
  },

  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        (token.user = {
          id: user.id ?? "",
          firstName: user.firstName,
          lastName: user.lastName,
          email: user.email ?? "",
          userType: user.userType,
        } as JWT["user"]),
          (token.accessToken = user.accessToken);
        token.refreshToken = user.refreshToken;
      }
      return token;
    },

    async session({ session, token }) {
      session.user = {
        accessToken: token.accessToken as Session["user"]["accessToken"],
        email: token.user.email,
        firstName: token.user.firstName,
        refreshToken: token.refreshToken as Session["user"]["refreshToken"],
        userType: token.user.userType,
        lastName: token.user.lastName,
        id: token.user.id,
        emailVerified: null,
      };
   
      
      return session;
    },
  },
});
