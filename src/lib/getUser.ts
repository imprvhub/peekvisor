import { and, eq, gte } from "drizzle-orm";
import { db } from "../db/index";
import { sessions } from "../db/schema";

async function getUser(authToken: string | undefined) {
  if (!authToken) return null;

  try {
    const userInfo = await db.query.sessions.findFirst({
      where: and(
        eq(sessions.id, authToken),
        gte(sessions.expiresAt, new Date().getTime())
      ),
      with: {
        user: {
          columns: {
            id: true,
            fullName: true,
            userName: true,
            email: true,
            plan: true,
            planExpiresAt: true,
            profilePhoto: true,
            emailVerified: true,
            isBlocked: true,
            isDeleted: true,
            createdAt: true,
            lemonSqueezyCustomerId: true,
          },
        },
      },
    });

    if (!userInfo?.user) {
      return null;
    }

    if (userInfo.user.isBlocked || userInfo.user.isDeleted) {
      return null;
    }

    return userInfo;
  } catch (error) {
    console.error('Error in getUser:', error);
    return null;
  }
}

export default getUser;