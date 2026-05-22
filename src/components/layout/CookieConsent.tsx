import { useEffect, useId, useRef, useState } from "react";
import {
  COOKIE_CATEGORY_INFO,
  type CookiePreferences,
} from "../../lib/cookies";
import { useCookieConsent } from "../../context/CookieConsentContext";

const bannerBtnBase =
  "shrink-0 whitespace-nowrap rounded-sm px-2 py-2 font-sans text-[10px] font-medium leading-none tracking-wide transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-offset-surface sm:px-3.5 sm:py-2.5 sm:text-[12px]";

const bannerBtnOutline = `${bannerBtnBase} border border-ink/20 bg-transparent text-ink hover:border-champagne hover:text-champagne focus-visible:ring-champagne/40`;

const bannerBtnPrimary = `${bannerBtnBase} border border-transparent bg-ink text-surface hover:bg-midnight focus-visible:ring-ink/30`;

const bannerBtnReject = `${bannerBtnBase} border border-transparent bg-brand text-white hover:bg-brand-dark focus-visible:ring-brand/40`;

function CloseIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden>
      <path
        d="M2 2l10 10M12 2L2 12"
        stroke="currentColor"
        strokeWidth="1.2"
        strokeLinecap="round"
      />
    </svg>
  );
}

function CookiePreferencesModal() {
  const { consent, preferencesOpen, closePreferences, savePreferences } =
    useCookieConsent();
  const titleId = useId();
  const panelRef = useRef<HTMLDivElement>(null);

  const [draft, setDraft] = useState({
    analytics: consent?.preferences.analytics ?? false,
    marketing: consent?.preferences.marketing ?? false,
    functional: consent?.preferences.functional ?? false,
  });

  useEffect(() => {
    if (preferencesOpen) {
      setDraft({
        analytics: consent?.preferences.analytics ?? false,
        marketing: consent?.preferences.marketing ?? false,
        functional: consent?.preferences.functional ?? false,
      });
    }
  }, [preferencesOpen, consent]);

  useEffect(() => {
    if (!preferencesOpen) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") closePreferences();
    };
    document.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [preferencesOpen, closePreferences]);

  if (!preferencesOpen) return null;

  function toggle(key: keyof Omit<CookiePreferences, "necessary">) {
    setDraft((prev) => ({ ...prev, [key]: !prev[key] }));
  }

  return (
    <div
      className="fixed inset-0 z-[100] flex items-end justify-center p-4 sm:items-center"
      role="presentation"
    >
      <button
        type="button"
        className="absolute inset-0 bg-midnight/40 backdrop-blur-[2px]"
        aria-label="Close cookie preferences"
        onClick={closePreferences}
      />
      <div
        ref={panelRef}
        role="dialog"
        aria-modal="true"
        aria-labelledby={titleId}
        className="relative z-10 w-full max-w-lg rounded-sm border border-ink/10 bg-surface p-6 shadow-lift sm:p-8"
      >
        <div className="flex items-start justify-between gap-4">
          <h2
            id={titleId}
            className="font-wordmark text-xl tracking-tight text-ink sm:text-2xl"
          >
            Cookie preferences
          </h2>
          <button
            type="button"
            onClick={closePreferences}
            className="shrink-0 p-1 text-ink-faint transition-colors hover:text-ink"
            aria-label="Close"
          >
            <CloseIcon />
          </button>
        </div>

        <p className="mt-3 font-sans text-[13px] font-light leading-relaxed text-ink-light">
          Choose which cookies we may use. Strictly necessary cookies are always
          active because they are required for the site to work.
        </p>

        <ul className="mt-6 space-y-5">
          <li className="flex items-start justify-between gap-4 border-b border-ink/[0.08] pb-5">
            <div>
              <p className="font-sans text-[13px] font-medium text-ink">
                Strictly necessary
              </p>
              <p className="mt-1 font-sans text-[12px] font-light leading-relaxed text-ink-light">
                Required for security, network management, and accessibility.
              </p>
            </div>
            <span className="shrink-0 font-sans text-[11px] uppercase tracking-wider text-ink-faint">
              Always on
            </span>
          </li>

          {COOKIE_CATEGORY_INFO.map((cat) => (
            <li
              key={cat.id}
              className="flex items-start justify-between gap-4 border-b border-ink/[0.08] pb-5 last:border-0 last:pb-0"
            >
              <div>
                <p className="font-sans text-[13px] font-medium text-ink">
                  {cat.label}
                </p>
                <p className="mt-1 font-sans text-[12px] font-light leading-relaxed text-ink-light">
                  {cat.description}
                </p>
              </div>
              <button
                type="button"
                role="switch"
                aria-checked={draft[cat.id]}
                aria-label={`${cat.label} cookies`}
                onClick={() => toggle(cat.id)}
                className={`relative h-6 w-11 shrink-0 rounded-full transition-colors ${
                  draft[cat.id] ? "bg-brand" : "bg-ink/15"
                }`}
              >
                <span
                  className={`absolute top-0.5 left-0.5 h-5 w-5 rounded-full bg-surface shadow-sm transition-transform ${
                    draft[cat.id] ? "translate-x-5" : "translate-x-0"
                  }`}
                />
              </button>
            </li>
          ))}
        </ul>

        <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:justify-end">
          <button type="button" className={bannerBtnOutline} onClick={closePreferences}>
            Cancel
          </button>
          <button
            type="button"
            className={bannerBtnPrimary}
            onClick={() => savePreferences(draft)}
          >
            Save preferences
          </button>
        </div>
      </div>
    </div>
  );
}

export function CookieConsent() {
  const {
    bannerVisible,
    acceptAll,
    rejectAll,
    openPreferences,
    dismissBanner,
  } = useCookieConsent();

  useEffect(() => {
    document.body.style.paddingBottom = bannerVisible ? "10.5rem" : "";
    return () => {
      document.body.style.paddingBottom = "";
    };
  }, [bannerVisible]);

  if (!bannerVisible) {
    return <CookiePreferencesModal />;
  }

  return (
    <>
      <div
        className="fixed inset-x-0 bottom-0 z-[90] border-t border-ink/[0.1] bg-surface shadow-[0_-8px_32px_-8px_rgba(26,23,20,0.12)] sm:rounded-tl-2xl"
        role="region"
        aria-label="Cookie consent"
      >
        <div className="container-luxury relative flex flex-col gap-5 px-5 py-5 sm:flex-row sm:items-center sm:justify-between sm:gap-8 sm:px-8 sm:py-6 lg:px-12">
          <div className="min-w-0 flex-1 pr-8 sm:pr-0">
            <h2 className="font-sans text-[15px] font-semibold text-ink">
              Our site uses cookies
            </h2>
            <p className="mt-2 max-w-3xl font-sans text-[13px] font-light leading-relaxed text-ink-light">
              Like most websites, we use cookies to make our site work the way you
              expect it to, improve your experience on our site, analyze site usage,
              and assist in our marketing efforts. By choosing &ldquo;Accept all
              cookies&rdquo;, you agree to the storing of all categories of cookies on
              your device. If you wish to accept or reject some categories of cookies,
              please click &ldquo;Cookie preferences&rdquo;.
            </p>
          </div>

          <div className="flex w-full shrink-0 flex-nowrap items-center gap-1.5 sm:w-auto sm:gap-2.5">
            <button
              type="button"
              className={bannerBtnOutline}
              onClick={openPreferences}
              aria-label="Cookie preferences"
            >
              <span className="sm:hidden">Preferences</span>
              <span className="hidden sm:inline">Cookie preferences</span>
            </button>
            <button type="button" className={bannerBtnReject} onClick={rejectAll}>
              Reject all
            </button>
            <button
              type="button"
              className={bannerBtnPrimary}
              onClick={acceptAll}
              aria-label="Accept all cookies"
            >
              <span className="sm:hidden">Accept all</span>
              <span className="hidden sm:inline">Accept all cookies</span>
            </button>
          </div>

          <button
            type="button"
            onClick={dismissBanner}
            className="absolute top-4 right-4 p-1.5 text-ink-faint transition-colors hover:text-ink sm:static sm:shrink-0"
            aria-label="Close and reject optional cookies"
          >
            <CloseIcon />
          </button>
        </div>
      </div>

      <CookiePreferencesModal />
    </>
  );
}
