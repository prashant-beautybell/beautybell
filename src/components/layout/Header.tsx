import { useEffect, useRef, useState, type ReactNode } from "react";
import { Link, NavLink } from "react-router-dom";
import { Logo } from "../brand/Logo";
import { categories } from "../../data/products";
import { useCart } from "../../context/CartContext";
import type { Category } from "../../types";

const navLinkClass = ({ isActive }: { isActive: boolean }) =>
  `whitespace-nowrap font-sans text-sm font-normal leading-none tracking-normal transition-colors ${
    isActive ? "text-ink" : "text-ink-light hover:text-ink"
  }`;

/** Shorter labels in the header bar */
const categoryNavLabels: Record<Category, string> = {
  face: "Cleanse",
  skincare: "Serums",
  eyes: "Eyes",
  lips: "Masks",
};

const primaryNav = [
  { to: "/", label: "Shop", end: true },
  ...categories.map((cat) => ({
    to: `/category/${cat.id}`,
    label: categoryNavLabels[cat.id],
    end: false,
  })),
];

const moreNav = [
  { to: "/category/skincare", label: "New In" },
  { to: "/category/face", label: "Bestsellers" },
  { to: "/about", label: "About" },
  { to: "/contact", label: "Contact" },
];

/** Full list for mobile drawer */
const mobileNav = [
  { to: "/", label: "Shop", end: true },
  ...categories.map((cat) => ({
    to: `/category/${cat.id}`,
    label: cat.label,
    end: false,
  })),
  ...moreNav.map((item) => ({ ...item, end: false })),
];

function UtilityAction({
  label,
  children,
  highlight = false,
  badge,
}: {
  label: string;
  children: ReactNode;
  highlight?: boolean;
  badge?: number;
}) {
  return (
    <button
      type="button"
      aria-label={badge !== undefined ? `${label}, ${badge} items` : label}
      className={`group flex h-10 w-10 flex-col items-center justify-center rounded-sm transition-colors hover:bg-ink/[0.06] ${
        highlight ? "bg-ink/[0.06]" : ""
      }`}
    >
      <span className="relative text-ink-light transition-colors group-hover:text-ink">
        {children}
        {badge !== undefined && badge > 0 && (
          <span className="absolute -right-2 -top-1.5 flex h-4 w-4 items-center justify-center rounded-full bg-brand text-[9px] font-medium text-white">
            {badge}
          </span>
        )}
      </span>
    </button>
  );
}

function MoreMenu() {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!open) return;
    const close = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false);
    };
    document.addEventListener("mousedown", close);
    return () => document.removeEventListener("mousedown", close);
  }, [open]);

  return (
    <div ref={ref} className="relative">
      <button
        type="button"
        aria-expanded={open}
        aria-haspopup="true"
        onClick={() => setOpen((v) => !v)}
        className={`pointer-events-auto flex items-center gap-1 font-sans text-sm font-normal leading-none tracking-normal transition-colors ${
          open ? "text-ink" : "text-ink-light hover:text-ink"
        }`}
      >
        More
        <svg
          className={`h-3.5 w-3.5 transition-transform ${open ? "rotate-180" : ""}`}
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          aria-hidden
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M6 9l6 6 6-6" />
        </svg>
      </button>
      {open && (
        <ul
          role="menu"
          className="pointer-events-auto absolute left-1/2 top-full z-50 mt-3 min-w-[10.5rem] -translate-x-1/2 border border-ink/[0.08] bg-white py-2 shadow-lift"
        >
          {moreNav.map((item) => (
            <li key={item.to + item.label} role="none">
              <NavLink
                to={item.to}
                role="menuitem"
                className={({ isActive }) =>
                  `block px-4 py-2.5 font-sans text-sm transition-colors ${
                    isActive ? "bg-cream text-ink" : "text-ink-light hover:bg-cream/80 hover:text-ink"
                  }`
                }
                onClick={() => setOpen(false)}
              >
                {item.label}
              </NavLink>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export function Header() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const { itemCount } = useCart();

  return (
    <header className="sticky top-0 z-50 border-b border-ink/[0.08] bg-white text-ink">
      <div className="container-luxury relative flex h-[4.5rem] items-center md:h-[5rem]">
        <Logo variant="header" tone="dark" animated={false} className="relative z-10 shrink-0" />

        <nav
          className="pointer-events-none absolute left-1/2 top-1/2 hidden -translate-x-1/2 -translate-y-1/2 lg:flex lg:items-center lg:gap-8 xl:gap-10"
          aria-label="Main"
        >
          {primaryNav.map((item) => (
            <NavLink
              key={item.to + item.label}
              to={item.to}
              end={item.end}
              className={({ isActive }) =>
                `pointer-events-auto ${navLinkClass({ isActive })}`
              }
            >
              {item.label}
            </NavLink>
          ))}
          <MoreMenu />
        </nav>

        <div className="relative z-10 ml-auto flex items-center gap-0.5 sm:gap-1">
          <UtilityAction label="Search">
            <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden>
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.4} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
          </UtilityAction>
          <UtilityAction label="Login">
            <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden>
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.4} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
            </svg>
          </UtilityAction>
          <UtilityAction label="Basket" highlight badge={itemCount}>
            <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden>
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.4} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
            </svg>
          </UtilityAction>

          <button
            type="button"
            className="ml-1 flex h-10 w-10 items-center justify-center text-ink lg:hidden"
            aria-label="Open menu"
            aria-expanded={mobileOpen}
            onClick={() => setMobileOpen(true)}
          >
            <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.2} d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>
        </div>
      </div>

      <p className="border-t border-ink/[0.08] py-2 text-center font-sans text-[10px] font-light uppercase tracking-[0.28em] text-ink-faint">
        Complimentary shipping over £75
      </p>

      {mobileOpen && (
        <div
          className="fixed inset-0 z-50 bg-ink/40 lg:hidden"
          role="presentation"
          onClick={() => setMobileOpen(false)}
        >
          <div
            role="dialog"
            aria-modal="true"
            aria-label="Navigation"
            className="absolute inset-y-0 left-0 flex w-[min(100vw-3rem,20rem)] flex-col bg-white shadow-lift"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between border-b border-ink/[0.08] px-5 py-5">
              <Logo variant="compact" tone="dark" linkToHome={false} />
              <button
                type="button"
                aria-label="Close menu"
                className="text-ink"
                onClick={() => setMobileOpen(false)}
              >
                <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
            <nav className="flex flex-1 flex-col gap-1 overflow-y-auto px-5 py-6">
              {mobileNav.map((item) => (
                <Link
                  key={item.to + item.label}
                  to={item.to}
                  className="border-b border-ink/[0.08] py-4 font-sans text-sm tracking-normal text-ink-light hover:text-ink"
                  onClick={() => setMobileOpen(false)}
                >
                  {item.label}
                </Link>
              ))}
            </nav>
          </div>
        </div>
      )}
    </header>
  );
}
