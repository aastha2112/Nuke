// app/api/auth/init/route.ts
import { cookies } from "next/headers";
import { OAuthStrategy, createClient } from "@wix/sdk";
import { NextResponse } from "next/server";

export async function GET() {
  const cookieStore = cookies();
  const wixClient = createClient({
    auth: OAuthStrategy({
      clientId: process.env.NEXT_PUBLIC_WIX_CLIENT_ID!,
    }),
  });

  const tokens = await wixClient.auth.generateVisitorTokens();
  cookieStore.set("refreshToken", JSON.stringify(tokens.refreshToken), {
    maxAge: 60 * 60 * 24 * 30,
    path: "/",
  });

  return NextResponse.json({ success: true });
}
