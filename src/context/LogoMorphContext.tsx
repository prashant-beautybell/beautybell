import {
  createContext,
  useContext,
  useEffect,
  useState,
  type ReactNode,
} from "react";

export const LOGO_MORPH_SEQUENCE = [
  "BB",
  "BE",
  "BEA",
  "BEAU",
  "BEAUT",
  "BEAUTY",
  "BEAUTYB",
  "BEAUTYBE",
  "BEAUTYBEL",
  "BEAUTYBELL",
  "BEAUTYBEL",
  "BEAUTYBE",
  "BEAUTYB",
  "BEAUTY",
  "BEAUT",
  "BEAU",
  "BEA",
  "BE",
  "BB",
] as const;

export type LogoMorphText = (typeof LOGO_MORPH_SEQUENCE)[number];

export const LOGO_FULL_WORDMARK = "BEAUTYBELL" as const;

/** Shared timing for header, footer, and all animated logos */
export const MORPH_STEP_MS = 95;
export const MORPH_HOLD_MS = 1100;

const LogoMorphContext = createContext<LogoMorphText>(LOGO_FULL_WORDMARK);

export function LogoMorphProvider({ children }: { children: ReactNode }) {
  const [index, setIndex] = useState(0);
  const [motionEnabled, setMotionEnabled] = useState(true);

  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    const sync = () => setMotionEnabled(!mq.matches);
    sync();
    mq.addEventListener("change", sync);
    return () => mq.removeEventListener("change", sync);
  }, []);

  useEffect(() => {
    if (!motionEnabled) return;

    const current = LOGO_MORPH_SEQUENCE[index];
    const pause =
      current === "BB" || current === LOGO_FULL_WORDMARK
        ? MORPH_HOLD_MS
        : MORPH_STEP_MS;

    const timer = setTimeout(() => {
      setIndex((i) => (i + 1) % LOGO_MORPH_SEQUENCE.length);
    }, pause);

    return () => clearTimeout(timer);
  }, [motionEnabled, index]);

  const text = motionEnabled ? LOGO_MORPH_SEQUENCE[index] : LOGO_FULL_WORDMARK;

  return (
    <LogoMorphContext.Provider value={text}>{children}</LogoMorphContext.Provider>
  );
}

export function useLogoMorphText(): LogoMorphText {
  return useContext(LogoMorphContext);
}
