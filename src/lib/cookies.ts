export const COOKIE_CONSENT_KEY = "beautybell_cookie_consent";
export const COOKIE_CONSENT_VERSION = 1;

export type CookieCategory = "necessary" | "analytics" | "marketing" | "functional";

export type CookiePreferences = {
  necessary: true;
  analytics: boolean;
  marketing: boolean;
  functional: boolean;
};

export type CookieConsentRecord = {
  version: number;
  decidedAt: string;
  preferences: CookiePreferences;
};

export const DEFAULT_REJECTED: CookiePreferences = {
  necessary: true,
  analytics: false,
  marketing: false,
  functional: false,
};

export const DEFAULT_ACCEPTED: CookiePreferences = {
  necessary: true,
  analytics: true,
  marketing: true,
  functional: true,
};

export const COOKIE_CATEGORY_INFO: {
  id: Exclude<CookieCategory, "necessary">;
  label: string;
  description: string;
}[] = [
  {
    id: "analytics",
    label: "Analytics",
    description:
      "Helps us understand how visitors use the site so we can improve performance and content.",
  },
  {
    id: "functional",
    label: "Functional",
    description:
      "Remembers your preferences and choices to provide a more tailored experience.",
  },
  {
    id: "marketing",
    label: "Marketing",
    description:
      "Used to measure campaigns and show relevant Beauty Bell offers across other sites.",
  },
];

export function readCookieConsent(): CookieConsentRecord | null {
  try {
    const raw = localStorage.getItem(COOKIE_CONSENT_KEY);
    if (!raw) return null;
    const parsed = JSON.parse(raw) as CookieConsentRecord;
    if (parsed.version !== COOKIE_CONSENT_VERSION) return null;
    if (!parsed.preferences?.necessary) return null;
    return parsed;
  } catch {
    return null;
  }
}

export function saveCookieConsent(preferences: CookiePreferences): CookieConsentRecord {
  const record: CookieConsentRecord = {
    version: COOKIE_CONSENT_VERSION,
    decidedAt: new Date().toISOString(),
    preferences: { ...preferences, necessary: true },
  };
  localStorage.setItem(COOKIE_CONSENT_KEY, JSON.stringify(record));
  return record;
}

export function hasConsent(category: Exclude<CookieCategory, "necessary">): boolean {
  const record = readCookieConsent();
  return record?.preferences[category] ?? false;
}
