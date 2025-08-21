/// <reference path="../.astro/types.d.ts" />
/// <reference types="astro/client" />

interface ImportMetaEnv {
  readonly MAINTENANCE_MODE?: string;
  readonly LEMON_SQUEEZY_WEBHOOK_SECRET?: string;
  readonly DB_URL: string;
  readonly DB_TOKEN: string;
  readonly GOOGLE_AUTH_CLIENT: string;
  readonly GOOGLE_AUTH_SECRET: string;
  readonly GOOGLE_AUTH_CALLBACK_URL: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}

declare namespace App {
  interface Locals {
    userId: string | undefined;
    userPlan: "basic" | "flex" | "pro";
    userEmail: string | undefined;
    user?: {
      id: string;
      email: string;
      plan: "basic" | "flex" | "pro";
      planExpiresAt?: number;
      fullName?: string;
      profilePhoto?: string;
    };
  }
}

declare namespace Astro {
  interface APIContext {
    cookies: {
      get(name: string): { value: string } | undefined;
      set(name: string, value: string, options?: any): void;
      delete(name: string, options?: any): void;
    };
    redirect(path: string, status?: number): Response;
  }
}

declare global {
  interface Window {
    HSThemeAppearance?: {
      getAppearance(): string;
      setAppearance(theme: string): void;
    };
  }

  interface WindowEventMap {
    "on-hs-appearance-change": CustomEvent<string>;
  }
}

export {};
