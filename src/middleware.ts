/// <reference types="astro/client" />

import { defineMiddleware } from "astro/middleware";
import getUser from "./lib/getUser";
import { defaultLang, languages } from "./i18n/ui";

interface CustomLocals extends Record<string, any> {
  userId: string | undefined;
  userEmail: string | undefined;
  userPlan: 'basic' | 'flex' | 'pro';
  user?: {
    id: string;
    email: string;
    plan: 'basic' | 'flex' | 'pro';
    planExpiresAt?: number;
    fullName?: string;
    profilePhoto?: string;
  };
}

const langCodes = Object.keys(languages);

export const onRequest = defineMiddleware(async ({ cookies, locals, url, redirect }, next) => {
  const pathname = url.pathname;

  if (pathname.startsWith('/api/') || 
      pathname.includes('.') || 
      pathname.startsWith('/_astro/')) {
    return next();
  }

  const pathSegments = pathname.split('/').filter(Boolean);
  const langFromPath = pathSegments[0];
  const currentLang = langCodes.includes(langFromPath) ? langFromPath : defaultLang;

  if (import.meta.env.MAINTENANCE_MODE === 'true' && !pathname.includes('/maintenance')) {
    return redirect(`/${currentLang}/maintenance`, 302);
  }

  if (!langCodes.includes(langFromPath) && pathname !== '/') {
    return redirect(`/${defaultLang}${pathname}`, 302);
  }

  if (pathname === '/') {
    return redirect(`/${defaultLang}`, 302);
  }

  if (pathname.endsWith("/logout")) {
    cookies.delete("app_auth_token", {
      path: '/',
      secure: import.meta.env.PROD,
      sameSite: 'lax',
      httpOnly: true
    });
    return redirect(`/${currentLang}`, 302);
  }

  const appLocals = locals as unknown as CustomLocals;

  appLocals.userId = undefined;
  appLocals.userEmail = undefined;
  appLocals.userPlan = 'basic';
  appLocals.user = undefined;

  try {
    const token = cookies.get("app_auth_token")?.value;
    if (token) {
      const userInfo = await getUser(token);
      if (userInfo?.user) {
        appLocals.userId = userInfo.user.id;
        appLocals.userEmail = userInfo.user.email;
        appLocals.userPlan = userInfo.user.plan || 'basic';
        appLocals.user = {
          id: userInfo.user.id,
          email: userInfo.user.email,
          plan: userInfo.user.plan || 'basic',
          planExpiresAt: userInfo.user.planExpiresAt || undefined,
          fullName: userInfo.user.fullName || undefined,
          profilePhoto: userInfo.user.profilePhoto || undefined,
        };

        const now = Math.floor(Date.now() / 1000);
        if (userInfo.user.planExpiresAt && userInfo.user.planExpiresAt < now) {
          appLocals.userPlan = 'basic';
          appLocals.user.plan = 'basic';
        }
      }
    }
  } catch (error) {
    console.error('Auth error in middleware:', error);
  }

  const protectedRoutes = ['dashboard', 'settings', 'websites', 'analytics', 'profile'];
  const isProtectedRoute = protectedRoutes.some(route => 
    pathname.includes(`/${route}`)
  );

  if (isProtectedRoute && !appLocals.userId) {
    return redirect(`/${currentLang}/login`, 302);
  }

  const planRestrictedRoutes = [
    { route: 'export', requiredPlan: 'pro' },
    { route: 'api-access', requiredPlan: 'pro' },
    { route: 'carbon-reports', requiredPlan: 'pro' },
  ];

  for (const restriction of planRestrictedRoutes) {
    if (pathname.includes(`/${restriction.route}`) && 
        appLocals.userPlan !== restriction.requiredPlan) {
      return redirect(`/${currentLang}/dashboard?upgrade=${restriction.requiredPlan}`, 302);
    }
  }

  const authRoutes = ['login', 'signup'];
  const isAuthRoute = authRoutes.some(route => 
    pathname.includes(`/${route}`)
  );

  if (isAuthRoute && appLocals.userId) {
    return redirect(`/${currentLang}/dashboard`, 302);
  }

  if (pathname.endsWith('/404') || pathname.endsWith('/maintenance')) {
    return next();
  }

  const response = await next();

  if (response.status === 404 && !pathname.endsWith('/404')) {
    return redirect(`/${currentLang}/404`, 302);
  }

  return response;
});