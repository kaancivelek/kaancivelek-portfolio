/**
 * Next.js Proxy
 * Protects /admin routes using Auth.js v5 authorized callback.
 * Uses edge-compatible auth config (no Prisma, no Node.js APIs).
 */

import NextAuth from "next-auth";
import { authConfig } from "@/lib/auth.config";

const { auth } = NextAuth(authConfig);

export const proxy = auth;

export const config = {
  matcher: ["/admin/:path*", "/login"],
};
