import { useState, type FormEvent, type ReactNode } from "react";
import { Link } from "react-router-dom";
import { Logo } from "../brand/Logo";

const linkClass =
  "font-sans text-[13px] font-normal leading-snug text-ink-light transition-colors hover:text-gold";

const columnHeading =
  "mb-4 font-sans text-[13px] font-semibold text-ink";

const aboutLinks = [
  { label: "About Beauty Bell", to: "/about" },
  { label: "Sign in", href: "#" },
  { label: "Become a member", href: "#" },
  { label: "Gift a membership", href: "#" },
  { label: "Refer a friend", href: "#" },
  { label: "Work with us", href: "#" },
  { label: "Sustainability", href: "#" },
];

const supportLinks = [
  { label: "Help", to: "/contact" },
  { label: "Delivery", href: "#" },
  { label: "Returns", href: "#" },
  { label: "Payment methods", href: "#" },
];

const legalLinks = [
  { label: "Privacy policy", href: "#" },
  { label: "Cookie policy", href: "#" },
  { label: "Terms & conditions", href: "#" },
  { label: "Modern slavery statement", href: "#" },
  { label: "Applicant privacy policy", href: "#" },
  { label: "Promotional terms & conditions", href: "#" },
  { label: "Your privacy choices", href: "#" },
  { label: "Accessibility statement", href: "#" },
];

function FooterLinkList({
  links,
}: {
  links: { label: string; to?: string; href?: string }[];
}) {
  return (
    <ul className="space-y-2.5">
      {links.map((item) => (
        <li key={item.label}>
          {item.to ? (
            <Link to={item.to} className={linkClass}>
              {item.label}
            </Link>
          ) : (
            <a href={item.href ?? "#"} className={linkClass}>
              {item.label}
            </a>
          )}
        </li>
      ))}
    </ul>
  );
}

function SocialIcon({
  label,
  children,
  href,
}: {
  label: string;
  children: ReactNode;
  href: string;
}) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={label}
      className="flex h-9 w-9 items-center justify-center rounded-full border border-ink/[0.12] bg-surface text-ink-light transition-colors hover:border-gold/40 hover:text-gold"
    >
      {children}
    </a>
  );
}

export function Footer() {
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);

  function handleNewsletter(e: FormEvent) {
    e.preventDefault();
    if (email.trim()) setSubmitted(true);
  }

  return (
    <footer className="border-t border-ink/[0.08] bg-cream text-ink">
      <div className="container-luxury px-5 py-12 sm:px-8 lg:px-12 lg:py-14">
        {/* Top bar: brand + region */}
        <div className="flex flex-col gap-6 sm:flex-row sm:items-center sm:justify-between">
          <Logo variant="footer" tone="dark" animated={false} className="shrink-0" />
          <button
            type="button"
            className="inline-flex w-fit items-center gap-2.5 rounded-sm border border-ink/[0.1] bg-surface px-3.5 py-2 font-sans text-[13px] text-ink-light transition-colors hover:border-gold/35 hover:text-ink"
            aria-label="Select region and currency"
          >
            <span className="text-base leading-none" aria-hidden>
              🇬🇧
            </span>
            <span>United Kingdom (GBP)</span>
            <svg
              width="12"
              height="12"
              viewBox="0 0 12 12"
              fill="none"
              className="opacity-50"
              aria-hidden
            >
              <path
                d="M3 4.5L6 7.5L9 4.5"
                stroke="currentColor"
                strokeWidth="1.2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </button>
        </div>

        <div className="mt-10 h-px w-full bg-ink/[0.08]" aria-hidden />

        {/* Link columns + newsletter */}
        <div className="mt-10 grid gap-10 sm:grid-cols-2 lg:grid-cols-12 lg:gap-8 xl:gap-10">
          <div className="lg:col-span-2">
            <h3 className={columnHeading}>About Beauty Bell</h3>
            <FooterLinkList links={aboutLinks} />
          </div>

          <div className="lg:col-span-2">
            <h3 className={columnHeading}>Customer support</h3>
            <FooterLinkList links={supportLinks} />
          </div>

          <div className="lg:col-span-3">
            <h3 className={columnHeading}>Legal</h3>
            <FooterLinkList links={legalLinks} />
          </div>

          <div className="lg:col-span-1">
            <h3 className={columnHeading}>Other</h3>
            <ul className="space-y-2.5">
              <li>
                <Link to="/contact" className={linkClass}>
                  Contact
                </Link>
              </li>
            </ul>
          </div>

          <div className="sm:col-span-2 lg:col-span-4">
            <h3 className={columnHeading}>Keep in touch</h3>
            <p className="max-w-sm font-sans text-[13px] font-light leading-relaxed text-ink-light">
              Sign up for our newsletter to hear about new formulations, private
              appointments, and member-only releases before they reach the floor.
            </p>

            {submitted ? (
              <p
                className="mt-5 font-sans text-[13px] text-gold"
                role="status"
              >
                Thank you — you&apos;re on the list.
              </p>
            ) : (
              <form onSubmit={handleNewsletter} className="mt-5">
                <label htmlFor="footer-email" className="sr-only">
                  Email address
                </label>
                <div className="relative flex max-w-md items-stretch">
                  <input
                    id="footer-email"
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Enter your email address here"
                    className="w-full border border-ink/[0.14] bg-surface py-3 pl-4 pr-12 font-sans text-[13px] font-light text-ink placeholder:text-ink-faint focus:border-gold/50 focus:outline-none"
                  />
                  <button
                    type="submit"
                    className="absolute right-0 top-0 flex h-full w-11 items-center justify-center text-ink-light transition-colors hover:text-gold"
                    aria-label="Subscribe"
                  >
                    <svg
                      width="18"
                      height="18"
                      viewBox="0 0 18 18"
                      fill="none"
                      aria-hidden
                    >
                      <path
                        d="M4 9h10M10 5l4 4-4 4"
                        stroke="currentColor"
                        strokeWidth="1.3"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  </button>
                </div>
              </form>
            )}

            <div className="mt-6 flex flex-wrap gap-2.5">
              <SocialIcon label="Facebook" href="https://facebook.com">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" aria-hidden>
                  <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
                </svg>
              </SocialIcon>
              <SocialIcon label="Instagram" href="https://instagram.com">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" aria-hidden>
                  <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z" />
                </svg>
              </SocialIcon>
              <SocialIcon label="TikTok" href="https://tiktok.com">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" aria-hidden>
                  <path d="M19.59 6.69a4.83 4.83 0 01-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 01-2.88 2.5 2.89 2.89 0 01-2.89-2.89 2.89 2.89 0 012.89-2.89c.28 0 .54.04.79.1V9.01a6.27 6.27 0 00-.79-.05 6.34 6.34 0 00-6.34 6.34 6.34 6.34 0 006.34 6.34 6.34 6.34 0 006.34-6.34V8.69a8.18 8.18 0 004.77 1.52V6.76a4.85 4.85 0 01-1-.07z" />
                </svg>
              </SocialIcon>
              <SocialIcon label="X" href="https://x.com">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor" aria-hidden>
                  <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                </svg>
              </SocialIcon>
              <SocialIcon label="YouTube" href="https://youtube.com">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" aria-hidden>
                  <path d="M23.498 6.186a3.016 3.016 0 00-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 00.502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 002.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 002.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
                </svg>
              </SocialIcon>
              <SocialIcon label="Pinterest" href="https://pinterest.com">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" aria-hidden>
                  <path d="M12 0C5.373 0 0 5.372 0 12c0 5.084 3.163 9.426 7.627 11.174-.105-.949-.2-2.403.041-3.439.219-.937 1.406-5.957 1.406-5.957s-.359-.72-.359-1.781c0-1.663.967-2.911 2.168-2.911 1.024 0 1.518.769 1.518 1.688 0 1.029-.653 2.567-.992 3.992-.285 1.194.6 2.169 1.775 2.169 2.128 0 3.768-2.245 3.768-5.487 0-2.861-2.063-4.869-5.008-4.869-3.41 0-5.409 2.562-5.409 5.199 0 1.033.394 2.143.889 2.741.099.12.112.225.085.345-.09.375-.293 1.199-.334 1.363-.053.225-.172.271-.402.165-1.495-.69-2.433-2.878-2.433-4.646 0-3.776 2.748-7.252 7.92-7.252 4.158 0 7.392 2.967 7.392 6.923 0 4.135-2.607 7.462-6.233 7.462-1.214 0-2.357-.629-2.746-1.378l-.748 2.853c-.271 1.043-1.002 2.35-1.492 3.146C9.57 23.812 10.763 24 12 24c6.627 0 12-5.373 12-12S18.627 0 12 0z" />
                </svg>
              </SocialIcon>
            </div>
          </div>
        </div>

        <div className="mt-14 flex flex-col gap-3 border-t border-ink/[0.08] pt-8 sm:flex-row sm:items-center sm:justify-between">
          <p className="font-sans text-[11px] text-ink-faint">
            &copy; {new Date().getFullYear()} Beauty Bell London. All rights reserved.
          </p>
          <p className="font-sans text-[11px] text-ink-faint">
            Atelier formulations · Cruelty free · Made in the UK
          </p>
        </div>
      </div>
    </footer>
  );
}
