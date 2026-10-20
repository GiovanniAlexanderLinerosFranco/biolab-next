import type { NextRequest } from "next/server";
import { updateSession } from "./lib/supabase/middleware";

export async function middleware(request: NextRequest) {
  return updateSession(request);
}

// Limited to new-app routes so legacy routes (/laboratorio, /admin, /api, assets) are untouched.
export const config = {
  matcher: ["/dashboard/:path*", "/ledger/:path*", "/chat/:path*", "/login", "/auth/:path*"],
};
