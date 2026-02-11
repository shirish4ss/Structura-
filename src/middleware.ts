import { clerkMiddleware } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";

export default clerkMiddleware(async (auth, req) => {
  const url = req.nextUrl;
  const hostname = req.headers.get("host") || "";

  const mainDomain = process.env.NEXT_PUBLIC_APP_DOMAIN || "lumina.com";

  const isAppHost = hostname === `app.${mainDomain}`;
  const isLocalHost = hostname.includes("localhost") || hostname.includes("127.0.0.1");

  if (!isAppHost && !isLocalHost && hostname !== mainDomain) {
    let domain = hostname;
    if (hostname.endsWith(`.${mainDomain}`)) {
      domain = hostname.replace(`.${mainDomain}`, "");
    }

    // Check for password session if needed
    // This is simplified. In real app, we'd fetch site config here or in a wrapper.
    // For now, let's just do the rewrite.
    return NextResponse.rewrite(new URL(`/site/${domain}${url.pathname}`, req.url));
  }

  return NextResponse.next();
});

export const config = {
  matcher: [
    "/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)",
    "/(api|trpc)(.*)",
  ],
};
