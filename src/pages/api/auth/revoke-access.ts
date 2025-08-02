import type { APIContext } from "astro";
import { db } from "../../../db";
import { sessions } from "../../../db/schema";
import { eq, and } from "drizzle-orm";
import getUser from "../../../lib/getUser";

export async function POST({ request, cookies }: APIContext) {
  try {
    const currentSessionToken = cookies.get("app_auth_token")?.value;
    
    if (!currentSessionToken) {
      return Response.json({ success: false, error: 'No authenticated session' }, { status: 401 });
    }

    const userInfo = await getUser(currentSessionToken);
    const currentUserId = userInfo?.user?.id;

    if (!currentUserId) {
      return Response.json({ success: false, error: 'No authenticated session' }, { status: 401 });
    }

    const { sessionId }: { sessionId: string } = await request.json();
    
    if (!sessionId) {
      return Response.json({ success: false, error: 'Invalid session ID' }, { status: 400 });
    }

    if (sessionId === currentSessionToken) {
      return Response.json({ success: false, error: 'Cannot revoke current session' }, { status: 400 });
    }

    const sessionExists = await db.query.sessions.findFirst({
      where: and(
        eq(sessions.id, sessionId),
        eq(sessions.userId, currentUserId)
      )
    });

    if (!sessionExists) {
      return Response.json({ success: false, error: 'Session not found' }, { status: 404 });
    }

    await db.delete(sessions).where(eq(sessions.id, sessionId));
    
    return Response.json({ success: true });

  } catch (error) {
    console.error('Error revoking session:', error);
    return Response.json({ success: false, error: 'Internal server error' }, { status: 500 });
  }
}