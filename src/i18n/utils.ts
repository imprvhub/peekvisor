// src/i18n/utils.ts
import { ui, defaultLang } from "./ui";

export function getLangFromUrl(url: URL) {
  const [, lang] = url.pathname.split("/");
  if (lang in ui) return lang as keyof typeof ui;
  return defaultLang;
}

export function useTranslations(lang: keyof typeof ui) {
  return function t(key: string, params: Record<string, string | number> = {}) {
    let translation = (ui[lang] as any)?.[key] || (ui[defaultLang] as any)[key];

    if (translation === undefined) {
      return key;
    }

    for (const paramKey in params) {
      translation = translation.replace(
        `{${paramKey}}`,
        String(params[paramKey]),
      );
    }
    return translation;
  };
}

export function getRedirect(path: string, request: Request) {
  const supportedLangs = ["en", "es", "fr"] as const;
  type SupportedLang = (typeof supportedLangs)[number];

  function getPreferredLanguage(): SupportedLang {
    const acceptLanguage = request.headers.get("accept-language");
    if (!acceptLanguage) return defaultLang as SupportedLang;

    const languages = acceptLanguage.split(",").map((lang) => {
      const [code, qValue] = lang.split(";q=");
      return {
        code: code.trim().split("-")[0],
        q: qValue ? parseFloat(qValue) : 1,
      };
    });

    languages.sort((a, b) => b.q - a.q);
    for (const lang of languages) {
      if (supportedLangs.includes(lang.code as SupportedLang)) {
        return lang.code as SupportedLang;
      }
    }

    return defaultLang as SupportedLang;
  }

  const bestLang = getPreferredLanguage();
  const redirectUrl = `/${bestLang}${path}`;

  return new Response(null, {
    status: 302,
    headers: { Location: redirectUrl },
  });
}
