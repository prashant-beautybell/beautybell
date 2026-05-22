import { Link } from "react-router-dom";
import {
  LOGO_FULL_WORDMARK,
  useLogoMorphText,
} from "../../context/LogoMorphContext";

type LogoVariant = "header" | "footer" | "compact";
type LogoTone = "dark" | "light";

interface LogoProps {
  variant?: LogoVariant;
  tone?: LogoTone;
  className?: string;
  linkToHome?: boolean;
  animated?: boolean;
}

const BEAUTY_ROOT = "BEAUTY";

const boxSizes: Record<LogoVariant, string> = {
  header: "h-10 w-[9.5ch] sm:h-12 sm:w-[11ch] md:h-14 md:w-[13ch]",
  footer: "h-12 w-[13ch] md:h-14 md:w-[14ch]",
  compact: "h-10 w-[10ch]",
};

const textSizes: Record<LogoVariant, string> = {
  header: "text-[1.15rem] sm:text-[1.55rem] md:text-[1.75rem] lg:text-[2rem]",
  footer: "text-[1.45rem] sm:text-[1.65rem] md:text-[1.85rem]",
  compact: "text-[1.2rem]",
};

const bbPalette = {
  beauty: "text-gold",
  suffix: "text-gold",
};

const morphPalettes = {
  dark: {
    beauty: "text-ink",
    suffix: "text-ink",
  },
  light: {
    beauty: "text-white",
    suffix: "text-white",
  },
};

/** One typeface, weight, and tracking for every morph frame (BB through BEAUTYBELL). */
const logoTypeClass =
  "font-wordmark inline-flex items-baseline whitespace-nowrap font-bold uppercase leading-none tracking-[0.06em]";

function renderMorphText(text: string, sizeClass: string, tone: LogoTone) {
  const c = text === "BB" ? bbPalette : morphPalettes[tone];
  const base = `${logoTypeClass} ${sizeClass}`;

  if (text === "BB") {
    return (
      <span className={base}>
        <span className={c.beauty}>B</span>
        <span className={c.suffix}>B</span>
      </span>
    );
  }

  if (text.startsWith(BEAUTY_ROOT)) {
    const suffix = text.slice(BEAUTY_ROOT.length);
    return (
      <span className={base}>
        <span className={c.beauty}>{BEAUTY_ROOT}</span>
        {suffix.length > 0 && <span className={c.suffix}>{suffix}</span>}
      </span>
    );
  }

  return (
    <span className={base}>
      <span className={c.beauty}>{text}</span>
    </span>
  );
}

function MorphingLogo({
  variant,
  tone,
  align = "left",
}: {
  variant: LogoVariant;
  tone: LogoTone;
  align?: "left" | "center";
}) {
  const text = useLogoMorphText();
  const sizeClass = textSizes[variant];
  const justify = align === "left" ? "justify-start" : "justify-center";

  return (
    <span
      className={`logo-stage inline-flex items-center ${boxSizes[variant]} ${justify}`}
      aria-label="BEAUTY BELL"
    >
      {renderMorphText(text, sizeClass, tone)}
    </span>
  );
}

export function Logo({
  variant = "header",
  tone,
  className = "",
  linkToHome = true,
  animated,
}: LogoProps) {
  const resolvedTone = tone ?? (variant === "footer" ? "light" : "dark");
  const useAnimation = animated !== false;
  const align: "left" | "center" = "left";

  const inner = useAnimation ? (
    <MorphingLogo variant={variant} tone={resolvedTone} align={align} />
  ) : (
    <span
      className={`logo-stage inline-flex items-center ${boxSizes[variant]} justify-start`}
      aria-label="BEAUTY BELL"
    >
      {renderMorphText(LOGO_FULL_WORDMARK, textSizes[variant], resolvedTone)}
    </span>
  );

  if (!linkToHome) {
    return <span className={`inline-flex shrink-0 ${className}`}>{inner}</span>;
  }

  const focusRing =
    resolvedTone === "light"
      ? "focus-visible:outline-white/60"
      : "focus-visible:outline-ink/25";

  return (
    <Link
      to="/"
      className={`inline-flex shrink-0 rounded-sm outline-offset-4 transition-opacity hover:opacity-90 focus-visible:outline-2 ${focusRing} ${className}`}
    >
      {inner}
    </Link>
  );
}
