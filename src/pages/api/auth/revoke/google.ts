/// <reference path="../../../../env.d.ts" />
import type { APIContext } from "astro";
import { eq } from "drizzle-orm";
import { db } from "../../../../db";
import { sessions } from "../../../../db/schema";
import {
  revokeGoogleAccessToken,
  deleteOauthToken,
} from "../../../../lib/auth";
import getUser from "../../../../lib/getUser";

export async function POST({ cookies }: APIContext) {
  const sessionToken = cookies.get("app_auth_token")?.value;

  if (!sessionToken) {
    return new Response(JSON.stringify({ error: "No authenticated session" }), {
      status: 401,
      headers: { "Content-Type": "application/json" },
    });
  }

  const userInfo = await getUser(sessionToken);
  const userId = userInfo?.user?.id;

  if (!userId) {
    return new Response(JSON.stringify({ error: "No authenticated session" }), {
      status: 401,
      headers: { "Content-Type": "application/json" },
    });
  }

  try {
    const userSession = await db.query.sessions.findFirst({
      where: eq(sessions.id, sessionToken),
      with: {
        user: {
          with: {
            oauthTokens: {
              columns: {
                strategy: true,
                accessToken: true,
              },
            },
          },
        },
      },
    });

    const googleAccessToken = userSession?.user?.oauthTokens?.find(
      (token) => token.strategy === "google",
    )?.accessToken;

    if (!googleAccessToken) {
      return new Response(
        JSON.stringify({ error: "No Google Access Token found" }),
        {
          status: 404,
          headers: { "Content-Type": "application/json" },
        },
      );
    }

    try {
      await revokeGoogleAccessToken(googleAccessToken);
    } catch (error) {
      console.warn(
        "Failed to revoke Google token, but continuing with cleanup:",
        error,
      );
    }

    await deleteOauthToken(userId, "google");

    cookies.delete("app_auth_token", { path: "/" });

    return new Response(JSON.stringify({ success: true }), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  } catch (error) {
    console.error("Error revoking Google Access Token:", error);
    return new Response(JSON.stringify({ error: "Failed to revoke token" }), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    });
  }
}
