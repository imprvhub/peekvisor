import { and, eq } from "drizzle-orm";
import { db } from "../db/index";
import { loginLogs, oauthTokens, sessions, users } from "../db/schema";
import Bowser from "bowser";

type NewUserArgs = {
  email: string;
  userName: string;
  fullName: string;
  profilePhoto: string;
  emailVerified: boolean;
};

type UserExistArgs = {
  email: string;
  strategy: "google" | "github";
};

type NewSessionArgs = {
  userId: string;
};

type NewLogsArgs = {
  userAgent: string | null;
  userId: string;
  sessionId: string;
  ip: string;
};

type TokenArgs = {
  userId: string;
  strategy: "github" | "google";
  refreshToken: string;
  accessToken: string;
};

const expiresAt = new Date();
expiresAt.setDate(expiresAt.getDate() + 14);

export async function throwError() {
  throw new Error("wtf");
}

export const createUser = async ({
  email,
  fullName,
  profilePhoto,
  userName,
  emailVerified,
}: NewUserArgs) => {
  try {
    const newUser = await db
      .insert(users)
      .values({
        email,
        profilePhoto,
        fullName,
        emailVerified,
        userName,
        plan: 'basic',
      })
      .returning({ id: users.id });

    return { userId: newUser[0].id };
  } catch (error) {
    throw new Error("Error while creating user");
  }
};

export const checkUserExists = async ({ email, strategy }: UserExistArgs) => {
  const userExists = await db.query.users.findFirst({
    where: eq(users.email, email),
    with: {
      oauthTokens: {
        where: eq(oauthTokens.strategy, strategy),
      },
    },
  });

  return userExists;
};

export const createSession = async ({ userId }: NewSessionArgs) => {
  if (!userId) {
    throw new Error("User ID is required");
  }
  try {
    const newSession = await db
      .insert(sessions)
      .values({
        userId,
        expiresAt: expiresAt.getTime(),
      })
      .returning({ id: sessions.id });

    return { sessionId: newSession[0].id, expiresAt };
  } catch (error) {
    throw new Error("Failed to create session");
  }
};

export const saveOauthToken = async ({
  accessToken,
  refreshToken,
  strategy,
  userId,
}: TokenArgs) => {
  try {
    await db.insert(oauthTokens).values({
      userId,
      strategy: strategy,
      accessToken,
      refreshToken,
    });
  } catch (error) {
    console.error("Error while saving OAuth token:", error);
    throw new Error("Error while saving OAuth token");
  }
};

export const updateOauthToken = async ({
  accessToken,
  refreshToken,
  strategy,
  userId,
}: TokenArgs) => {
  try {
    await db
      .update(oauthTokens)
      .set({
        accessToken,
        refreshToken,
      })
      .where(
        and(eq(oauthTokens.userId, userId), eq(oauthTokens.strategy, strategy))
      );
  } catch (error) {
    console.error("Error while updating OAuth token:", error);
    throw new Error("Error while updating OAuth token");
  }
};

export const createLoginLog = async ({
  userAgent,
  userId,
  sessionId,
  ip,
}: NewLogsArgs) => {
  if (!userAgent) {
    throw new Error("Internal Error");
  }
  const parser = Bowser.getParser(userAgent);

  try {
    await db.insert(loginLogs).values({
      userId,
      sessionId,
      ip,
      os: `${parser.getOSName()} ${parser.getOSVersion()}`,
      browser: `${parser.getBrowserName()} ${parser.getBrowserVersion()}`,
      device: parser.getPlatformType(),
    });
  } catch (error) {
    throw new Error("Failed to create logs");
  }
};

export async function revokeGoogleAccessToken(token: string): Promise<void> {
  const response = await fetch('https://oauth2.googleapis.com/revoke', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
    },
    body: `token=${token}`,
  });

  if (!response.ok) {
    const error = await response.json();
    console.error('Failed to revoke Google token:', error);
    throw new Error('Failed to revoke Google token');
  }
}

export async function deleteOauthToken(
  userId: string,
  strategy: "google" | "github"
): Promise<void> {
  await db
    .delete(oauthTokens)
    .where(
      and(
        eq(oauthTokens.userId, userId),
        eq(oauthTokens.strategy, strategy)
      )
    );
}

export async function deleteUser(userId: string): Promise<void> {
  await db.delete(users).where(eq(users.id, userId));
}

export async function deleteUserSessions(userId: string): Promise<void> {
  await db.delete(sessions).where(eq(sessions.userId, userId));
}