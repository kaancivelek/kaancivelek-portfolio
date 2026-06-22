/**
 * Auth.js v5 API Route Handler
 * Handles all /api/auth/* requests (signin, signout, session, csrf).
 */

import { handlers } from "@/lib/auth";

export const { GET, POST } = handlers;
