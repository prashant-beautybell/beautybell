import {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useState,
  type ReactNode,
} from "react";
import {
  DEFAULT_ACCEPTED,
  DEFAULT_REJECTED,
  readCookieConsent,
  saveCookieConsent,
  type CookieConsentRecord,
  type CookiePreferences,
} from "../lib/cookies";

type CookieConsentContextValue = {
  consent: CookieConsentRecord | null;
  bannerVisible: boolean;
  preferencesOpen: boolean;
  acceptAll: () => void;
  rejectAll: () => void;
  openPreferences: () => void;
  closePreferences: () => void;
  savePreferences: (preferences: Omit<CookiePreferences, "necessary">) => void;
  dismissBanner: () => void;
  reopenBanner: () => void;
};

const CookieConsentContext = createContext<CookieConsentContextValue | null>(
  null
);

export function CookieConsentProvider({ children }: { children: ReactNode }) {
  const [consent, setConsent] = useState<CookieConsentRecord | null>(() =>
    readCookieConsent()
  );
  const [bannerVisible, setBannerVisible] = useState(() => !readCookieConsent());
  const [preferencesOpen, setPreferencesOpen] = useState(false);

  const applyConsent = useCallback((preferences: CookiePreferences) => {
    const record = saveCookieConsent(preferences);
    setConsent(record);
    setBannerVisible(false);
    setPreferencesOpen(false);
  }, []);

  const value = useMemo<CookieConsentContextValue>(
    () => ({
      consent,
      bannerVisible,
      preferencesOpen,
      acceptAll: () => applyConsent(DEFAULT_ACCEPTED),
      rejectAll: () => applyConsent(DEFAULT_REJECTED),
      openPreferences: () => setPreferencesOpen(true),
      closePreferences: () => setPreferencesOpen(false),
      savePreferences: (prefs) =>
        applyConsent({ necessary: true, ...prefs }),
      dismissBanner: () => applyConsent(DEFAULT_REJECTED),
      reopenBanner: () => {
        setBannerVisible(true);
        setPreferencesOpen(false);
      },
    }),
    [consent, bannerVisible, preferencesOpen, applyConsent]
  );

  return (
    <CookieConsentContext.Provider value={value}>
      {children}
    </CookieConsentContext.Provider>
  );
}

export function useCookieConsent() {
  const ctx = useContext(CookieConsentContext);
  if (!ctx) {
    throw new Error("useCookieConsent must be used within CookieConsentProvider");
  }
  return ctx;
}
