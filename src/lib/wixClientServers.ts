import { OAuthStrategy, createClient } from "@wix/sdk";
import { collections, products } from "@wix/stores";
import { orders } from "@wix/ecom";
import { cookies } from "next/headers";

export const wixClientServer = async () => {
  let refreshToken = "";

  try {
    const cookieStore = await cookies(); 
    const token = cookieStore.get("refreshToken")?.value;
    refreshToken = token ? JSON.parse(token) : "";
  } catch (e) {
    console.error("Error parsing refreshToken cookie:", e);
  }

  const wixClient = createClient({
    modules: {
      products,
      collections,
      orders,
    },
    auth: OAuthStrategy({
      clientId: process.env.NEXT_PUBLIC_WIX_CLIENT_ID!,
      tokens: {
        refreshToken,
        accessToken: { value: "", expiresAt: 0 },
      },
    }),
  });

  return wixClient;
};
