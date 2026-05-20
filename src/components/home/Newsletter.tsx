import { useState, type FormEvent } from "react";
import { Button } from "../ui/Button";

export function Newsletter() {
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);

  function handleSubmit(e: FormEvent) {
    e.preventDefault();
    if (email) setSubmitted(true);
  }

  return (
    <section className="section-padding bg-surface">
      <div className="container-luxury">
        <div className="relative mx-auto max-w-[42rem] border border-ink/[0.08] bg-gradient-to-b from-cream to-surface px-8 py-16 shadow-soft md:px-16 md:py-20">
          <div className="pointer-events-none absolute inset-x-[15%] -top-px h-px bg-gradient-to-r from-transparent via-champagne/60 to-transparent" aria-hidden />
          <div className="text-center">
            <p className="eyebrow mb-6">Registry</p>
            <h2 className="font-wordmark text-[clamp(1.75rem,3.5vw,2.65rem)] leading-tight tracking-[-0.02em] text-ink">
              First access to releases
            </h2>
            <p className="mx-auto mt-6 max-w-md font-sans text-sm font-light leading-relaxed text-ink-light">
              Capsules arrive without fanfare. Subscribers receive the letter first:
              composition notes, tonal pairings, and appointment windows before the wider floor.
            </p>

            {submitted ? (
              <p className="mt-10 font-wordmark text-lg italic leading-snug text-brand" role="status">
                Invitation received. You are on the private list.
              </p>
            ) : (
              <form
                onSubmit={handleSubmit}
                className="mt-10 flex flex-col gap-4 sm:flex-row sm:items-stretch"
              >
                <label htmlFor="newsletter-email" className="sr-only">
                  Email address
                </label>
                <input
                  id="newsletter-email"
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Email address"
                  className="flex-1 border border-ink/[0.1] bg-surface px-5 py-3.5 font-sans text-sm font-light placeholder:text-ink-faint focus:border-champagne focus:outline-none"
                />
                <Button type="submit">Request entry</Button>
              </form>
            )}

            <p className="mt-6 font-sans text-[10px] font-light uppercase tracking-[0.2em] text-ink-faint">
              By subscribing you agree to our privacy policy. Unsubscribe at any time.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
