import { clerkMiddleware } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";

export default clerkMiddleware(async (auth, req) => {
  const url = req.nextUrl;
  const hostname = req.headers.get("host") || "";

  // Main application domain
  const mainDomain = process.env.NEXT_PUBLIC_APP_DOMAIN || "lumina.com";

  // Define host types
  const isAppHost = hostname === `app.${mainDomain}`;
  const isLocalHost = hostname.includes("localhost");

  // Public site routing (Subdomains or Custom Domains)
  if (!isAppHost && !isLocalHost && hostname !== mainDomain) {
    // 1. Subdomain routing: [subdomain].lumina.com
    if (hostname.endsWith(`.${mainDomain}`)) {
      const subdomain = hostname.replace(`.${mainDomain}`, "");
      return NextResponse.rewrite(new URL(`/site/${subdomain}${url.pathname}`, req.url));
    }

    // 2. Custom domain routing: userdomain.com
    return NextResponse.rewrite(new URL(`/site/${hostname}${url.pathname}`, req.url));
  }

  return NextResponse.next();
});

export const config = {
  matcher: [
    "/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)",
    "/(api|trpc)(.*)",
  ],
};
