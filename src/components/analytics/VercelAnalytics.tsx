import { Analytics } from "@vercel/analytics/react";
import { useLocation } from "react-router-dom";
import { useCookieConsent } from "../../context/CookieConsentContext";

/**
 * Vercel Web Analytics for Vite + React (use @vercel/analytics/react, not /next).
 * Loads only when the user accepts analytics cookies.
 */
export function VercelAnalytics() {
  const { consent } = useCookieConsent();
  const { pathname, search } = useLocation();

  if (!consent?.preferences.analytics) {
    return null;
  }

  return (
    <Analytics
      framework="react"
      route={pathname}
      path={`${pathname}${search}`}
    />
  );
}
