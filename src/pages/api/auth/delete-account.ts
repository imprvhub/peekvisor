/// <reference path="../../../env.d.ts" />
import type { APIContext } from "astro";
import { eq, and, ne } from "drizzle-orm";
import { db } from "../../../db";
import { sessions } from "../../../db/schema";
import {
  revokeGoogleAccessToken,
  deleteOauthToken,
  deleteUser,
} from "../../../lib/auth";
import getUser from "../../../lib/getUser";

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

    if (googleAccessToken) {
      try {
        await revokeGoogleAccessToken(googleAccessToken);
      } catch (e) {
        console.warn(
          `Could not revoke google access token for user ${userId}, probably it was already revoked.`,
        );
      }
      await deleteOauthToken(userId, "google");
    }

    await db
      .delete(sessions)
      .where(and(eq(sessions.userId, userId), ne(sessions.id, sessionToken)));

    await deleteUser(userId);

    await db.delete(sessions).where(eq(sessions.id, sessionToken));
    cookies.delete("app_auth_token", { path: "/" });

    return new Response(JSON.stringify({ success: true }), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  } catch (error) {
    console.error("Error deleting account:", error);
    return new Response(JSON.stringify({ error: "Failed to delete account" }), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    });
  }
}
