import type { ButtonHTMLAttributes, ReactNode } from "react";

type Variant = "primary" | "secondary" | "ghost" | "outline";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: Variant;
  children: ReactNode;
  fullWidth?: boolean;
}

const variants: Record<Variant, string> = {
  primary:
    "border border-transparent bg-brand text-[11px] font-medium tracking-[0.22em] text-white hover:bg-brand-dark focus-visible:ring-brand",
  secondary:
    "border border-transparent bg-brand-muted text-brand-dark text-[11px] font-medium tracking-[0.18em] hover:bg-brand-soft/40 focus-visible:ring-brand-soft",
  ghost:
    "border border-transparent text-ink text-[11px] font-normal tracking-[0.16em] hover:bg-brand-muted focus-visible:ring-ink",
  outline:
    "border border-ink/20 bg-transparent text-ink text-[11px] font-medium tracking-[0.2em] hover:border-champagne hover:text-champagne focus-visible:ring-champagne",
};

export function Button({
  variant = "primary",
  children,
  fullWidth,
  className = "",
  ...props
}: ButtonProps) {
  return (
    <button
      className={`rounded-sm inline-flex min-h-11 items-center justify-center px-10 py-3 uppercase transition-colors duration-300 ease-out focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-offset-surface disabled:cursor-not-allowed disabled:opacity-40 ${variants[variant]} ${fullWidth ? "w-full" : ""} ${className}`}
      {...props}
    >
      {children}
    </button>
  );
}
