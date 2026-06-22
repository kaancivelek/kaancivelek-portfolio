/**
 * Auth.js (next-auth v5) Edge-Compatible Config
 * This file contains only edge-safe configuration (no Prisma, no Node.js APIs).
 * Used by proxy.ts which runs on the Edge Runtime.
 */

import type { NextAuthConfig } from "next-auth";

export const authConfig: NextAuthConfig = {
  pages: {
    signIn: "/login",
  },
  session: {
    strategy: "jwt",
    maxAge: 24 * 60 * 60, // 24 hours
  },
  callbacks: {
    /**
     * Called before a request is completed in proxy/middleware.
     * Controls access to admin routes without hitting the database.
     */
    authorized({ auth, request: { nextUrl } }) {
      const isLoggedIn = !!auth?.user;
      const isAdminRoute = nextUrl.pathname.startsWith("/admin");
      const isLoginPage = nextUrl.pathname === "/login";

      // Redirect logged-in users away from login page
      if (isLoginPage && isLoggedIn) {
        return Response.redirect(new URL("/admin", nextUrl));
      }

      // Require auth for admin routes
      if (isAdminRoute) {
        if (isLoggedIn) return true;
        // next-auth will redirect to pages.signIn automatically
        return false;
      }

      return true;
    },
    jwt({ token, user }) {
      if (user) token.id = user.id;
      return token;
    },
    session({ session, token }) {
      if (session.user) {
        (session.user as { id?: string }).id = token.id as string;
      }
      return session;
    },
  },
  providers: [], // Providers added in auth.ts (not edge-safe)
};
